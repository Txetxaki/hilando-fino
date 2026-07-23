import { describe, expect, it } from 'vitest';

import { allContentPages, approvedSitemapPages, contentPages } from './content-matrix';
import { interventionTopics, topicsForHub, workshopsPlaceholder } from './interventions';
import { pageContents } from '../pages/page-data';
import { assertPublicPageKey, publicRouteManifest } from './public-routes';
import { assertValidContentPage } from './types';

describe('content approval registry', () => {
  it('preserves every requested intervention label exactly once', () => {
    const labels = interventionTopics.map((topic) => `${topic.parentHub}:${topic.sourceLabel}`);
    expect(labels).toContain('children-families:problemas de sueño');
    expect(labels).toContain('adults:relaciones de pareja');
    expect(labels).toContain('education-training:dificultades de aprendizaje');
    expect(interventionTopics).toHaveLength(29);
    expect(new Set(labels).size).toBe(29);
  });

  it('groups topics by required parent hub and keeps workshops future-scoped', () => {
    expect(topicsForHub('children-families')).toHaveLength(10);
    expect(topicsForHub('adolescents')).toHaveLength(8);
    expect(topicsForHub('adults')).toHaveLength(7);
    expect(topicsForHub('education-training')).toHaveLength(4);
    expect(workshopsPlaceholder.status).toBe('future-scope');
  });

  it('blocks sitemap inclusion until approval metadata exists', () => {
    for (const page of allContentPages) expect(() => assertValidContentPage(page)).not.toThrow();
    expect(approvedSitemapPages).toEqual([]);
    expect(contentPages.local.primaryIntent).toContain('Ciudad Real');
    expect(contentPages.local.noindex).toBe(true);
  });

  it('renders unique useful summaries for the 29-topic inventory without creating standalone pages', () => {
    const topicCards = [
      ...(pageContents['childrenFamilies'].cards ?? []),
      ...(pageContents['adolescents'].cards ?? []),
      ...(pageContents['adults'].cards ?? []),
      ...(pageContents['educationTraining'].cards ?? [])
    ];
    expect(topicCards).toHaveLength(29);
    expect(new Set(topicCards.map((card) => card.body)).size).toBe(29);
    expect(topicCards.every((card) => !card.href && card.status === 'merge-into-hub')).toBe(true);
  });

  it('keeps route page keys constrained to the central manifest and fails unknown keys', () => {
    for (const route of publicRouteManifest) {
      expect(() => assertPublicPageKey(route.pageKey)).not.toThrow();
      if (route.kind === 'standard') expect(pageContents[route.pageKey].page.key).toBe(route.pageKey);
      expect(contentPages[route.pageKey].canonicalPath).toBe(route.canonicalPath);
    }
    expect(() => assertPublicPageKey('missing-page')).toThrow('Unknown public page key');
  });
});
