import { ContentPage, isIndexable } from './types';
import type { StaticPublicPageKey } from './public-routes';
import { treatmentContentPages } from './treatment-index';

const today = '2026-07-23';

const verifiedBrandFacts = [
  { source: 'identidad-de-marca/guia-de-marca.md', fact: 'Brand name: Marta Martín — Hilando Fino Psicología.', verified: true },
  { source: 'identidad-de-marca/guia-de-marca.md', fact: 'Voice: cercana, profesional, sin jerga clínica innecesaria, no promissory claims.', verified: true },
  { source: 'user-approved correction 2026-07-23', fact: 'Public visitor copy must read like a publication-quality website while preview robots remain invisible metadata only.', verified: true }
];

const methodFacts = [
  {
    source: 'IMG_0742.JPG',
    fact: 'Known method source describes integrative psychology, careful evaluation, scientifically supported approaches including EMDR, Gestalt, Bioenergetic Therapy, and family attachment models such as Circle of Security Parenting.',
    verified: true
  }
];

const publicationCopyNote = ['Unknown credentials, registration, address, direct contact channels, prices, testimonials, exact legal identity, and live-provider approvals remain internal blockers and are omitted from visitor copy.'];

function publicPage(input: Omit<ContentPage, 'status' | 'noindex' | 'includeInSitemap' | 'lastReviewed' | 'blockers' | 'modalityAvailability'> & Partial<ContentPage>): ContentPage {
  return {
    status: input.status ?? 'approved-placeholder',
    noindex: input.noindex ?? true,
    includeInSitemap: input.includeInSitemap ?? true,
    lastReviewed: input.lastReviewed ?? today,
    blockers: input.blockers ?? publicationCopyNote,
    modalityAvailability: input.modalityAvailability ?? {
      'in-person-ciudad-real': 'approved-placeholder',
      online: 'blocked-unverified',
      unsure: 'approved-placeholder'
    },
    ...input
  };
}

