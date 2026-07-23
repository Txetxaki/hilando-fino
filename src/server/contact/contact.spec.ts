import { randomBytes } from 'node:crypto';
import { createServer, Server } from 'node:http';
import { AddressInfo } from 'node:net';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { sanitizeAnalyticsProperties } from '../../app/core/analytics/analytics.types';
import { approvedContactModalities, reasonCategories } from '../../app/contact/contact.constants';
import { notFoundContent, renderNotFoundHtml } from '../../app/content/not-found';
import { createHealthPayload, createHilandoFinoApp } from '../app';
import { clearIssuedCsrfTokens, getIssuedCsrfTokenCount, isValidCsrfSecret, issueCsrfToken, verifyCsrfSubmission } from './csrf';
import { clearContactRateLimiters } from './handler';
import { InMemoryRateLimiter } from './rate-limit';
import { redactedContactLog, validateContactRequest } from './validation';

const createTestCsrfSecret = () => `base64:${randomBytes(32).toString('base64')}`;
const env = { CONTACT_CSRF_SECRET: createTestCsrfSecret(), CONTACT_CSRF_TTL_SECONDS: '1800' };
const jsonLimitBytes = 12 * 1024;
const validRequest = {
  name: 'Persona',
  email: 'persona@example.com',
  preferredContact: 'email',
  modalityPreference: 'in-person-ciudad-real',
  ciudadRealFit: 'yes',
  reasonCategory: 'general',
  message: 'Prefiero que me respondan por la tarde.',
  privacyConsent: true,
  website: ''
};

