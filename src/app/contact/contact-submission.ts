import { practiceIdentity } from '../content/practice-identity';
import type { ContactRequest } from './contact.types';

export const contactApiRoutes = {
  csrf: '/api/contact/csrf',
  submit: '/api/contact'
} as const;

export const contactSubmissionMessages = {
  sent: 'Gracias. He recibido tu solicitud y te responderé lo antes posible.',
  invalid: 'Revisa los campos señalados y vuelve a intentarlo.',
  rejected: 'Revisa los campos del formulario e inténtalo de nuevo.',
  unavailable: `El envío automático no está disponible ahora mismo. Escríbeme directamente a ${practiceIdentity.email} y te responderé igual.`
} as const;

export type ContactSubmissionStatus = 'sent' | 'rejected' | 'unavailable';

export interface ContactSubmissionResult {
  status: ContactSubmissionStatus;
  message: string;
}

export interface ContactSubmissionDeps {
  fetch: typeof globalThis.fetch;
}

/**
 * Every failure the visitor cannot act on collapses into `unavailable`, whose message
 * names the mailbox. The static preview has no `/api/contact` at all, so that path is
 * the normal one there, not an edge case.
 */
export async function submitContactRequest(request: ContactRequest, deps: ContactSubmissionDeps): Promise<ContactSubmissionResult> {
  const csrfToken = await requestCsrfToken(deps);
  if (!csrfToken) return unavailable();

  let response: Response;
  try {
    response = await deps.fetch(contactApiRoutes.submit, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(toWireBody(request, csrfToken))
    });
  } catch {
    return unavailable();
  }

  if (response.status === 202) return { status: 'sent', message: contactSubmissionMessages.sent };

  // 4xx is something the visitor can fix or retry; anything else is ours to fix.
  if (response.status >= 400 && response.status < 500) {
    const serverMessage = messageFrom(await readJson(response));
    return { status: 'rejected', message: serverMessage ?? contactSubmissionMessages.rejected };
  }

  return unavailable();
}

async function requestCsrfToken(deps: ContactSubmissionDeps): Promise<string | null> {
  try {
    const response = await deps.fetch(contactApiRoutes.csrf, {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    if (!response.ok) return null;
    const body = await readJson(response);
    const token = body?.['csrfToken'];
    return body?.['ok'] === true && typeof token === 'string' && token ? token : null;
  } catch {
    return null;
  }
}

function toWireBody(request: ContactRequest, csrfToken: string): Record<string, unknown> {
  return {
    name: request.name,
    email: request.email ?? '',
    phone: request.phone ?? '',
    preferredContact: request.preferredContact,
    modalityPreference: request.modalityPreference,
    ciudadRealFit: request.ciudadRealFit,
    reasonCategory: request.reasonCategory,
    message: request.message ?? '',
    privacyConsent: request.privacyConsent,
    // Forwarded rather than blanked so the server-side honeypot still sees what a bot typed.
    website: request.website ?? '',
    csrfToken
  };
}

async function readJson(response: Response): Promise<Record<string, unknown> | null> {
  try {
    const parsed: unknown = await response.json();
    return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function messageFrom(body: Record<string, unknown> | null): string | null {
  const message = body?.['message'];
  return typeof message === 'string' && message.trim() ? message : null;
}

function unavailable(): ContactSubmissionResult {
  return { status: 'unavailable', message: contactSubmissionMessages.unavailable };
}
