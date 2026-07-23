import { ModalityPreference } from '../../content/types';
import { knownPrerenderedPaths } from '../../content/public-routes';
import { analyticsSafeCategoryOptions, validationOutcomeCodes, type AnalyticsSafeCategory, type ValidationOutcomeCode } from '../../contact/contact.constants';

export type AnalyticsEventName =
  | 'page_view'
  | 'cta_click'
  | 'contact_form_start'
  | 'modality_preference_selected'
  | 'contact_submit_success'
  | 'contact_submit_failure'
  | 'consent_visible'
  | 'gbp_click';

export interface SafeAnalyticsProperties {
  route?: string;
  ctaSource?: string;
  modality?: ModalityPreference;
  category?: AnalyticsSafeCategory;
  validationOutcome?: ValidationOutcomeCode;
}

export interface SafeAnalyticsEvent {
  name: AnalyticsEventName;
  properties: SafeAnalyticsProperties;
  createdAt: string;
}

const allowedRoutes = new Set(knownPrerenderedPaths);

export function sanitizeAnalyticsProperties(input: Record<string, unknown>): SafeAnalyticsProperties {
  const clean: SafeAnalyticsProperties = {};

  if (typeof input['route'] === 'string') clean.route = sanitizeRoute(input['route']);
  if (typeof input['ctaSource'] === 'string') clean.ctaSource = input['ctaSource'];
  if (input['modality'] === 'in-person-ciudad-real' || input['modality'] === 'online' || input['modality'] === 'unsure') clean.modality = input['modality'];
  if (analyticsSafeCategoryOptions.includes(input['category'] as AnalyticsSafeCategory)) {
    clean.category = input['category'] as AnalyticsSafeCategory;
  }
  if (validationOutcomeCodes.includes(input['validationOutcome'] as ValidationOutcomeCode)) {
    clean.validationOutcome = input['validationOutcome'] as ValidationOutcomeCode;
  }
  return clean;
}

export function sanitizeRoute(route: string): string {
  const path = route.split(/[?#]/)[0]?.replace(/\/+$/, '') || '/';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return allowedRoutes.has(normalized) ? normalized : '/';
}
