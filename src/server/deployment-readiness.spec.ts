import { randomBytes } from 'node:crypto';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { createHilandoFinoApp } from './app';
import { contactReadiness } from './contact/handler';

const managedKeys = [
  'CONTACT_ENABLED',
  'CONTACT_RETENTION_APPROVED',
  'CONTACT_RUNTIME_APPROVED',
  'CONTACT_DEPLOYMENT_MODE',
  'CONTACT_PUBLIC_ORIGIN',
  'CONTACT_TRUST_PROXY',
  'CONTACT_PROVIDER',
  'CONTACT_CSRF_SECRET',
  'CONTACT_SMTP_HOST',
  'CONTACT_SMTP_USER',
  'CONTACT_SMTP_PASSWORD',
  'CONTACT_SMTP_TO'
];

const liveEnv = (): NodeJS.ProcessEnv =>
  ({
    CONTACT_ENABLED: 'true',
    CONTACT_RETENTION_APPROVED: 'true',
    CONTACT_RUNTIME_APPROVED: 'true',
    CONTACT_DEPLOYMENT_MODE: 'single-instance',
    CONTACT_PUBLIC_ORIGIN: 'https://hilandofinopsicologia.com',
    CONTACT_TRUST_PROXY: 'true',
    CONTACT_PROVIDER: 'approved-email',
    CONTACT_CSRF_SECRET: `base64:${randomBytes(32).toString('base64')}`,
    CONTACT_SMTP_HOST: 'smtp.dondominio.com',
    CONTACT_SMTP_USER: 'info@hilandofinopsicologia.com',
    CONTACT_SMTP_PASSWORD: 'a-real-enough-password',
    CONTACT_SMTP_TO: 'info@hilandofinopsicologia.com'
  }) as unknown as NodeJS.ProcessEnv;

describe('contact readiness diagnostics', () => {
  it('reports ready once every approval and credential is present', () => {
    expect(contactReadiness(liveEnv())).toEqual({ ready: true, blockedBy: [] });
  });

  it('names being switched off rather than silently reporting no blockers', () => {
    expect(contactReadiness({} as NodeJS.ProcessEnv)).toEqual({ ready: false, blockedBy: ['contact_not_enabled'] });
  });

  it('names the missing SMTP credentials, which the approval gate alone never surfaces', () => {
    const env = liveEnv();
    delete env['CONTACT_SMTP_PASSWORD'];
    expect(contactReadiness(env)).toEqual({ ready: false, blockedBy: ['smtp_config_incomplete'] });
  });

  it('names every missing approval at once so one restart shows the whole list', () => {
    const env = liveEnv();
    delete env['CONTACT_RUNTIME_APPROVED'];
    delete env['CONTACT_TRUST_PROXY'];
    const result = contactReadiness(env);
    expect(result.ready).toBe(false);
    expect(result.blockedBy).toEqual(expect.arrayContaining(['runtime_not_approved', 'trusted_proxy_required']));
  });

  it('never leaks a secret into the diagnostic', () => {
    const env = liveEnv();
    env['CONTACT_SMTP_PASSWORD'] = 'super-secret-value';
    expect(JSON.stringify(contactReadiness(env))).not.toContain('super-secret-value');
  });
});

describe('reverse proxy trust', () => {
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const key of managedKeys) saved[key] = process.env[key];
  });

  afterEach(() => {
    for (const key of managedKeys) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  });

  it('trusts a single forwarding hop when the deployment declares a proxy', () => {
    process.env['CONTACT_TRUST_PROXY'] = 'true';
    // Without this, every visitor behind the proxy shares one `req.ip` and the contact rate
    // limiter throttles the whole site after 20 requests a minute.
    expect(createHilandoFinoApp().get('trust proxy')).toBe(1);
  });

  it('trusts nothing by default, so a client cannot spoof its address with a header', () => {
    delete process.env['CONTACT_TRUST_PROXY'];
    expect(createHilandoFinoApp().get('trust proxy')).toBe(false);
  });
});
