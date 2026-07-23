import { describe, expect, it } from 'vitest';

import { AnalyticsService } from './analytics.service';
import { sanitizeAnalyticsProperties } from './analytics.types';

describe('safe analytics taxonomy', () => {
  it('drops contact and health payload properties', () => {
    const properties = sanitizeAnalyticsProperties({
      route: '/contacto',
      ctaSource: 'local-hero',
      modality: 'in-person-ciudad-real',
      category: 'adults',
      validationOutcome: 'invalid',
      name: 'Persona',
      email: 'person@example.com',
      phone: '123',
      message: 'Historia clínica',
      diagnosis: 'ansiedad'
    });

    expect(properties).toEqual({
      route: '/contacto',
      ctaSource: 'local-hero',
      modality: 'in-person-ciudad-real',
      category: 'adults',
      validationOutcome: 'invalid'
    });
    expect(JSON.stringify(properties)).not.toContain('person@example.com');
    expect(JSON.stringify(properties)).not.toContain('Historia clínica');
  });

  it('normalizes routes before storage and strips query strings and fragments', () => {
    const emailQuery = sanitizeAnalyticsProperties({ route: '/contacto?email=persona@example.com#historia-clinica' });
    const diagnosisQuery = sanitizeAnalyticsProperties({ route: '/psicologia-ciudad-real?diagnosis=ansiedad' });
    const unknownRoute = sanitizeAnalyticsProperties({ route: '/ruta-desconocida?message=secreto' });

    expect(emailQuery.route).toBe('/contacto');
    expect(diagnosisQuery.route).toBe('/psicologia-ciudad-real');
    expect(unknownRoute.route).toBe('/');
    expect(JSON.stringify([emailQuery, diagnosisQuery, unknownRoute])).not.toContain('persona@example.com');
    expect(JSON.stringify([emailQuery, diagnosisQuery, unknownRoute])).not.toContain('ansiedad');
    expect(JSON.stringify([emailQuery, diagnosisQuery, unknownRoute])).not.toContain('historia-clinica');
  });

  it('uses an honest no-op adapter and does not retain events in memory', () => {
    const service = new AnalyticsService();
    service.track('cta_click', { route: '/contacto?email=persona@example.com', ctaSource: 'local-hero' });
    expect(JSON.stringify(service)).not.toContain('persona@example.com');
    expect(JSON.stringify(service)).not.toContain('events');
  });
});
