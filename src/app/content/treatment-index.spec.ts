import { describe, expect, it } from 'vitest';

import { treatmentByPath } from './treatment-index';
import { treatmentPages } from './treatment-pages';

describe('treatmentByPath', () => {
  const sample = treatmentPages.find((page) => page.slug === 'ansiedad-infantil')!;

  it('resolves a known canonical path to its treatment page', () => {
    expect(treatmentByPath(sample.canonicalPath)).toBe(sample);
  });

  it('normalizes a trailing slash before matching', () => {
    expect(treatmentByPath(`${sample.canonicalPath}/`)).toBe(sample);
  });

  it('normalizes a query string before matching', () => {
    expect(treatmentByPath(`${sample.canonicalPath}?modalidad=in-person-ciudad-real`)).toBe(sample);
  });

  it('normalizes a trailing slash combined with a query string', () => {
    expect(treatmentByPath(`${sample.canonicalPath}/?utm_source=test`)).toBe(sample);
  });

  it('returns undefined for an unknown path', () => {
    expect(treatmentByPath('/ruta-que-no-existe')).toBeUndefined();
  });

  it('returns undefined for a non-treatment public route', () => {
    expect(treatmentByPath('/contacto')).toBeUndefined();
  });
});
