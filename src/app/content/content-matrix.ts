import { ContentPage, isIndexable } from './types';
import type { PublicPageKey } from './public-routes';

const today = '2026-07-22';

const verifiedBrandFacts = [
  { source: 'identidad-de-marca/guia-de-marca.md', fact: 'Brand name: Marta Martín — Hilando Fino Psicología.', verified: true },
  { source: 'identidad-de-marca/guia-de-marca.md', fact: 'Voice: cercana, profesional, sin jerga clínica innecesaria, no promissory claims.', verified: true }
];

const methodFacts = [
  {
    source: 'IMG_0742.JPG',
    fact: 'Marta describes integrative psychology, careful evaluation, scientifically supported approaches including EMDR, Gestalt, Bioenergetic Therapy, and family attachment models such as Circle of Security Parenting.',
    verified: true
  }
];

const globalBlockers = [
  'Professional registration number is missing.',
  'Address/service area and confirmed modalities are missing.',
  'Contact channels, legal texts, retention, and provider approvals are missing.',
  'Marta approval metadata is missing.'
];

function draftPage(input: Omit<ContentPage, 'status' | 'noindex' | 'includeInSitemap' | 'lastReviewed' | 'blockers' | 'modalityAvailability'> & Partial<ContentPage>): ContentPage {
  const page: ContentPage = {
    status: input.status ?? 'approved-placeholder',
    noindex: input.noindex ?? true,
    includeInSitemap: input.includeInSitemap ?? false,
    lastReviewed: input.lastReviewed ?? today,
    blockers: input.blockers ?? globalBlockers,
    modalityAvailability: input.modalityAvailability ?? {
      'in-person-ciudad-real': 'blocked-unverified',
      online: 'blocked-unverified',
      unsure: 'approved-placeholder'
    },
    ...input
  };
  return page;
}

