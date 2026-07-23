import type { ContactRequest, CiudadRealFit, PreferredContact, ReasonCategory } from '../../app/contact/contact.types';
import { approvedContactModalities, ciudadRealFitOptions, contactFieldLimits, preferredContactOptions, reasonCategories } from '../../app/contact/contact.constants';
import { ModalityPreference } from '../../app/content/types';

export interface ValidationResult {
  ok: boolean;
  errors: string[];
  safeRequest?: ContactRequest;
}

export function validateContactRequest(input: unknown): ValidationResult {
  if (!isRecord(input)) return { ok: false, errors: ['Request body must be an object.'] };
  const errors: string[] = [];
  const name = text(input['name'], contactFieldLimits.name);
  const email = text(input['email'], contactFieldLimits.email);
  const phone = text(input['phone'], contactFieldLimits.phone);
  const message = text(input['message'], contactFieldLimits.message);
  const preferredContact = input['preferredContact'];
  const modalityPreference = input['modalityPreference'];
  const ciudadRealFit = input['ciudadRealFit'];
  const reasonCategory = input['reasonCategory'];
  const honeypot = text(input['website'], contactFieldLimits.honeypot);

  if (!name) errors.push('Name is required.');
  if (!preferredContactOptions.includes(preferredContact as 'email' | 'phone')) errors.push('Preferred contact is invalid.');
  if (preferredContact === 'email' && !email) errors.push('Email is required for email contact.');
  if (preferredContact === 'phone' && !phone) errors.push('Phone is required for phone contact.');
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('Email format is invalid.');
  if (!approvedContactModalities.some((modality) => modality === modalityPreference)) errors.push('Modality is not approved.');
  if (!ciudadRealFitOptions.includes(ciudadRealFit as 'yes' | 'no' | 'unsure')) errors.push('Ciudad Real fit is invalid.');
  if (!reasonCategories.includes(reasonCategory as ReasonCategory)) errors.push('Reason category is invalid.');
  if (input['privacyConsent'] !== true) errors.push('Privacy consent is required.');
  if (honeypot) errors.push('Spam check failed.');

  if (errors.length > 0) return { ok: false, errors };
  return {
    ok: true,
    errors: [],
    safeRequest: {
      name,
      email: email || undefined,
      phone: phone || undefined,
      preferredContact: preferredContact as PreferredContact,
      modalityPreference: modalityPreference as ModalityPreference,
      ciudadRealFit: ciudadRealFit as CiudadRealFit,
      reasonCategory: reasonCategory as ReasonCategory,
      message: message || undefined,
      privacyConsent: true,
      website: undefined
    }
  };
}

export function redactedContactLog(result: ValidationResult): Record<string, unknown> {
  return {
    ok: result.ok,
    errorCount: result.errors.length,
    reasonCategory: result.safeRequest?.reasonCategory,
    modalityPreference: result.safeRequest?.modalityPreference,
    ciudadRealFit: result.safeRequest?.ciudadRealFit
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function text(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}
