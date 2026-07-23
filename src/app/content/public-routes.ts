import { treatmentRouteManifest } from './treatment-index';

export type PublicRouteKind = 'standard' | 'contact' | 'legal' | 'treatment';

export interface PublicRouteManifestEntry {
  path: string;
  canonicalPath: string;
  pageKey: string;
  kind: PublicRouteKind;
  prerender: true;
  draftNoindex: boolean;
  requiredForPagesPreview: boolean;
}

export const staticPublicRouteManifest = [
  { path: '', canonicalPath: '/', pageKey: 'home', kind: 'standard', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  { path: 'sobre-mi', canonicalPath: '/sobre-mi', pageKey: 'about', kind: 'standard', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  { path: 'como-trabajo', canonicalPath: '/como-trabajo', pageKey: 'method', kind: 'standard', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  { path: 'areas-de-intervencion', canonicalPath: '/areas-de-intervencion', pageKey: 'interventions', kind: 'standard', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  {
    path: 'areas-de-intervencion/infancia-y-familias',
    canonicalPath: '/areas-de-intervencion/infancia-y-familias',
    pageKey: 'childrenFamilies',
    kind: 'standard',
    prerender: true,
    draftNoindex: true,
    requiredForPagesPreview: true
  },
  {
    path: 'areas-de-intervencion/adolescentes',
    canonicalPath: '/areas-de-intervencion/adolescentes',
    pageKey: 'adolescents',
    kind: 'standard',
    prerender: true,
    draftNoindex: true,
    requiredForPagesPreview: true
  },
  { path: 'areas-de-intervencion/adultos', canonicalPath: '/areas-de-intervencion/adultos', pageKey: 'adults', kind: 'standard', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  {
    path: 'areas-de-intervencion/orientacion-educativa-y-formacion',
    canonicalPath: '/areas-de-intervencion/orientacion-educativa-y-formacion',
    pageKey: 'educationTraining',
    kind: 'standard',
    prerender: true,
    draftNoindex: true,
    requiredForPagesPreview: true
  },
  { path: 'psicologia-ciudad-real', canonicalPath: '/psicologia-ciudad-real', pageKey: 'local', kind: 'standard', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  { path: 'psicologia-trauma-ciudad-real', canonicalPath: '/psicologia-trauma-ciudad-real', pageKey: 'traumaLocal', kind: 'standard', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  { path: 'contacto', canonicalPath: '/contacto', pageKey: 'contact', kind: 'contact', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  { path: 'talleres', canonicalPath: '/talleres', pageKey: 'workshops', kind: 'standard', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  { path: 'aviso-legal', canonicalPath: '/aviso-legal', pageKey: 'legalNotice', kind: 'legal', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  { path: 'privacidad', canonicalPath: '/privacidad', pageKey: 'privacy', kind: 'legal', prerender: true, draftNoindex: true, requiredForPagesPreview: true },
  { path: 'cookies', canonicalPath: '/cookies', pageKey: 'cookies', kind: 'legal', prerender: true, draftNoindex: true, requiredForPagesPreview: true }
] as const satisfies readonly PublicRouteManifestEntry[];

export const publicRouteManifest = [...staticPublicRouteManifest, ...treatmentRouteManifest] as const satisfies readonly PublicRouteManifestEntry[];

export type PublicPageKey = (typeof publicRouteManifest)[number]['pageKey'];
export type StaticPublicPageKey = (typeof staticPublicRouteManifest)[number]['pageKey'];
type PublicRouteForKind<K extends PublicRouteKind> = Extract<(typeof publicRouteManifest)[number], { kind: K }>;
export type StandardPageKey = PublicRouteForKind<'standard'>['pageKey'];

const publicPageKeys = new Set<string>(publicRouteManifest.map((route) => route.pageKey));

export function assertPublicPageKey(value: unknown): asserts value is PublicPageKey {
  if (typeof value !== 'string' || !publicPageKeys.has(value)) {
    throw new Error(`Unknown public page key: ${String(value)}`);
  }
}

export function assertStandardPageKey(value: unknown): asserts value is StandardPageKey {
  assertPublicPageKey(value);
  const route = publicRouteManifest.find((entry) => entry.pageKey === value);
  if (route?.kind !== 'standard') {
    throw new Error(`Standard page cannot render non-standard key: ${String(value)}`);
  }
}

export const knownPrerenderedPaths: readonly string[] = publicRouteManifest.map((route) => route.canonicalPath);

export const requiredPagesArtifactFiles = publicRouteManifest
  .filter((route) => route.requiredForPagesPreview)
  .map((route) => (route.path === '' ? 'index.html' : `${route.path}/index.html`));
