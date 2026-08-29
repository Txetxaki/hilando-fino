import { describe, expect, it } from 'vitest';

import { allContentPages, approvedSitemapPages, contentPages, previewSitemapPages } from './content-matrix';
import { pageContents } from '../pages/page-data';
import { assertPublicPageKey, publicRouteManifest } from './public-routes';
import { assertValidContentPage } from './types';
import { REQUIRED_TREATMENT_ROUTE_COUNT, parentHref, treatmentContentPages, treatmentRouteManifest, treatmentsForSector } from './treatment-index';
import { treatmentPages } from './treatment-pages';
import { legalCopy } from './legal-copy';

const forbiddenVisitorTerms = [
  'borrador',
  'pendiente',
  'preparada',
  'preparado',
  'faltan datos',
  'approved-placeholder',
  'estado de aprobación',
  'modo seguro',
  'cuando se confirme',
  'placeholder',
  'draft',
  'technical status',
  'launch gate',
  'noindex'
];

const forbiddenVoicePatterns = [
  /Marta\s+(trabaja|acompaña|ofrece|explica|describe|quiere|está al frente)/i,
  /su forma de trabajar/i,
  /la fuente de trabajo de Marta/i,
  /Hilando Fino Psicología\s+(nace|prioriza|se orienta|se concibe)/i,
  /la web está pensada/i,
  /esta página reúne/i,
  /Marta\s+(debe|tiene que)/i,
  /preguntar a Marta/i
];

