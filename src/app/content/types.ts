export type ApprovalStatus =
  | 'verified-publishable'
  | 'approved-placeholder'
  | 'blocked-unverified'
  | 'merge-into-hub'
  | 'future-scope';

export type ModalityPreference = 'in-person-ciudad-real' | 'online' | 'unsure';

export type HubKey = 'children-families' | 'adolescents' | 'adults' | 'education-training' | 'workshops';

export interface SourceFact {
  source: string;
  fact: string;
  verified: boolean;
}

export interface InterventionTopic {
  sourceLabel: string;
  slug: string;
  parentHub: HubKey;
  status: ApprovalStatus;
  cannibalizationRule: 'hub-only' | 'candidate-standalone-after-approval' | 'future-scope';
  sourceFacts: SourceFact[];
  blockers: string[];
}

export interface ContentPage {
  key: PublicPageKey;
  canonicalPath: `/${string}`;
  status: ApprovalStatus;
  primaryIntent: string;
  title: string;
  description: string;
  h1: string;
  noindex: boolean;
  includeInSitemap: boolean;
  parentHub?: HubKey;
  approver?: string;
  approvalDate?: string;
  lastReviewed: string;
  sourceFacts: SourceFact[];
  blockers: string[];
  modalityAvailability: Partial<Record<ModalityPreference, ApprovalStatus>>;
}

export interface PageSection {
  eyebrow?: string;
  title: string;
  body: string[];
  links?: { label: string; href: string }[];
}

export interface PageCard {
  title: string;
  body: string;
  href?: string;
  status?: ApprovalStatus;
}

export interface PageContent {
  page: ContentPage;
  heroNote: string;
  sections: PageSection[];
  cards?: PageCard[];
}

export const APPROVAL_STATUSES: ApprovalStatus[] = [
  'verified-publishable',
  'approved-placeholder',
  'blocked-unverified',
  'merge-into-hub',
  'future-scope'
];

export function isIndexable(page: ContentPage): boolean {
  return page.status === 'verified-publishable' && !page.noindex && page.includeInSitemap && Boolean(page.approver && page.approvalDate);
}

export function assertValidContentPage(page: ContentPage): void {
  if (!APPROVAL_STATUSES.includes(page.status)) {
    throw new Error(`Invalid approval status for ${page.canonicalPath}`);
  }

  if (page.status === 'verified-publishable' && (!page.approver || !page.approvalDate || page.sourceFacts.length === 0)) {
    throw new Error(`Publishable page ${page.canonicalPath} requires approver, date, and source facts`);
  }

  if (page.includeInSitemap && page.noindex) {
    throw new Error(`Page ${page.canonicalPath} cannot be both noindex and sitemap-included`);
  }
}
import type { PublicPageKey } from './public-routes';
