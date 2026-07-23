import { ContentPage } from '../../content/types';

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

export function organizationSchema(siteUrl: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Marta Martín · Hilando Fino Psicología',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`
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
    nodes.push(websiteSchema(siteUrl), organizationSchema(siteUrl));
  }
  return nodes;
}

function humanize(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/^./, (letter) => letter.toUpperCase());
}
