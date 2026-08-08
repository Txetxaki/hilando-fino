import { sectorPath, treatmentPages } from './treatment-pages';
import type { TreatmentContentPage, TreatmentPage, TreatmentSector } from './treatment-types';
import { siteConfig } from '../../environments/site-config';

/**
 * 29 original topic routes + 6 perinatal routes + the adult mood/low-energy route
 * Marta lists among her "motivos de consulta" but that had no page of its own.
 */
export const REQUIRED_TREATMENT_ROUTE_COUNT = 36;

export const treatmentPagesByPath = new Map<string, TreatmentPage>(treatmentPages.map((page) => [page.canonicalPath, page]));
export const treatmentPagesByTopicKey = new Map<string, TreatmentPage>(treatmentPages.map((page) => [page.topicKey, page]));

export function treatmentsForSector(sector: TreatmentSector): readonly TreatmentPage[] {
  return treatmentPages.filter((page) => page.sector === sector);
}

export function treatmentRoutePath(page: TreatmentPage): string {
  return page.canonicalPath.slice(1);
}

export const treatmentRouteManifest = treatmentPages.map((page) => ({
  path: treatmentRoutePath(page),
  canonicalPath: page.canonicalPath,
  pageKey: `treatment:${page.topicKey}`,
  kind: 'treatment' as const,
  prerender: true as const,
  draftNoindex: true,
  requiredForPagesPreview: true
}));

export const treatmentContentPages: readonly TreatmentContentPage[] = treatmentPages.map((page) => ({
  key: `treatment:${page.topicKey}`,
  canonicalPath: page.canonicalPath,
  treatmentTopicKey: page.topicKey,
  status: 'approved-placeholder',
  primaryIntent: page.summary,
  title: page.title,
  description: page.description,
  h1: page.h1,
  noindex: siteConfig.draftNoindex,
  includeInSitemap: true,
  parentHub: page.sector,
  lastReviewed: page.editorial.lastReviewed,
  sourceFacts: page.sourceFacts,
  blockers: ['Treatment preview content requires Marta/legal review before indexable publication and before unsupported facts can be added.'],
  modalityAvailability: { 'in-person-ciudad-real': 'approved-placeholder', online: 'blocked-unverified', unsure: 'approved-placeholder' }
}));

export function treatmentByPath(path: string): TreatmentPage | undefined {
  const normalized = path.split('?')[0]?.replace(/\/$/, '') || '/';
  return treatmentPagesByPath.get(normalized);
}

export function inboundLinkCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const page of treatmentPages) {
    const out = [parentHref(page.sector), ...page.related.map((link) => link.href).filter(Boolean), '/contacto'];
    for (const href of out) counts.set(href as string, (counts.get(href as string) ?? 0) + 1);
  }
  return counts;
}

export function parentHref(sector: TreatmentSector): string {
  return `/areas-de-intervencion/${sectorPath(sector)}`;
}
