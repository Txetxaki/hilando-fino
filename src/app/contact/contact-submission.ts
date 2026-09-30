import { practiceIdentity } from '../content/practice-identity';
import {
  ciudadRealFitLabels,
  modalityPreferenceLabels,
  preferredContactLabels,
  reasonCategoryLabels
} from './contact.constants';
import type { ContactRequest } from './contact.types';
import { web3formsAccessKey, web3formsPlaceholderKey } from './web3forms.config';

export const web3formsEndpoint = 'https://api.web3forms.com/submit';
export const contactEmailSubject = 'Nuevo mensaje desde hilandofinopsicologia.com';

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
  /** Overridable for tests; defaults to the key in web3forms.config.ts. */
  accessKey?: string;
}

/**
 * Every failure the visitor cannot act on collapses into `unavailable`, whose message
 * names the mailbox. While the access key is still the placeholder nothing is sent.
 * Success requires both an ok HTTP status and `success: true` in the JSON body.
 */
export async function submitContactRequest(request: ContactRequest, deps: ContactSubmissionDeps): Promise<ContactSubmissionResult> {
  const accessKey = (deps.accessKey ?? web3formsAccessKey).trim();
  if (!accessKey || accessKey === web3formsPlaceholderKey) return unavailable();

  // A filled honeypot means a bot: send nothing and do not say why.
  if (request.website?.trim()) return { status: 'rejected', message: contactSubmissionMessages.rejected };

  let response: Response;
  try {
    response = await deps.fetch(web3formsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(toWireBody(request, accessKey))
    });
  } catch {
    return unavailable();
  }

  const body = await readJson(response);
  if (response.ok && body?.['success'] === true) return { status: 'sent', message: contactSubmissionMessages.sent };
  return unavailable();
}

function toWireBody(request: ContactRequest, accessKey: string): Record<string, unknown> {
  const details = [
    `Preferencia de contacto: ${preferredContactLabels[request.preferredContact]}`,
    `Modalidad preferida: ${modalityPreferenceLabels[request.modalityPreference]}`,
    `Encaje con Ciudad Real: ${ciudadRealFitLabels[request.ciudadRealFit]}`,
    `Motivo amplio: ${reasonCategoryLabels[request.reasonCategory]}`
  ].join('\n');
  const body: Record<string, unknown> = {
    access_key: accessKey,
    subject: contactEmailSubject,
    from_name: request.name,
    name: request.name,
    phone: request.phone ?? '',
    message: `${request.message ?? '(Sin mensaje)'}\n\n${details}`,
    botcheck: false
  };
  if (request.email) {
    body['email'] = request.email;
    body['replyto'] = request.email;
  }
  return body;
}

async function readJson(response: Response): Promise<Record<string, unknown> | null> {
  try {
    const parsed: unknown = await response.json();
    return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function unavailable(): ContactSubmissionResult {
  return { status: 'unavailable', message: contactSubmissionMessages.unavailable };
}
