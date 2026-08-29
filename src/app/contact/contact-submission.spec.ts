import { describe, expect, it, vi } from 'vitest';

import { contactSubmissionMessages, submitContactRequest } from './contact-submission';
import type { ContactRequest } from './contact.types';

const payload: ContactRequest = {
  name: 'Persona',
  email: 'persona@example.com',
  preferredContact: 'email',
  modalityPreference: 'in-person-ciudad-real',
  ciudadRealFit: 'yes',
  reasonCategory: 'general',
  message: 'Prefiero que me respondan por la tarde.',
  privacyConsent: true
};

const jsonResponse = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const htmlResponse = (status: number): Response =>
  new Response('<!doctype html><title>404</title>', { status, headers: { 'Content-Type': 'text/html' } });

describe('contact submission transport', () => {
  it('sends the payload with the server-issued CSRF token and reports success', async () => {
    const fetchMock = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(jsonResponse(200, { ok: true, csrfToken: 'token-123' }))
      .mockResolvedValueOnce(jsonResponse(202, { ok: true, message: 'Solicitud recibida.' }));

    const result = await submitContactRequest(payload, { fetch: fetchMock });

    expect(result).toEqual({ status: 'sent', message: contactSubmissionMessages.sent });
    expect(fetchMock.mock.calls[0]?.[0]).toBe('/api/contact/csrf');
    const [postUrl, postInit] = fetchMock.mock.calls[1] ?? [];
    expect(postUrl).toBe('/api/contact');
    expect(postInit?.method).toBe('POST');
    expect(postInit?.credentials).toBe('same-origin');
    expect(JSON.parse(String(postInit?.body))).toMatchObject({ name: 'Persona', csrfToken: 'token-123' });
  });

  it('never leaks the honeypot value or an undeclared field into the request body', async () => {
    const fetchMock = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(jsonResponse(200, { ok: true, csrfToken: 'token-123' }))
      .mockResolvedValueOnce(jsonResponse(202, { ok: true }));

    await submitContactRequest({ ...payload, website: '' }, { fetch: fetchMock });

    const body = JSON.parse(String(fetchMock.mock.calls[1]?.[1]?.body));
    expect(Object.keys(body).sort()).toEqual(
      ['ciudadRealFit', 'csrfToken', 'email', 'message', 'modalityPreference', 'name', 'phone', 'preferredContact', 'privacyConsent', 'reasonCategory', 'website'].sort()
    );
  });

  it('degrades to the direct email route when the API is not deployed', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>().mockResolvedValueOnce(htmlResponse(404));

    const result = await submitContactRequest(payload, { fetch: fetchMock });

    expect(result.status).toBe('unavailable');
    expect(result.message).toContain('info@hilandofinopsicologia.com');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('degrades to the direct email route when the network fails', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>().mockRejectedValue(new TypeError('Failed to fetch'));

    const result = await submitContactRequest(payload, { fetch: fetchMock });

    expect(result.status).toBe('unavailable');
    expect(result.message).toContain('info@hilandofinopsicologia.com');
  });

  it('degrades to the direct email route when the provider is disabled server-side', async () => {
    const fetchMock = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(jsonResponse(200, { ok: true, csrfToken: 'token-123' }))
      .mockResolvedValueOnce(jsonResponse(503, { ok: false, message: 'El formulario todavía no está activado.' }));

    const result = await submitContactRequest(payload, { fetch: fetchMock });

    expect(result.status).toBe('unavailable');
    expect(result.message).toContain('info@hilandofinopsicologia.com');
  });

  it('surfaces the server message for a rejected submission', async () => {
    const fetchMock = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(jsonResponse(200, { ok: true, csrfToken: 'token-123' }))
      .mockResolvedValueOnce(jsonResponse(429, { ok: false, message: 'Demasiados intentos. Inténtalo más tarde.' }));

    const result = await submitContactRequest(payload, { fetch: fetchMock });

    expect(result).toEqual({ status: 'rejected', message: 'Demasiados intentos. Inténtalo más tarde.' });
  });

  it('falls back to a generic rejection message when the server sends none', async () => {
    const fetchMock = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(jsonResponse(200, { ok: true, csrfToken: 'token-123' }))
      .mockResolvedValueOnce(jsonResponse(400, { ok: false }));

    const result = await submitContactRequest(payload, { fetch: fetchMock });

    expect(result).toEqual({ status: 'rejected', message: contactSubmissionMessages.rejected });
  });
});
