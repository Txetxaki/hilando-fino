import { describe, expect, it } from 'vitest';

import { contentPages } from '../../content/content-matrix';
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
    expect(serialized).toContain('https://txetxaki.github.io/hilando-fino/logo.png');
    expect(serialized).not.toContain('pending-domain.invalid');
  });
});
