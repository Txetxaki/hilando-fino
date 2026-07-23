import { ContentPage } from '../../content/types';
import { treatmentByPath } from '../../content/treatment-index';

export interface JsonLdNode {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

export function websiteSchema(siteUrl: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Hilando Fino Psicología',
    url: siteUrl
  };
}

export function personSchema(siteUrl: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Marta Martín',
    url: siteUrl,
    description: 'Marta Martín · Hilando Fino Psicología'
  };
}

export function breadcrumbSchema(siteUrl: string, page: ContentPage): JsonLdNode {
  const parts = page.canonicalPath.split('/').filter(Boolean);
  const items = [{ name: 'Inicio', item: `${siteUrl}/` }];
  let current = '';
  for (const part of parts) {
    current += `/${part}`;
    items.push({ name: humanize(part), item: `${siteUrl}${current}` });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.item }))
  };
}

export function schemaForPage(siteUrl: string, page: ContentPage): JsonLdNode[] {
  const nodes = [breadcrumbSchema(siteUrl, page)];
  if (page.canonicalPath === '/') {
    nodes.push(websiteSchema(siteUrl), personSchema(siteUrl));
  }
  const treatment = treatmentByPath(page.canonicalPath);
  if (treatment) {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: treatment.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    });
  }
  return nodes;
}

function humanize(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/^./, (letter) => letter.toUpperCase());
}