export const contentPages = {
  home: publicPage({
    key: 'home',
    canonicalPath: '/',
    primaryIntent: 'brand, method, local trust, and service discovery introduction',
    title: 'Hilando Fino Psicología | Marta Martín en Ciudad Real',
    description: 'Psicología en Ciudad Real con una mirada integradora, cuidadosa y centrada en comprender a cada persona, su historia y sus relaciones.',
    h1: 'Hilando Fino Psicología',
    sourceFacts: verifiedBrandFacts
  }),
  about: publicPage({
    key: 'about',
    canonicalPath: '/sobre-mi',
    primaryIntent: 'Marta professional profile from verified facts',
    title: 'Sobre Marta Martín | Hilando Fino Psicología',
    description: 'Conoce a Marta Martín y la forma de entender el acompañamiento psicológico en Hilando Fino Psicología.',
    h1: 'Sobre Marta Martín',
    sourceFacts: [...verifiedBrandFacts, ...methodFacts]
  }),
  method: publicPage({
    key: 'method',
    canonicalPath: '/como-trabajo',
    primaryIntent: 'therapy method from verified image source',
    title: 'Cómo trabajo | Evaluación, EMDR e integración terapéutica',
    description: 'Una forma de trabajo psicológica integradora: evaluación cuidadosa, vínculo, emoción, cuerpo, relaciones y herramientas con respaldo científico como EMDR.',
    h1: 'Cómo trabajo',
    sourceFacts: [...verifiedBrandFacts, ...methodFacts]
  }),
  interventions: publicPage({
    key: 'interventions',
    canonicalPath: '/areas-de-intervencion',
    primaryIntent: 'service discovery hub with four substantial parent areas',
    title: 'Áreas de intervención psicológica | Hilando Fino Psicología',
    description: 'Infancia y familias, adolescentes, adultos, orientación educativa, talleres y acompañamiento en trauma y duelo desde una mirada cuidadosa.',
    h1: 'Áreas de intervención',
    sourceFacts: verifiedBrandFacts
  }),
  childrenFamilies: publicPage({
    key: 'childrenFamilies',
    canonicalPath: '/areas-de-intervencion/infancia-y-familias',
    parentHub: 'children-families',
    primaryIntent: 'children and family intervention hub',
    title: 'Psicología infantil y familias en Ciudad Real | Hilando Fino',
    description: 'Acompañamiento a infancia y familias ante ansiedad, miedos, conducta, escuela, sueño, autoestima, separación, trauma y duelo infantil.',
    h1: 'Infancia y familias',
    sourceFacts: verifiedBrandFacts
  }),
  adolescents: publicPage({
    key: 'adolescents',
    canonicalPath: '/areas-de-intervencion/adolescentes',
    parentHub: 'adolescents',
    primaryIntent: 'adolescent intervention hub',
    title: 'Psicología para adolescentes | Hilando Fino Psicología',
    description: 'Acompañamiento psicológico a adolescentes en autoestima, ansiedad, vínculos, identidad, orientación académica, trauma, duelo y regulación emocional.',
    h1: 'Adolescentes',
    sourceFacts: verifiedBrandFacts
  }),
  adults: publicPage({
    key: 'adults',
    canonicalPath: '/areas-de-intervencion/adultos',
    parentHub: 'adults',
    primaryIntent: 'adult intervention hub',
    title: 'Psicología para adultos en Ciudad Real | Hilando Fino',
    description: 'Proceso psicológico para adultos ante ansiedad, estrés, trauma, duelo, dependencia emocional, relaciones de pareja y crecimiento personal.',
    h1: 'Adultos',
    sourceFacts: verifiedBrandFacts
  }),
  educationTraining: publicPage({
    key: 'educationTraining',
    canonicalPath: '/areas-de-intervencion/orientacion-educativa-y-formacion',
    parentHub: 'education-training',
    primaryIntent: 'educational guidance and training hub',
    title: 'Orientación educativa y formación | Hilando Fino Psicología',
    description: 'Orientación a familias y centros educativos en aprendizaje, altas capacidades, coordinación escolar y asesoramiento familiar.',
    h1: 'Orientación educativa y formación',
    sourceFacts: verifiedBrandFacts
  }),
  local: publicPage({
    key: 'local',
    canonicalPath: '/psicologia-ciudad-real',
    primaryIntent: 'qualified psychology inquiries in Ciudad Real',
    title: 'Psicóloga en Ciudad Real | Psicología en Ciudad Real',
    description: 'Psicóloga en Ciudad Real para personas y familias que buscan un proceso cuidado, presencial cuando encaja, con evaluación rigurosa y trato cercano.',
    h1: 'Psicóloga en Ciudad Real',
    sourceFacts: verifiedBrandFacts,
    blockers: ['Address, NAP, GBP/citation data, direct contact channels, and production publication approvals remain internal blockers.']
  }),
  traumaLocal: publicPage({
    key: 'traumaLocal',
    canonicalPath: '/psicologia-trauma-ciudad-real',
    primaryIntent: 'trauma and grief psychology intent in Ciudad Real',
    title: 'Psicología para trauma y duelo en Ciudad Real | Hilando Fino',
    description: 'Acompañamiento psicológico en trauma y duelo en Ciudad Real con evaluación cuidadosa, enfoque integrador y posible trabajo con EMDR según cada caso.',
    h1: 'Psicología para trauma y duelo en Ciudad Real',
    sourceFacts: [...verifiedBrandFacts, ...methodFacts]
  }),
  contact: publicPage({
    key: 'contact',
    canonicalPath: '/contacto',
    primaryIntent: 'privacy-safe inquiry route',
    title: 'Contacto | Hilando Fino Psicología',
    description: 'Contacta con Hilando Fino Psicología para orientar tu consulta de forma sencilla, cuidadosa y respetuosa con tu privacidad.',
    h1: 'Contacto',
    sourceFacts: verifiedBrandFacts,
    blockers: ['Live provider, email/phone, privacy/legal text, retention, DPA/hosting, and consent approvals remain internal blockers.']
  }),
  workshops: publicPage({
    key: 'workshops',
    canonicalPath: '/talleres',
    status: 'future-scope',
    primaryIntent: 'workshop and training route without invented dates or prices',
    title: 'Talleres y formación | Hilando Fino Psicología',
    description: 'Talleres y formación para familias, adolescentes, adultos y contextos educativos desde una mirada psicológica clara y práctica.',
    h1: 'Talleres',
    sourceFacts: [{ source: 'openspec proposal and user taxonomy', fact: 'Talleres is a requested top-level route; dates, prices, clients, and formats are not supplied.', verified: true }],
    blockers: ['Dates, prices, client names, exact format, and commercial conditions remain internal blockers.']
  }),
  legalNotice: publicPage({
    key: 'legalNotice',
    canonicalPath: '/aviso-legal',
    status: 'blocked-unverified',
    primaryIntent: 'legal notice',
    title: 'Aviso legal | Hilando Fino Psicología',
    description: 'Información legal general sobre el uso de la web de Hilando Fino Psicología y el alcance de sus contenidos.',
    h1: 'Aviso legal',
    sourceFacts: [],
    blockers: ['Legal identity, address, tax/professional data and responsible party details remain internal blockers.']
  }),
  privacy: publicPage({
    key: 'privacy',
    canonicalPath: '/privacidad',
    status: 'blocked-unverified',
    primaryIntent: 'privacy policy',
    title: 'Privacidad | Hilando Fino Psicología',
    description: 'Información de privacidad para entender qué datos puede solicitar esta web y cómo se plantea una comunicación prudente.',
    h1: 'Privacidad',
    sourceFacts: [],
    blockers: ['Controller, processor, hosting, email provider, retention, rights channel and DPA terms remain internal blockers.']
  }),
  cookies: publicPage({
    key: 'cookies',
    canonicalPath: '/cookies',
    status: 'blocked-unverified',
    primaryIntent: 'cookies policy',
    title: 'Cookies | Hilando Fino Psicología',
    description: 'Información sencilla sobre el uso de cookies técnicas y preferencias de navegación en Hilando Fino Psicología.',
    h1: 'Cookies',
    sourceFacts: [],
    blockers: ['Analytics/cookie consent model remains an internal blocker.']
  })
} satisfies Record<StaticPublicPageKey, ContentPage>;

export const allContentPages = [...Object.values(contentPages), ...treatmentContentPages];
export const approvedSitemapPages = allContentPages.filter(isIndexable);
export const previewSitemapPages = allContentPages.filter((page) => page.includeInSitemap);

export function pageByPath(path: string): ContentPage | undefined {
  const normalized = path.split('?')[0]?.replace(/\/$/, '') || '/';
  return allContentPages.find((page) => (page.canonicalPath === '/' ? normalized === '/' : page.canonicalPath === normalized));
}