describe('contact validation boundary', () => {
  it('accepts a minimal practical inquiry and redacts logs', () => {
    const result = validateContactRequest(validRequest);
    expect(result.ok).toBe(true);
    const log = redactedContactLog(result);
    expect(log).toEqual({ ok: true, errorCount: 0, reasonCategory: 'general', modalityPreference: 'in-person-ciudad-real', ciudadRealFit: 'yes' });
    expect(JSON.stringify(log)).not.toContain('persona@example.com');
    expect(JSON.stringify(log)).not.toContain('Prefiero');
  });

  it('rejects unapproved online modality and honeypot submissions', () => {
    const result = validateContactRequest({ ...validRequest, modalityPreference: 'online', website: 'bot' });
    expect(result.ok).toBe(false);
    expect(result.errors).toContain('Modality is not approved.');
    expect(result.errors).toContain('Spam check failed.');
  });

  it('keeps form payload out of analytics properties', () => {
    const analytics = sanitizeAnalyticsProperties({ ...validRequest, route: '/contacto', validationOutcome: 'valid' });
    expect(JSON.stringify(analytics)).not.toContain('persona@example.com');
    expect(JSON.stringify(analytics)).not.toContain('Persona');
  });

  it('uses the shared contact options as the server validation source of truth', () => {
    expect(reasonCategories).toContain(validRequest.reasonCategory);
    expect(approvedContactModalities).toContain(validRequest.modalityPreference);
    expect(validateContactRequest({ ...validRequest, reasonCategory: 'unknown' }).errors).toContain('Reason category is invalid.');
    expect(validateContactRequest({ ...validRequest, modalityPreference: 'online' }).errors).toContain('Modality is not approved.');
  });

  it('requires a server-issued CSRF token bound to the SameSite cookie', () => {
    clearIssuedCsrfTokens();
    clearContactRateLimiters();
    const issued = issueCsrfToken(env as NodeJS.ProcessEnv, 1_000);
    expect(verifyCsrfSubmission({ token: issued.token, cookieHeader: issued.cookie, env: env as NodeJS.ProcessEnv, now: 1_001 })).toBe(true);
  });

  it('rejects empty, placeholder, malformed, and legacy length-only CSRF secrets', () => {
    expect(isValidCsrfSecret('')).toBe(false);
    expect(isValidCsrfSecret('replace-with-at-least-32-random-characters-before-enabling-contact')).toBe(false);
    expect(isValidCsrfSecret('base64:not valid base64 ***')).toBe(false);
    expect(isValidCsrfSecret('hex:not-hex-material')).toBe(false);
    expect(isValidCsrfSecret(Array.from({ length: 32 }, (_, index) => (index % 16).toString(16)).join(''))).toBe(false);
    expect(isValidCsrfSecret(`base64:${randomBytes(31).toString('base64')}`)).toBe(false);
    expect(isValidCsrfSecret(createTestCsrfSecret())).toBe(true);
    expect(isValidCsrfSecret(`hex:${randomBytes(32).toString('hex')}`)).toBe(true);
  });

  it('rejects decoded CSRF secrets with trivial low-entropy byte patterns', () => {
    const zeroBytes = Buffer.alloc(32, 0);
    const repeatedBytes = Buffer.alloc(32, 0xab);
    const shortCycle = Buffer.from(Array.from({ length: 32 }, (_, index) => index % 4));
    const longerCycle = Buffer.from(Array.from({ length: 32 }, (_, index) => index % 16));
    const simpleCounter = Buffer.from(Array.from({ length: 32 }, (_, index) => index));

    for (const material of [zeroBytes, repeatedBytes, shortCycle, longerCycle, simpleCounter]) {
      expect(isValidCsrfSecret(`base64:${material.toString('base64')}`)).toBe(false);
      expect(isValidCsrfSecret(`hex:${material.toString('hex')}`)).toBe(false);
    }
  });

  it('rejects arbitrary, missing, mismatched, expired, and replayed CSRF tokens', () => {
    clearIssuedCsrfTokens();
    const issued = issueCsrfToken(env as NodeJS.ProcessEnv, 1_000);
    expect(verifyCsrfSubmission({ token: 'arbitrary', cookieHeader: `${issued.cookie}`, env: env as NodeJS.ProcessEnv, now: 1_001 })).toBe(false);
    expect(verifyCsrfSubmission({ token: issued.token, cookieHeader: '', env: env as NodeJS.ProcessEnv, now: 1_001 })).toBe(false);
    expect(verifyCsrfSubmission({ token: issued.token, cookieHeader: 'hf_csrf=other-token', env: env as NodeJS.ProcessEnv, now: 1_001 })).toBe(false);
    expect(verifyCsrfSubmission({ token: issued.token, cookieHeader: issued.cookie, env: env as NodeJS.ProcessEnv, now: issued.expiresAt + 1 })).toBe(false);

    const replay = issueCsrfToken(env as NodeJS.ProcessEnv, 2_000);
    expect(verifyCsrfSubmission({ token: replay.token, cookieHeader: replay.cookie, env: env as NodeJS.ProcessEnv, now: 2_001 })).toBe(true);
    expect(verifyCsrfSubmission({ token: replay.token, cookieHeader: replay.cookie, env: env as NodeJS.ProcessEnv, now: 2_002 })).toBe(false);
  });

  it('safely rejects malformed percent-encoded CSRF cookies without throwing', () => {
    clearIssuedCsrfTokens();
    const issued = issueCsrfToken(env as NodeJS.ProcessEnv, 1_000);
    expect(verifyCsrfSubmission({ token: issued.token, cookieHeader: 'hf_csrf=%E0%A4%A', env: env as NodeJS.ProcessEnv, now: 1_001 })).toBe(false);
  });

  it('bounds in-memory CSRF and rate-limit state under high-cardinality input', () => {
    clearIssuedCsrfTokens();
    for (let index = 0; index < 20; index += 1) issueCsrfToken({ ...env, CONTACT_CSRF_MAX_TOKENS: '5' } as NodeJS.ProcessEnv, 1_000 + index);
    expect(getIssuedCsrfTokenCount()).toBeLessThanOrEqual(5);

    const limiter = new InMemoryRateLimiter(1, 1_000, 3);
    for (let index = 0; index < 20; index += 1) limiter.check(`ip-${index}`, 1_000 + index);
    expect(limiter.size()).toBeLessThanOrEqual(3);
    limiter.check('fresh', 3_000);
    expect(limiter.size()).toBe(1);
  });
});