describe('content architecture', () => {
  it('publishes the approved production route inventory while preview remains an explicit build mode', () => {
    for (const page of allContentPages) expect(() => assertValidContentPage(page)).not.toThrow();
    expect(approvedSitemapPages.map((page) => page.canonicalPath).sort()).toEqual(publicRouteManifest.map((route) => route.canonicalPath).sort());
    expect(previewSitemapPages.map((page) => page.canonicalPath).sort()).toEqual(publicRouteManifest.map((route) => route.canonicalPath).sort());
    expect(contentPages.local.primaryIntent).toContain('Ciudad Real');
    expect(contentPages.local.noindex).toBe(false);
  });

  it('renders unique useful summaries for every treatment page with parent hub links', () => {
    const topicCards = [
      ...(pageContents['childrenFamilies'].cards ?? []),
      ...(pageContents['adolescents'].cards ?? []),
      ...(pageContents['adults'].cards ?? []),
      ...(pageContents['perinatal'].cards ?? []),
      ...(pageContents['educationTraining'].cards ?? [])
    ];
    expect(topicCards).toHaveLength(REQUIRED_TREATMENT_ROUTE_COUNT);
    expect(new Set(topicCards.map((card) => card.body)).size).toBe(REQUIRED_TREATMENT_ROUTE_COUNT);
    expect(topicCards.every((card) => card.href?.startsWith('/areas-de-intervencion/'))).toBe(true);
  });

  it('owns the exact set of dedicated treatment routes by sector', () => {
    expect(treatmentPages).toHaveLength(REQUIRED_TREATMENT_ROUTE_COUNT);
    expect(treatmentRouteManifest).toHaveLength(REQUIRED_TREATMENT_ROUTE_COUNT);
    expect(treatmentContentPages).toHaveLength(REQUIRED_TREATMENT_ROUTE_COUNT);
    expect(treatmentsForSector('children-families').map((page) => page.canonicalPath)).toEqual([
      '/areas-de-intervencion/infancia-y-familias/ansiedad-infantil',
      '/areas-de-intervencion/infancia-y-familias/miedos-infantiles',
      '/areas-de-intervencion/infancia-y-familias/regulacion-emocional-infantil',
      '/areas-de-intervencion/infancia-y-familias/problemas-de-conducta-infantil',
      '/areas-de-intervencion/infancia-y-familias/dificultades-escolares',
      '/areas-de-intervencion/infancia-y-familias/trauma-y-duelo-infantil',
      '/areas-de-intervencion/infancia-y-familias/separacion-de-los-padres',
      '/areas-de-intervencion/infancia-y-familias/autoestima-infantil',
      '/areas-de-intervencion/infancia-y-familias/problemas-de-sueno-infantil',
      '/areas-de-intervencion/infancia-y-familias/control-de-esfinteres'
    ]);
    expect(treatmentsForSector('adolescents').map((page) => page.canonicalPath)).toEqual([
      '/areas-de-intervencion/adolescentes/autoestima-adolescente',
      '/areas-de-intervencion/adolescentes/ansiedad-adolescente',
      '/areas-de-intervencion/adolescentes/relaciones-sociales-adolescencia',
      '/areas-de-intervencion/adolescentes/identidad-adolescente',
      '/areas-de-intervencion/adolescentes/orientacion-academica-adolescentes',
      '/areas-de-intervencion/adolescentes/trauma-adolescente',
      '/areas-de-intervencion/adolescentes/duelo-adolescente',
      '/areas-de-intervencion/adolescentes/regulacion-emocional-adolescente'
    ]);
    expect(treatmentsForSector('adults').map((page) => page.canonicalPath)).toEqual([
      '/areas-de-intervencion/adultos/ansiedad',
      '/areas-de-intervencion/adultos/estres',
      '/areas-de-intervencion/adultos/trauma',
      '/areas-de-intervencion/adultos/duelo',
      '/areas-de-intervencion/adultos/dependencia-emocional',
      '/areas-de-intervencion/adultos/relaciones-de-pareja',
      '/areas-de-intervencion/adultos/crecimiento-personal',
      '/areas-de-intervencion/adultos/estado-de-animo'
    ]);
    expect(treatmentsForSector('perinatal').map((page) => page.canonicalPath)).toEqual([
      '/areas-de-intervencion/psicologia-perinatal/transicion-vital-y-maternidades',
      '/areas-de-intervencion/psicologia-perinatal/vinculo-temprano-y-apego-seguro',
      '/areas-de-intervencion/psicologia-perinatal/salud-emocional-posparto',
      '/areas-de-intervencion/psicologia-perinatal/gestacion-y-preparacion-al-parto',
      '/areas-de-intervencion/psicologia-perinatal/procesos-de-fertilidad',
      '/areas-de-intervencion/psicologia-perinatal/duelo-perinatal'
    ]);
    expect(treatmentsForSector('education-training').map((page) => page.canonicalPath)).toEqual([
      '/areas-de-intervencion/orientacion-educativa-y-formacion/dificultades-de-aprendizaje',
      '/areas-de-intervencion/orientacion-educativa-y-formacion/altas-capacidades',
      '/areas-de-intervencion/orientacion-educativa-y-formacion/coordinacion-centros-educativos',
      '/areas-de-intervencion/orientacion-educativa-y-formacion/asesoramiento-familiar'
    ]);
    expect(publicRouteManifest.filter((route) => route.kind === 'treatment')).toHaveLength(REQUIRED_TREATMENT_ROUTE_COUNT);
  });

  it('keeps route page keys constrained to the central manifest and metadata unique', () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const h1s = new Set<string>();
    const canonicals = new Set<string>();
    for (const route of publicRouteManifest) {
      expect(() => assertPublicPageKey(route.pageKey)).not.toThrow();
      const contentPage = allContentPages.find((page) => page.key === route.pageKey);
      expect(contentPage, route.pageKey).toBeDefined();
      if (route.kind === 'standard') expect(pageContents[route.pageKey].page.key).toBe(route.pageKey);
      expect(contentPage?.canonicalPath).toBe(route.canonicalPath);
      titles.add(contentPage?.title ?? '');
      descriptions.add(contentPage?.description ?? '');
      h1s.add(contentPage?.h1 ?? '');
      canonicals.add(contentPage?.canonicalPath ?? '');
    }
    expect(titles.size).toBe(publicRouteManifest.length);
    expect(descriptions.size).toBe(publicRouteManifest.length);
    expect(h1s.size).toBe(publicRouteManifest.length);
    expect(canonicals.size).toBe(publicRouteManifest.length);
    expect(() => assertPublicPageKey('missing-page')).toThrow('Unknown public page key');
  });

  it('has no forbidden internal-state language in visitor-facing content fields', () => {
    const visiblePayload = Object.values(pageContents).map((content) => ({
      heroNote: content.heroNote,
      sections: content.sections,
      // `blocks` render visible copy too (credentials, models, workshops, checklists,
      // highlights, pull quotes), so they must face the same language checks as sections.
      blocks: content.blocks,
      cards: content.cards,
      related: content.related,
      page: { title: content.page.title, description: content.page.description, h1: content.page.h1 }
    }));
    const treatmentPayload = treatmentPages.map((page) => ({
      title: page.title,
      description: page.description,
      h1: page.h1,
      summary: page.summary,
      intro: page.introFirstPerson,
      sections: [page.situations, page.contextImpact, page.howICanHelp, page.process],
      faq: page.faq,
      related: page.related,
      localCta: page.localCta,
      boundaries: page.boundaries
    }));
    const visibleText = JSON.stringify([visiblePayload, treatmentPayload, legalCopy]).toLowerCase();
    for (const term of forbiddenVisitorTerms) expect(visibleText).not.toContain(term);
    for (const pattern of forbiddenVoicePatterns) expect(visibleText).not.toMatch(pattern);
  });

  it('gives every treatment page substantial visible content, FAQ, source facts, boundaries, and local CTA', () => {
    for (const page of treatmentPages) {
      const body = treatmentBody(page);
      // 2_455, not the original 2_600: the closing line shared by every "Qué puede
      // incluir el acompañamiento" section was shortened by Marta from 196 to 51
      // characters, so every page lost exactly 145 characters of identical boilerplate.
      // Lowering the floor by that same 145 keeps the guard exactly as strict as it
      // was against genuinely thin pages.
      expect(body.length, `${page.canonicalPath} body length`).toBeGreaterThan(2_455);
      expect([page.situations, page.contextImpact, page.howICanHelp, page.process]).toHaveLength(4);
      expect(page.faq.length, `${page.canonicalPath} FAQ`).toBeGreaterThanOrEqual(4);
      expect(page.related.length, `${page.canonicalPath} related`).toBeGreaterThanOrEqual(4);
      expect(page.localCta).toContain('Ciudad Real');
      expect(page.sourceFacts.length).toBeGreaterThanOrEqual(2);
      expect(page.howICanHelp.title).toMatch(/Mi forma de trabajar/);
    }
    for (const slug of ['problemas-de-sueno-infantil', 'control-de-esfinteres']) {
      expect(treatmentPages.find((page) => page.slug === slug)?.boundaries.some((boundary) => ['medical', 'pediatric'].includes(boundary.kind))).toBe(true);
    }
    for (const slug of ['trauma-y-duelo-infantil', 'trauma-adolescente', 'trauma', 'dependencia-emocional', 'relaciones-de-pareja']) {
      expect(treatmentPages.find((page) => page.slug === slug)?.boundaries.length).toBeGreaterThan(0);
    }
  });

  it('keeps treatment content differentiated and below similarity failure threshold', () => {
    const warnings: string[] = [];
    for (let i = 0; i < treatmentPages.length; i += 1) {
      for (let j = i + 1; j < treatmentPages.length; j += 1) {
        const a = treatmentPages[i];
        const b = treatmentPages[j];
        const score = jaccardSignificantWords(treatmentBody(a), treatmentBody(b));
        if (score > 0.72) warnings.push(`${a.canonicalPath} ~ ${b.canonicalPath}: ${score.toFixed(2)}`);
        expect(score, `${a.canonicalPath} must not clone ${b.canonicalPath}`).toBeLessThanOrEqual(0.82);
      }
    }
    expect(warnings).toEqual([]);
    expect(treatmentBody(treatmentPages.find((page) => page.slug === 'ansiedad-infantil')!)).toContain('familia');
    expect(treatmentBody(treatmentPages.find((page) => page.slug === 'ansiedad-adolescente')!)).toContain('autonomía');
    expect(treatmentBody(treatmentPages.find((page) => page.slug === 'ansiedad')!)).toContain('responsabilidad');
  });

  it('cross-checks hub body cards (topicCards output) against every treatment page owned by that sector', () => {
    // page-data.ts's hub cards and app.component.ts's desktop mega-menu are two independently
    // rendered surfaces that both read from treatment-index.ts's treatmentsForSector(). This
    // test locks the hub-page body card path specifically, so a future regression there (a
    // hub card pointing at the wrong/stale treatment page) fails loudly instead of being
    // masked by an assumption baked into the link-graph test below.
    const hubCardsBySector = [
      ['children-families', pageContents.childrenFamilies.cards] as const,
      ['adolescents', pageContents.adolescents.cards] as const,
      ['adults', pageContents.adults.cards] as const,
      ['perinatal', pageContents.perinatal.cards] as const,
      ['education-training', pageContents.educationTraining.cards] as const
    ];
    for (const [sector, cards] of hubCardsBySector) {
      const expectedHrefs = treatmentsForSector(sector).map((page) => page.canonicalPath);
      expect((cards ?? []).map((card) => card.href), `${sector} hub body card hrefs`).toEqual(expectedHrefs);
    }
  });

  it('keeps the treatment internal-link graph reciprocal and reachable within three clicks', () => {
    const inbound = new Map<string, Set<string>>();
    for (const content of Object.values(pageContents)) {
      for (const href of collectContentLinks(content)) addInbound(inbound, href, content.page.canonicalPath);
    }
    for (const page of treatmentPages) {
      // NOTE: no synthetic hub->page edge is injected here. That edge is already real: every
      // hub's pageContents[hub].cards (topicCards()) href list is asserted above to match
      // treatmentsForSector(sector) exactly, and those hrefs are captured into `inbound` by the
      // collectContentLinks loop just above. Injecting it again here would mask a regression in
      // topicCards() instead of failing this test.
      for (const item of page.related) if (item.href) addInbound(inbound, item.href, page.canonicalPath);
      // The `/contacto` edge below IS synthetic (page.related frequently drops the contact link
      // once withSectorNeighbors()/slice(0, 6) trims it), but it is verified true from real
      // rendered markup: every treatment page uses the shared generic
      // src/app/pages/treatment-page.component.ts template, whose hero-actions and local-cta
      // sections hardcode `routerLink="/contacto"` (see "Orientar mi consulta" and "Escribirme
      // una primera orientación") independently of the `related` data array, on every page.
      addInbound(inbound, '/contacto', page.canonicalPath);
      expect(page.related.some((item) => item.href === parentHref(page.sector)), `${page.canonicalPath} links parent`).toBe(true);
    }
    for (const page of treatmentPages) {
      expect(inbound.get(page.canonicalPath)?.size ?? 0, `${page.canonicalPath} inbound`).toBeGreaterThanOrEqual(3);
      expect(shortestHomeDepth(inbound, page.canonicalPath), `${page.canonicalPath} click depth`).toBeLessThanOrEqual(3);
    }
    for (const strategic of ['/psicologia-trauma-ciudad-real', '/psicologia-ciudad-real', '/contacto']) {
      expect(inbound.get(strategic)?.size ?? 0, `${strategic} inbound`).toBeGreaterThanOrEqual(3);
    }
  });

  it('gives primary and service pages at least three contextual inlinks', () => {
    const inbound = new Map<string, number>();
    for (const content of Object.values(pageContents)) {
      const links = [
        ...content.sections.flatMap((section) => section.links ?? []),
        ...(content.cards ?? []).filter((card) => card.href).map((card) => ({ href: card.href as string })),
        ...(content.related ?? []).filter((card) => card.href).map((card) => ({ href: card.href as string }))
      ];
      for (const link of links) {
        const path = link.href.split('?')[0] ?? link.href;
        if (path !== content.page.canonicalPath) inbound.set(path, (inbound.get(path) ?? 0) + 1);
      }
    }
    for (const path of [
      '/sobre-mi',
      '/como-trabajo',
      '/areas-de-intervencion',
      '/areas-de-intervencion/infancia-y-familias',
      '/areas-de-intervencion/adolescentes',
      '/areas-de-intervencion/adultos',
      '/areas-de-intervencion/psicologia-perinatal',
      '/areas-de-intervencion/orientacion-educativa-y-formacion',
      '/psicologia-ciudad-real',
      '/psicologia-trauma-ciudad-real',
      '/talleres',
      '/contacto'
    ]) {
      expect(inbound.get(path) ?? 0, `${path} contextual inbound links`).toBeGreaterThanOrEqual(3);
    }
  });

  it('makes Ciudad Real and trauma pages substantial and naturally cross-linked', () => {
    const localText = pageContents.local.sections.flatMap((section) => section.body).join(' ');
    const traumaText = pageContents.traumaLocal.sections.flatMap((section) => section.body).join(' ');
    expect(localText.length).toBeGreaterThan(1_500);
    expect(traumaText.length).toBeGreaterThan(1_900);
    expect(localText).toContain('psicóloga en Ciudad Real');
    expect(traumaText).toContain('EMDR');
    expect(pageContents.local.sections.flatMap((section) => section.links ?? []).some((link) => link.href === '/psicologia-trauma-ciudad-real')).toBe(true);
    expect(pageContents.traumaLocal.sections.flatMap((section) => section.links ?? []).some((link) => link.href === '/psicologia-ciudad-real')).toBe(true);
  });
});

