import { ModalityPreference } from '../content/types';
import type { CiudadRealFit, PreferredContact, ReasonCategory } from './contact.constants';

export type { CiudadRealFit, PreferredContact, ReasonCategory } from './contact.constants';

export interface ContactRequest {
  name: string;
  email?: string;
  phone?: string;
  preferredContact: PreferredContact;
  modalityPreference: ModalityPreference;
  ciudadRealFit: CiudadRealFit;
  reasonCategory: ReasonCategory;
  message?: string;
  privacyConsent: true;
  website?: string;
}
