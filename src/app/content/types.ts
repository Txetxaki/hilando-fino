export type ApprovalStatus =
  | 'verified-publishable'
  | 'approved-placeholder'
  | 'blocked-unverified'
  | 'merge-into-hub'
  | 'future-scope';

export type ModalityPreference = 'in-person-ciudad-real' | 'online' | 'unsure';

export type HubKey = 'children-families' | 'adolescents' | 'adults' | 'perinatal' | 'education-training' | 'workshops';

export interface SourceFact {
  source: string;
  fact: string;
  verified: boolean;
}

export interface ContentPage {
  key: string;
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

export type SiteImageKey = 'martaDesk' | 'martaWorking' | 'consultingRoom' | 'sandtray' | 'projectiveFigures';

/**
 * Editorial blocks that only some pages need. Keeping them as a discriminated
 * union (rather than one page component per layout) lets the shared standard-page
 * template render Marta's richer sections — her training list, the therapeutic
 * models, the in-session resources, the workshop catalogue — without every page
 * paying for markup it does not use.
 */
export type PageBlock =
  | { kind: 'credentials'; eyebrow: string; title: string; intro?: string }
  | { kind: 'models'; eyebrow: string; title: string; intro?: string }
  | { kind: 'resources'; eyebrow: string; title: string; intro?: string }
  | { kind: 'workshops'; eyebrow: string; title: string; intro?: string }
  | { kind: 'checklist'; eyebrow: string; title: string; intro?: string; items: string[] }
  | { kind: 'highlight'; eyebrow: string; title: string; body: string[]; links?: { label: string; href: string }[] }
  | { kind: 'quote'; text: string }
  | { kind: 'figure'; imageKey: SiteImageKey; caption?: string };

export interface PageContent {
  page: ContentPage;
  heroNote: string;
  heroImage?: SiteImageKey;
  /** Extra lead paragraphs rendered under the hero copy with no heading of their own — for text she wrote as the page's main paragraph, not as a labelled sub-section. */
  heroBody?: string[];
  heroLinks?: { label: string; href: string }[];
  sections: PageSection[];
  blocks?: PageBlock[];
  cards?: PageCard[];
  related?: PageCard[];
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

  // Preview builds intentionally keep visitor-facing routes in the sitemap artifact
  // while metadata and robots policy block indexing.
}