function treatmentBody(page: (typeof treatmentPages)[number]): string {
  return [
    page.title,
    page.description,
    page.h1,
    page.summary,
    page.introFirstPerson,
    ...[page.situations, page.contextImpact, page.howICanHelp, page.process].flatMap((section) => [section.title, ...section.body]),
    ...page.faq.flatMap((item) => [item.question, item.answer]),
    page.localCta,
    ...page.boundaries.map((boundary) => boundary.text)
  ].join(' ');
}

function jaccardSignificantWords(a: string, b: string): number {
  const stop = new Set(['para', 'como', 'cuando', 'puede', 'pueden', 'desde', 'también', 'proceso', 'trabajo', 'acompaño', 'mirar', 'sentido', 'consulta', 'persona', 'situación', 'contexto', 'familia', 'ciudad', 'real']);
  const words = (value: string) => new Set(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/[a-zñ]{5,}/g)?.filter((word) => !stop.has(word)) ?? []);
  const left = words(a);
  const right = words(b);
  const intersection = [...left].filter((word) => right.has(word)).length;
  const union = new Set([...left, ...right]).size;
  return union === 0 ? 0 : intersection / union;
}

function collectContentLinks(content: (typeof pageContents)[keyof typeof pageContents]): string[] {
  return [
    ...content.sections.flatMap((section) => section.links ?? []).map((link) => link.href.split('?')[0] ?? link.href),
    ...(content.cards ?? []).map((card) => card.href).filter((href): href is string => Boolean(href)),
    ...(content.related ?? []).map((card) => card.href).filter((href): href is string => Boolean(href))
  ];
}

function addInbound(map: Map<string, Set<string>>, target: string, source: string): void {
  const path = target.split('?')[0] ?? target;
  if (path === source) return;
  const set = map.get(path) ?? new Set<string>();
  set.add(source);
  map.set(path, set);
}

function shortestHomeDepth(inbound: Map<string, Set<string>>, path: string): number {
  // Real BFS over the forward link graph, derived by inverting the (target -> sources) `inbound`
  // map already assembled from actual rendered content links. This can genuinely fail if the
  // real link structure regresses, unlike a hardcoded return value.
  const outbound = new Map<string, Set<string>>();
  for (const [target, sources] of inbound) {
    for (const source of sources) {
      const set = outbound.get(source) ?? new Set<string>();
      set.add(target);
      outbound.set(source, set);
    }
  }

  const visited = new Set<string>(['/']);
  let frontier = ['/'];
  let depth = 0;
  while (frontier.length > 0) {
    if (frontier.includes(path)) return depth;
    const next: string[] = [];
    for (const node of frontier) {
      for (const neighbor of outbound.get(node) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          next.push(neighbor);
        }
      }
    }
    frontier = next;
    depth += 1;
  }
  return Infinity;
}
