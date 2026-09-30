import { describe, expect, it, vi } from 'vitest';

import { contactSubmissionMessages, submitContactRequest, web3formsEndpoint } from './contact-submission';
import type { ContactRequest } from './contact.types';
import { web3formsAccessKey, web3formsPlaceholderKey } from './web3forms.config';

const realKey = 'test-access-key-1234';

const payload: ContactRequest = {
  name: 'Persona',
  email: 'persona@example.com',
  phone: '600000000',
  preferredContact: 'email',
  modalityPreference: 'in-person-ciudad-real',
  ciudadRealFit: 'yes',
  reasonCategory: 'general',
  message: 'Prefiero que me respondan por la tarde.',
  privacyConsent: true
};

const jsonResponse = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('contact submission transport (Web3Forms)', () => {
  it('ships with a real access key, not the placeholder', () => {
    expect(web3formsPlaceholderKey).toBe('REPLACE_WITH_WEB3FORMS_ACCESS_KEY');
    expect(web3formsAccessKey).not.toBe(web3formsPlaceholderKey);
    expect(web3formsAccessKey).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it('falls back to the direct email route and never calls fetch while the key is the placeholder', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>();

    const result = await submitContactRequest(payload, { fetch: fetchMock, accessKey: web3formsPlaceholderKey });

    expect(result.status).toBe('unavailable');
    expect(result.message).toContain('info@hilandofinopsicologia.com');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('treats an empty key as unavailable too', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>();
    const result = await submitContactRequest(payload, { fetch: fetchMock, accessKey: '  ' });
    expect(result.status).toBe('unavailable');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts the JSON payload to Web3Forms and reports success only on ok + success:true', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>().mockResolvedValueOnce(jsonResponse(200, { success: true, message: 'Email sent successfully!' }));

    const result = await submitContactRequest(payload, { fetch: fetchMock, accessKey: realKey });

    expect(result).toEqual({ status: 'sent', message: contactSubmissionMessages.sent });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(web3formsEndpoint).toBe('https://api.web3forms.com/submit');
    expect(init?.method).toBe('POST');
    const headers = init?.headers as Record<string, string>;
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers['Accept']).toBe('application/json');
    const body = JSON.parse(String(init?.body));
    expect(body).toMatchObject({
      access_key: realKey,
      subject: 'Nuevo mensaje desde hilandofinopsicologia.com',
      from_name: 'Persona',
      name: 'Persona',
      email: 'persona@example.com',
      replyto: 'persona@example.com',
      phone: '600000000',
      botcheck: false
    });
    expect(body.message).toContain('Prefiero que me respondan por la tarde.');
    expect(JSON.stringify(body)).not.toContain('csrf');
  });

  it('omits email/replyto when the visitor gave no email', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>().mockResolvedValueOnce(jsonResponse(200, { success: true }));
    await submitContactRequest({ ...payload, email: undefined }, { fetch: fetchMock, accessKey: realKey });
    const body = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body));
    expect(body.email).toBeUndefined();
    expect(body.replyto).toBeUndefined();
  });

  it('shows an error when Web3Forms answers success:false', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>().mockResolvedValueOnce(jsonResponse(200, { success: false, message: 'Invalid access key' }));

    const result = await submitContactRequest(payload, { fetch: fetchMock, accessKey: realKey });

    expect(result.status).toBe('unavailable');
    expect(result.message).toContain('info@hilandofinopsicologia.com');
  });

  it('never reports success on a non-ok response even if the body says success', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>().mockResolvedValueOnce(jsonResponse(500, { success: true }));
    const result = await submitContactRequest(payload, { fetch: fetchMock, accessKey: realKey });
    expect(result.status).not.toBe('sent');
  });

  it('shows an error on a non-JSON response', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>().mockResolvedValueOnce(new Response('<html></html>', { status: 200 }));
    const result = await submitContactRequest(payload, { fetch: fetchMock, accessKey: realKey });
    expect(result.status).not.toBe('sent');
  });

  it('shows an error on network failure', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>().mockRejectedValue(new TypeError('Failed to fetch'));

    const result = await submitContactRequest(payload, { fetch: fetchMock, accessKey: realKey });

    expect(result.status).toBe('unavailable');
    expect(result.message).toContain('info@hilandofinopsicologia.com');
  });

  it('sends nothing when the honeypot is filled', async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>();

    const result = await submitContactRequest({ ...payload, website: 'https://spam.example' }, { fetch: fetchMock, accessKey: realKey });

    expect(result.status).toBe('rejected');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
