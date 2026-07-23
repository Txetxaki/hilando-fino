import type { ContentPage, HubKey, PageCard, PageSection, SourceFact } from './types';

export type TreatmentSector = Exclude<HubKey, 'workshops'>;

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BoundaryNote {
  kind: 'medical' | 'pediatric' | 'legal' | 'emergency' | 'safety' | 'consent' | 'scope';
  text: string;
}

export interface TreatmentPage {
  topicKey: `${TreatmentSector}:${string}`;
  canonicalPath: `/${string}`;
  sector: TreatmentSector;
  slug: string;
  title: string;
  description: string;
  h1: string;
  summary: string;
  introFirstPerson: string;
  situations: PageSection;
  contextImpact: PageSection;
  howICanHelp: PageSection;
  process: PageSection;
  faq: FaqItem[];
  related: PageCard[];
  localCta: string;
  sourceFacts: SourceFact[];
  editorial: {
    status: 'preview-noindex-needs-human-approval';
    lastReviewed: string;
    similarityGroup: string;
  };
  boundaries: BoundaryNote[];
}

export interface TreatmentContentPage extends ContentPage {
  treatmentTopicKey: TreatmentPage['topicKey'];
}
