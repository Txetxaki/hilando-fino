import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/psicologia-ciudad-real',
  '/psicologia-trauma-ciudad-real',
  '/areas-de-intervencion',
  '/areas-de-intervencion/infancia-y-familias',
  '/areas-de-intervencion/adolescentes',
  '/areas-de-intervencion/adultos',
  '/areas-de-intervencion/orientacion-educativa-y-formacion',
  '/areas-de-intervencion/infancia-y-familias/ansiedad-infantil',
  '/areas-de-intervencion/adolescentes/trauma-adolescente',
  '/areas-de-intervencion/adultos/ansiedad',
  '/areas-de-intervencion/orientacion-educativa-y-formacion/dificultades-de-aprendizaje',
  '/contacto'
];

test.describe('accessibility smoke @a11y', () => {
  for (const route of routes) {
    test(`${route} has no critical axe violations`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page: page as never }).analyze();
      const serious = results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious');
      expect(serious).toEqual([]);
    });
  }
});
