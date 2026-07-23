import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/', '/psicologia-ciudad-real', '/areas-de-intervencion', '/contacto'];

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