describe('HTTP contact contract', () => {
  let server: Server;
  let baseUrl: string;
  const originalEnv = { ...process.env };
  let infoSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    clearIssuedCsrfTokens();
    process.env = {
      ...originalEnv,
      CONTACT_ENABLED: 'false',
      CONTACT_RETENTION_APPROVED: 'false',
      CONTACT_CSRF_SECRET: env.CONTACT_CSRF_SECRET,
      CONTACT_CSRF_TTL_SECONDS: env.CONTACT_CSRF_TTL_SECONDS,
      CONTACT_CSRF_MAX_TOKENS: '1000',
      CONTACT_COOKIE_SECURE: 'false',
      EXPECTED_SERVER_TOKEN: createTestCsrfSecret()
    };
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    server = createServer(createHilandoFinoApp());
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterEach(async () => {
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    clearIssuedCsrfTokens();
    clearContactRateLimiters();
    infoSpy.mockRestore();
    errorSpy.mockRestore();
    process.env = originalEnv;
  });

  it('issues CSRF tokens with safe response shape and rate limits token requests', async () => {
    const response = await fetch(`${baseUrl}/api/contact/csrf`);
    const body = (await response.json()) as Record<string, unknown>;
    expect(response.status).toBe(200);
    expect(body['ok']).toBe(true);
    expect(typeof body['csrfToken']).toBe('string');
    expect(response.headers.get('set-cookie')).toContain('HttpOnly');

    let limitedStatus = 200;
    for (let index = 0; index < 25; index += 1) {
      limitedStatus = (await fetch(`${baseUrl}/api/contact/csrf`)).status;
    }
    expect(limitedStatus).toBe(429);
    clearIssuedCsrfTokens();
    clearContactRateLimiters();
  });

  it('returns safe responses for malformed and missing JSON', async () => {
    const malformed = await fetch(`${baseUrl}/api/contact`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{bad-json' });
    expect(malformed.status).toBe(400);
    expect(await malformed.json()).toEqual({ ok: false, message: 'JSON mal formado.' });

    const missing = await fetch(`${baseUrl}/api/contact`, { method: 'POST' });
    expect(missing.status).toBe(403);
    expect(await missing.json()).toEqual({ ok: false, message: 'La sesión del formulario ha caducado. Recarga la página e inténtalo de nuevo.' });
  });

  it('returns a safe health contract without token or process metadata disclosure', async () => {
    const response = await fetch(`${baseUrl}/__healthz`);
    const body = (await response.json()) as Record<string, unknown>;
    expect(response.status).toBe(200);
    expect(body['ok']).toBe(true);
    expect(typeof body['identity']).toBe('string');
    expect(body).not.toHaveProperty('token');
    expect(body).not.toHaveProperty('pid');
    expect(JSON.stringify(body)).not.toContain(process.env['EXPECTED_SERVER_TOKEN']);
    expect(createHealthPayload(process.env['EXPECTED_SERVER_TOKEN'])['identity']).toBe(body['identity']);
  });

  it('uses safe JSON responses around the 12KB body limit without stack leakage', async () => {
    const below = await postRawJson(jsonBodyAtBytes(jsonLimitBytes - 1));
    await expectSafeJsonResponse(below, 403);

    const atLimit = await postRawJson(jsonBodyAtBytes(jsonLimitBytes));
    await expectSafeJsonResponse(atLimit, 403);

    const above = await postRawJson(jsonBodyAtBytes(jsonLimitBytes + 1));
    await expectSafeJsonResponse(above, 413, 'La solicitud es demasiado grande.');

    const logs = JSON.stringify([...infoSpy.mock.calls, ...errorSpy.mock.calls]);
    expect(logs).not.toContain('RangeError');
    expect(logs).not.toContain('PayloadTooLargeError');
    expect(logs).not.toContain(process.env['EXPECTED_SERVER_TOKEN']);
  });

  it('serves the shared noindex 404 contract instead of drifting from Pages 404 content', async () => {
    const response = await fetch(`${baseUrl}/ruta-inexistente-contrato`);
    const html = await response.text();
    expect(response.status).toBe(404);
    expect(html).toContain(notFoundContent.h1);
    expect(html).toContain(notFoundContent.body);
    expect(html).toContain('name="robots" content="noindex, nofollow"');
    expect(renderNotFoundHtml({ siteUrl: 'https://example.test', baseHref: '/' })).toContain(notFoundContent.h1);
  });

  it('rejects invalid, missing, mismatched, expired, replayed, and malformed-cookie CSRF over HTTP', async () => {
    const issued = await issueHttpCsrf();
    expect((await postContact({ ...validRequest, csrfToken: 'invalid' }, issued.cookie)).status).toBe(403);
    expect((await postContact({ ...validRequest, csrfToken: issued.token }, '')).status).toBe(403);
    expect((await postContact({ ...validRequest, csrfToken: issued.token }, 'hf_csrf=other')).status).toBe(403);
    expect((await postContact({ ...validRequest, csrfToken: issued.token }, 'hf_csrf=%E0%A4%A')).status).toBe(403);

    process.env['CONTACT_CSRF_TTL_SECONDS'] = '0.001';
    const short = await issueHttpCsrf();
    await new Promise((resolve) => setTimeout(resolve, 5));
    expect((await postContact({ ...validRequest, csrfToken: short.token }, short.cookie)).status).toBe(403);

    process.env['CONTACT_CSRF_TTL_SECONDS'] = env.CONTACT_CSRF_TTL_SECONDS;
    const replay = await issueHttpCsrf();
    expect((await postContact({ ...validRequest, csrfToken: replay.token }, replay.cookie)).status).toBe(503);
    expect((await postContact({ ...validRequest, csrfToken: replay.token }, replay.cookie)).status).toBe(403);
  });

  it('keeps contact disabled unless live-contact deployment prerequisites and provider approval exist', async () => {
    const issued = await issueHttpCsrf();
    const disabled = await postContact({ ...validRequest, csrfToken: issued.token }, issued.cookie);
    expect(disabled.status).toBe(503);
    expect(await disabled.json()).toEqual({ ok: false, message: 'El formulario todavía no está activado.' });

    process.env['CONTACT_ENABLED'] = 'true';
    process.env['CONTACT_RETENTION_APPROVED'] = 'true';
    const blocked = await issueHttpCsrf().then((fresh) => postContact({ ...validRequest, csrfToken: fresh.token }, fresh.cookie));
    expect(blocked.status).toBe(503);
    expect(errorSpy).toHaveBeenCalledWith('contact_live_deployment_blocked', expect.objectContaining({ reasons: expect.arrayContaining(['runtime_not_approved', 'https_public_origin_required']) }));
  });

  it('returns provider failure safely and never logs payloads or tokens', async () => {
    process.env['CONTACT_ENABLED'] = 'true';
    process.env['CONTACT_RETENTION_APPROVED'] = 'true';
    process.env['CONTACT_RUNTIME_APPROVED'] = 'true';
    process.env['CONTACT_DEPLOYMENT_MODE'] = 'single-instance';
    process.env['CONTACT_PUBLIC_ORIGIN'] = 'https://example.test';
    process.env['CONTACT_TRUST_PROXY'] = 'true';
    process.env['CONTACT_PROVIDER'] = 'approved-email';

    const issued = await issueHttpCsrf();
    const response = await postContact({ ...validRequest, csrfToken: issued.token }, issued.cookie);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, message: 'No se ha podido enviar ahora mismo.' });

    const logs = JSON.stringify([...infoSpy.mock.calls, ...errorSpy.mock.calls]);
    expect(logs).not.toContain(validRequest.email);
    expect(logs).not.toContain(validRequest.name);
    expect(logs).not.toContain(validRequest.message);
    expect(logs).not.toContain(issued.token);
  });

  async function issueHttpCsrf(): Promise<{ token: string; cookie: string }> {
    const response = await fetch(`${baseUrl}/api/contact/csrf`);
    const body = (await response.json()) as { csrfToken: string };
    return { token: body.csrfToken, cookie: response.headers.get('set-cookie') ?? '' };
  }

  async function postContact(body: unknown, cookie: string): Promise<Response> {
    return await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie },
      body: JSON.stringify(body)
    });
  }

  async function postRawJson(body: string): Promise<Response> {
    return await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body
    });
  }

  async function expectSafeJsonResponse(response: Response, status: number, message?: string): Promise<void> {
    expect(response.status).toBe(status);
    expect(response.headers.get('content-type')).toContain('application/json');
    const text = await response.text();
    expect(text).not.toContain('<html');
    expect(text).not.toContain('PayloadTooLargeError');
    expect(text).not.toContain('SyntaxError');
    expect(text).not.toContain('at ');
    const body = JSON.parse(text) as Record<string, unknown>;
    expect(body['ok']).toBe(false);
    if (message) expect(body['message']).toBe(message);
  }
});

function jsonBodyAtBytes(targetBytes: number): string {
  const prefix = '{"filler":"';
  const suffix = '"}';
  return `${prefix}${'x'.repeat(targetBytes - Buffer.byteLength(prefix + suffix))}${suffix}`;
}
