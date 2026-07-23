import { describe, expect, it } from 'vitest';

import { contentPages } from '../../content/content-matrix';
import { treatmentContentPages } from '../../content/treatment-index';
import { treatmentPages } from '../../content/treatment-pages';
import type { JsonLdNode } from './schema';
import { schemaForPage } from './schema';

describe('schema rules', () => {
  it('omits LocalBusiness and review markup while NAP/reviews are unverified', () => {
    const schema = schemaForPage('https://pending-domain.invalid', contentPages.local);
    const serialized = JSON.stringify(schema);
    expect(serialized).toContain('BreadcrumbList');
    expect(serialized).not.toContain('LocalBusiness');
    expect(serialized).not.toContain('Review');
    expect(serialized).not.toContain('address');
    expect(serialized).not.toContain('telephone');
  });

  it('uses the configured GitHub Pages origin for canonical JSON-LD URLs when supplied by the caller', () => {
    const schema = schemaForPage('https://txetxaki.github.io/hilando-fino', contentPages.home);
    const serialized = JSON.stringify(schema);
    expect(serialized).toContain('https://txetxaki.github.io/hilando-fino/');
    expect(serialized).not.toContain('pending-domain.invalid');
  });

  it('returns a fully populated Person node for the home page', () => {
    const schema = schemaForPage('https://txetxaki.github.io/hilando-fino', contentPages.home);
    const person = schema.find((node) => node['@type'] === 'Person');
    expect(person).toBeDefined();
    expect(person).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Marta Martín',
      url: 'https://txetxaki.github.io/hilando-fino',
      description: 'Marta Martín · Hilando Fino Psicología'
    });
  });

  it('omits Person and FAQPage nodes on non-home, non-treatment pages', () => {
    const schema = schemaForPage('https://pending-domain.invalid', contentPages.local);
    expect(schema.some((node) => node['@type'] === 'Person')).toBe(false);
    expect(schema.some((node) => node['@type'] === 'FAQPage')).toBe(false);
  });

  it('emits an FAQPage node whose Question/Answer entries match the real treatment page faq array', () => {
    const treatmentPage = treatmentPages.find((page) => page.slug === 'ansiedad-infantil');
    expect(treatmentPage).toBeDefined();
    expect(treatmentPage!.faq.length).toBeGreaterThanOrEqual(4);

    const contentPage = treatmentContentPages.find((page) => page.canonicalPath === treatmentPage!.canonicalPath);
    expect(contentPage).toBeDefined();

    const schema = schemaForPage('https://pending-domain.invalid', contentPage!);
    const faqNode = schema.find((node) => node['@type'] === 'FAQPage');
    expect(faqNode).toBeDefined();

    const mainEntity = (faqNode as JsonLdNode)['mainEntity'] as { '@type': string; name: string; acceptedAnswer: { '@type': string; text: string } }[];
    expect(mainEntity).toHaveLength(treatmentPage!.faq.length);
    treatmentPage!.faq.forEach((item, index) => {
      expect(mainEntity[index]).toEqual({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      });
    });
  });

  it('does not add an FAQPage node to the home page even though it emits WebSite/Person nodes', () => {
    const schema = schemaForPage('https://pending-domain.invalid', contentPages.home);
    expect(schema.some((node) => node['@type'] === 'WebSite')).toBe(true);
    expect(schema.some((node) => node['@type'] === 'Person')).toBe(true);
    expect(schema.some((node) => node['@type'] === 'FAQPage')).toBe(false);
  });
});
