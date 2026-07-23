import { HubKey, InterventionTopic } from './types';

const sharedBlockers = [
  'Marta must confirm this is an active service area.',
  'Clinical boundaries, modality, and sufficient content depth are not approved yet.'
];

function topic(parentHub: HubKey, sourceLabel: string): InterventionTopic {
  return {
    sourceLabel,
    slug: sourceLabel
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    parentHub,
    status: 'merge-into-hub',
    cannibalizationRule: 'hub-only',
    sourceFacts: [
      {
        source: 'openspec proposal/tasks content inventory',
        fact: `Requested inventory label: ${sourceLabel}`,
        verified: true
      }
    ],
    blockers: sharedBlockers
  };
}

export const hubLabels: Record<HubKey, string> = {
  'children-families': 'Infancia y familias',
  adolescents: 'Adolescentes',
  adults: 'Adultos',
  'education-training': 'Orientación educativa y formación',
  workshops: 'Talleres'
};

export const interventionTopics: InterventionTopic[] = [
  topic('children-families', 'ansiedad'),
  topic('children-families', 'miedos'),
  topic('children-families', 'regulación emocional'),
  topic('children-families', 'problemas de conducta'),
  topic('children-families', 'dificultades escolares'),
  topic('children-families', 'trauma y duelo infantil'),
  topic('children-families', 'separación de los padres'),
  topic('children-families', 'autoestima'),
  topic('children-families', 'problemas de sueño'),
  topic('children-families', 'control de esfínteres'),
  topic('adolescents', 'autoestima'),
  topic('adolescents', 'ansiedad'),
  topic('adolescents', 'relaciones sociales'),
  topic('adolescents', 'identidad'),
  topic('adolescents', 'orientación académica'),
  topic('adolescents', 'trauma'),
  topic('adolescents', 'duelo'),
  topic('adolescents', 'regulación emocional'),
  topic('adults', 'ansiedad'),
  topic('adults', 'estrés'),
  topic('adults', 'trauma'),
  topic('adults', 'duelo'),
  topic('adults', 'dependencia emocional'),
  topic('adults', 'relaciones de pareja'),
  topic('adults', 'crecimiento personal'),
  topic('education-training', 'dificultades de aprendizaje'),
  topic('education-training', 'altas capacidades'),
  topic('education-training', 'coordinación con centros educativos'),
  topic('education-training', 'asesoramiento familiar')
];

export const workshopsPlaceholder: InterventionTopic = {
  sourceLabel: 'talleres',
  slug: 'talleres',
  parentHub: 'workshops',
  status: 'future-scope',
  cannibalizationRule: 'future-scope',
  sourceFacts: [
    { source: 'openspec proposal', fact: 'Talleres requested as conditional top-level route/section only.', verified: true }
  ],
  blockers: ['Audience, format, dates, availability, privacy boundaries, and commercial/legal details are missing.']
};

export function topicsForHub(parentHub: HubKey): InterventionTopic[] {
  return interventionTopics.filter((item) => item.parentHub === parentHub);
}
