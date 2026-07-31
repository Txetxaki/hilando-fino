import { ContentPage } from '../../content/types';
import { allCredentials } from '../../content/credentials';
import { hubLabels } from '../../content/hub-labels';
import { practiceIdentity } from '../../content/practice-identity';
import { ogImagePath } from '../../content/site-images';
import { treatmentByPath } from '../../content/treatment-index';

export interface JsonLdNode {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

/** Stable node identifiers so Person, practice and pages can reference each other. */
const practiceId = (siteUrl: string) => `${siteUrl}/#consulta`;
const personId = (siteUrl: string) => `${siteUrl}/#marta-martin`;

const expertise = [
  'Psicología general sanitaria',
  'EMDR',
  'Trauma',
  'Duelo',
  'Ansiedad',
  'Psicología infantil',
  'Psicología adolescente',
  'Psicología perinatal',
  'Apego',
  'Orientación educativa'
];

export function websiteSchema(siteUrl: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: practiceIdentity.brandName,
    url: siteUrl,
    inLanguage: 'es-ES',
    publisher: { '@id': practiceId(siteUrl) }
  };
}

/**
 * `Psychologist` is a schema.org subtype of both LocalBusiness and MedicalBusiness,
 * so a single node carries the NAP signals Google Business Profile matches against
 * and the health-provider typing. Postal code and opening hours are omitted rather
 * than guessed: Marta supplied street, phone and registration only.
 */
export function practiceSchema(siteUrl: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Psychologist',
    '@id': practiceId(siteUrl),
    name: practiceIdentity.brandName,
    url: siteUrl,
    image: `${siteUrl}/${ogImagePath}`,
    telephone: practiceIdentity.phoneE164,
    email: practiceIdentity.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: practiceIdentity.address.streetAddress,
      addressLocality: practiceIdentity.address.addressLocality,
      addressRegion: practiceIdentity.address.addressRegion,
      addressCountry: practiceIdentity.address.addressCountry
    },
    areaServed: { '@type': 'City', name: 'Ciudad Real' },
    availableLanguage: { '@type': 'Language', name: 'Español' },
    knowsAbout: expertise,
    identifier: [
      { '@type': 'PropertyValue', name: 'Número de colegiada', value: practiceIdentity.collegiateNumber },
      { '@type': 'PropertyValue', name: 'Registro Sanitario', value: practiceIdentity.healthRegistryNumber }
    ],
    founder: { '@id': personId(siteUrl) },
    employee: { '@id': personId(siteUrl) }
  };
}

export function personSchema(siteUrl: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(siteUrl),
    name: practiceIdentity.practitionerName,
    url: `${siteUrl}/sobre-mi`,
    image: `${siteUrl}/${ogImagePath}`,
    jobTitle: practiceIdentity.professionalTitle,
    telephone: practiceIdentity.phoneE164,
    knowsAbout: expertise,
    identifier: { '@type': 'PropertyValue', name: 'Número de colegiada', value: practiceIdentity.collegiateNumber },
    hasCredential: allCredentials.map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      name: credential
    })),
    worksFor: { '@id': practiceId(siteUrl) }
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

function serviceSchema(siteUrl: string, page: ContentPage): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.h1,
    description: page.description,
    url: `${siteUrl}${page.canonicalPath}`,
    serviceType: page.parentHub ? hubLabels[page.parentHub] : page.h1,
    provider: { '@id': practiceId(siteUrl) },
    areaServed: { '@type': 'City', name: 'Ciudad Real' }
  };
}

export function schemaForPage(siteUrl: string, page: ContentPage): JsonLdNode[] {
  const nodes = [breadcrumbSchema(siteUrl, page)];

  if (page.canonicalPath === '/') {
    nodes.push(websiteSchema(siteUrl), practiceSchema(siteUrl), personSchema(siteUrl));
  }

  // The pages a visitor lands on for "psicóloga en Ciudad Real" and for contact
  // details are exactly where the NAP node earns its keep, so it repeats there.
  if (['/psicologia-ciudad-real', '/contacto'].includes(page.canonicalPath)) nodes.push(practiceSchema(siteUrl));
  if (page.canonicalPath === '/sobre-mi') nodes.push(personSchema(siteUrl));
  if (page.parentHub) nodes.push(serviceSchema(siteUrl, page));

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
