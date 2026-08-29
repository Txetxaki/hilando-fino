import { describe, expect, it } from 'vitest';

import type { ContactRequest } from '../../app/contact/contact.types';
import { buildContactEmail, type ContactProvider, createContactProvider, DisabledContactProvider, readSmtpConfig, SmtpContactProvider } from './provider';

const smtpEnv = {
  CONTACT_SMTP_HOST: 'smtp.dondominio.com',
  CONTACT_SMTP_USER: 'info@hilandofinopsicologia.com',
  CONTACT_SMTP_PASSWORD: 'not-a-real-password',
  CONTACT_SMTP_TO: 'info@hilandofinopsicologia.com'
} as unknown as NodeJS.ProcessEnv;

const request: ContactRequest = {
  name: 'Persona',
  email: 'persona@example.com',
  phone: '600 000 000',
  preferredContact: 'email',
  modalityPreference: 'in-person-ciudad-real',
  ciudadRealFit: 'yes',
  reasonCategory: 'children-families',
  message: 'Prefiero que me respondan por la tarde.',
  privacyConsent: true
};

describe('smtp configuration', () => {
  it('defaults to the implicit-TLS submission port used by the mail provider', () => {
    const config = readSmtpConfig(smtpEnv);
    expect(config).toMatchObject({ host: 'smtp.dondominio.com', port: 465, secure: true, from: 'info@hilandofinopsicologia.com' });
  });

  it('honours an explicit STARTTLS submission port', () => {
    const config = readSmtpConfig({ ...smtpEnv, CONTACT_SMTP_PORT: '587' } as NodeJS.ProcessEnv);
    expect(config).toMatchObject({ port: 587, secure: false });
  });

  it('never negotiates plaintext on an explicit secure flag', () => {
    const config = readSmtpConfig({ ...smtpEnv, CONTACT_SMTP_PORT: '587', CONTACT_SMTP_SECURE: 'true' } as NodeJS.ProcessEnv);
    expect(config).toMatchObject({ port: 587, secure: true });
  });

  it('returns null when any credential is missing so contact stays disabled instead of half-configured', () => {
    for (const key of ['CONTACT_SMTP_HOST', 'CONTACT_SMTP_USER', 'CONTACT_SMTP_PASSWORD', 'CONTACT_SMTP_TO']) {
      const partial = { ...smtpEnv } as Record<string, string | undefined>;
      delete partial[key];
      expect(readSmtpConfig(partial as NodeJS.ProcessEnv)).toBeNull();
    }
  });

  it('rejects a placeholder password left over from the example environment file', () => {
    expect(readSmtpConfig({ ...smtpEnv, CONTACT_SMTP_PASSWORD: 'replace-me' } as NodeJS.ProcessEnv)).toBeNull();
  });
});

describe('contact provider selection', () => {
  it('stays disabled without SMTP credentials', () => {
    expect(createContactProvider({} as NodeJS.ProcessEnv)).toBeInstanceOf(DisabledContactProvider);
  });

  it('uses SMTP delivery once credentials are present', () => {
    expect(createContactProvider(smtpEnv)).toBeInstanceOf(SmtpContactProvider);
  });

  it('rejects every send while disabled', async () => {
    const provider: ContactProvider = new DisabledContactProvider();
    await expect(provider.send(request)).rejects.toThrow();
  });
});

describe('contact email composition', () => {
  const config = readSmtpConfig(smtpEnv)!;

  it('routes the enquiry to the practice mailbox and replies to the visitor', () => {
    const mail = buildContactEmail(request, config);
    expect(mail.to).toBe('info@hilandofinopsicologia.com');
    expect(mail.from).toContain('info@hilandofinopsicologia.com');
    expect(mail.replyTo).toBe('persona@example.com');
    expect(mail.subject).toContain('Infancia y familias');
  });

  it('carries every field the practitioner needs to answer', () => {
    const mail = buildContactEmail(request, config);
    expect(mail.text).toContain('Persona');
    expect(mail.text).toContain('600 000 000');
    expect(mail.text).toContain('Prefiero que me respondan por la tarde.');
    expect(mail.text).toContain('Presencial en Ciudad Real');
  });

  it('omits reply-to when the visitor asked to be phoned instead', () => {
    const mail = buildContactEmail({ ...request, email: undefined, preferredContact: 'phone' }, config);
    expect(mail.replyTo).toBeUndefined();
    expect(mail.text).toContain('Teléfono');
  });

  it('strips header injection attempts from every header-bound value', () => {
    const mail = buildContactEmail({ ...request, name: 'Persona\r\nBcc: attacker@example.com', email: 'persona@example.com\nBcc: attacker@example.com' }, config);
    expect(mail.subject).not.toMatch(/[\r\n]/);
    expect(mail.replyTo ?? '').not.toMatch(/[\r\n]/);
    expect(mail.subject).not.toContain('attacker@example.com');
    expect(mail.replyTo).toBeUndefined();
  });
});
