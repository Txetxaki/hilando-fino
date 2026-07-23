import type { ModalityPreference } from '../content/types';

export const contactFieldLimits = {
  name: 80,
  email: 120,
  phone: 40,
  message: 600,
  honeypot: 100,
  jsonBytes: '12kb'
} as const;

export const preferredContactOptions = ['email', 'phone'] as const;
export type PreferredContact = (typeof preferredContactOptions)[number];
export const approvedContactModalities = ['in-person-ciudad-real', 'unsure'] as const satisfies readonly ModalityPreference[];
export const ciudadRealFitOptions = ['yes', 'no', 'unsure'] as const;
export type CiudadRealFit = (typeof ciudadRealFitOptions)[number];
export const reasonCategories = ['general', 'children-families', 'adolescents', 'adults', 'education-training'] as const;
export type ReasonCategory = (typeof reasonCategories)[number];
export const analyticsSafeCategoryOptions = [...reasonCategories, 'legal'] as const;
export type AnalyticsSafeCategory = (typeof analyticsSafeCategoryOptions)[number];
export const validationOutcomeCodes = ['valid', 'invalid', 'provider-disabled', 'provider-failed'] as const;
export type ValidationOutcomeCode = (typeof validationOutcomeCodes)[number];

export const reasonCategoryLabels: Record<ReasonCategory, string> = {
  general: 'Consulta general',
  'children-families': 'Infancia y familias',
  adolescents: 'Adolescentes',
  adults: 'Adultos',
  'education-training': 'Orientación educativa y formación'
};