export const contentPages = {
  home: draftPage({
    key: 'home',
    canonicalPath: '/',
    primaryIntent: 'brand and local trust introduction',
    title: 'Hilando Fino Psicología | Marta Martín',
    description: 'Borrador seguro de la web de Marta Martín · Hilando Fino Psicología. Contenido pendiente de aprobación profesional y legal.',
    h1: 'Hilando Fino Psicología',
    sourceFacts: verifiedBrandFacts
  }),
  about: draftPage({
    key: 'about',
    canonicalPath: '/sobre-mi',
    primaryIntent: 'Marta profile and approval-safe trust context',
    title: 'Sobre Marta Martín | Hilando Fino Psicología',
    description: 'Información pendiente de completar sobre Marta Martín. La página evita publicar credenciales, número de colegiada o trayectoria no verificados.',
    h1: 'Sobre Marta Martín',
    sourceFacts: verifiedBrandFacts,
    blockers: ['Credentials, registration number, qualifications, specialisms, and years of experience are missing.']
  }),
  method: draftPage({
    key: 'method',
    canonicalPath: '/como-trabajo',
    primaryIntent: 'therapy method from verified image source',
    title: 'Cómo trabajo | Hilando Fino Psicología',
    description: 'Marta explica una forma de trabajo integradora, cuidadosa y adaptada a cada persona. Borrador pendiente de aprobación final.',
    h1: 'Cómo trabajo',
    sourceFacts: [...verifiedBrandFacts, ...methodFacts],
    blockers: ['Clinical review and final public copy approval are pending.']
  }),
  interventions: draftPage({
    key: 'interventions',
    canonicalPath: '/areas-de-intervencion',
    primaryIntent: 'service discovery hub without standalone thin topic pages',
    title: 'Áreas de intervención | Hilando Fino Psicología',
    description: 'Inventario de áreas de intervención en borrador seguro. Las páginas de temas concretos quedan unidas a sus hubs hasta aprobación.',
    h1: 'Áreas de intervención',
    sourceFacts: verifiedBrandFacts
  }),
  childrenFamilies: draftPage({
    key: 'childrenFamilies',
    canonicalPath: '/areas-de-intervencion/infancia-y-familias',
    parentHub: 'children-families',
    primaryIntent: 'children and family intervention hub',
    title: 'Infancia y familias | Hilando Fino Psicología',
    description: 'Borrador seguro del hub de infancia y familias, con temas preservados sin publicar páginas finas ni promesas clínicas.',
    h1: 'Infancia y familias',
    sourceFacts: verifiedBrandFacts
  }),
  adolescents: draftPage({
    key: 'adolescents',
    canonicalPath: '/areas-de-intervencion/adolescentes',
    parentHub: 'adolescents',
    primaryIntent: 'adolescent intervention hub',
    title: 'Adolescentes | Hilando Fino Psicología',
    description: 'Borrador seguro del hub para adolescentes, pendiente de confirmación de oferta, límites y profundidad de contenido.',
    h1: 'Adolescentes',
    sourceFacts: verifiedBrandFacts
  }),
  adults: draftPage({
    key: 'adults',
    canonicalPath: '/areas-de-intervencion/adultos',
    parentHub: 'adults',
    primaryIntent: 'adult intervention hub',
    title: 'Adultos | Hilando Fino Psicología',
    description: 'Borrador seguro del hub para adultos, con inventario de temas y sin afirmaciones no aprobadas.',
    h1: 'Adultos',
    sourceFacts: verifiedBrandFacts
  }),
  educationTraining: draftPage({
    key: 'educationTraining',
    canonicalPath: '/areas-de-intervencion/orientacion-educativa-y-formacion',
    parentHub: 'education-training',
    primaryIntent: 'educational guidance and training hub',
    title: 'Orientación educativa y formación | Hilando Fino Psicología',
    description: 'Borrador seguro sobre orientación educativa y formación, pendiente de confirmar servicios concretos.',
    h1: 'Orientación educativa y formación',
    sourceFacts: verifiedBrandFacts
  }),
  local: draftPage({
    key: 'local',
    canonicalPath: '/psicologia-ciudad-real',
    primaryIntent: 'qualified in-person psychology inquiries in Ciudad Real',
    title: 'Psicología en Ciudad Real | Hilando Fino Psicología',
    description: 'Página local en borrador seguro para consultas de psicología en Ciudad Real. No publica dirección ni disponibilidad hasta aprobación.',
    h1: 'Psicología en Ciudad Real',
    sourceFacts: verifiedBrandFacts,
    blockers: ['Ciudad Real is the requested local priority, but address, in-person availability, NAP and GBP/citation data are missing.']
  }),
  contact: draftPage({
    key: 'contact',
    canonicalPath: '/contacto',
    primaryIntent: 'privacy-safe inquiry route',
    title: 'Contacto | Hilando Fino Psicología',
    description: 'Formulario de contacto seguro en modo desactivado hasta aprobar textos legales, proveedor, retención y canales de respuesta.',
    h1: 'Contacto',
    sourceFacts: verifiedBrandFacts,
    blockers: ['Email/phone, legal texts, retention, provider, DPA/hosting and consent wording are missing.']
  }),
  workshops: draftPage({
    key: 'workshops',
    canonicalPath: '/talleres',
    status: 'future-scope',
    primaryIntent: 'future workshop route',
    title: 'Talleres | Hilando Fino Psicología',
    description: 'Ruta futura para talleres. Permanece bloqueada hasta confirmar audiencia, formato, fechas, disponibilidad y condiciones.',
    h1: 'Talleres',
    sourceFacts: [{ source: 'openspec proposal', fact: 'Talleres is conditional until real workshop facts are approved.', verified: true }],
    blockers: ['No workshop offering facts have been approved.']
  }),
  legalNotice: draftPage({
    key: 'legalNotice',
    canonicalPath: '/aviso-legal',
    status: 'blocked-unverified',
    primaryIntent: 'legal notice',
    title: 'Aviso legal | Hilando Fino Psicología',
    description: 'Aviso legal pendiente de completar con datos profesionales y legales verificados.',
    h1: 'Aviso legal',
    sourceFacts: [],
    blockers: ['Legal identity, address, tax/professional data and responsible party details are missing.']
  }),
  privacy: draftPage({
    key: 'privacy',
    canonicalPath: '/privacidad',
    status: 'blocked-unverified',
    primaryIntent: 'privacy policy',
    title: 'Privacidad | Hilando Fino Psicología',
    description: 'Política de privacidad pendiente de completar antes de activar cualquier envío de contacto.',
    h1: 'Privacidad',
    sourceFacts: [],
    blockers: ['Controller, processor, hosting, email provider, retention, rights channel and DPA terms are missing.']
  }),
  cookies: draftPage({
    key: 'cookies',
    canonicalPath: '/cookies',
    status: 'blocked-unverified',
    primaryIntent: 'cookies policy',
    title: 'Cookies | Hilando Fino Psicología',
    description: 'Política de cookies pendiente de aprobación. No se instalan analíticas de terceros en este borrador.',
    h1: 'Cookies',
    sourceFacts: [],
    blockers: ['Analytics/cookie consent model is not approved.']
  })
} satisfies Record<PublicPageKey, ContentPage>;

export const allContentPages = Object.values(contentPages);
export const approvedSitemapPages = allContentPages.filter(isIndexable);

export function pageByPath(path: string): ContentPage | undefined {
  const normalized = path.split('?')[0]?.replace(/\/$/, '') || '/';
  return allContentPages.find((page) => (page.canonicalPath === '/' ? normalized === '/' : page.canonicalPath === normalized));
}
