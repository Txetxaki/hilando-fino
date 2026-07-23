import { expect, test } from '@playwright/test';

const routes = [
  ['/', 'Hilando Fino Psicología'],
  ['/sobre-mi', 'Sobre Marta Martín'],
  ['/como-trabajo', 'Cómo trabajo'],
  ['/areas-de-intervencion', 'Áreas de intervención'],
  ['/areas-de-intervencion/infancia-y-familias', 'Infancia y familias'],
  ['/areas-de-intervencion/adolescentes', 'Adolescentes'],
  ['/areas-de-intervencion/adultos', 'Adultos'],
  ['/areas-de-intervencion/orientacion-educativa-y-formacion', 'Orientación educativa y formación'],
  ['/psicologia-ciudad-real', 'Psicología en Ciudad Real'],
  ['/contacto', 'Contacto'],
  ['/talleres', 'Talleres'],
  ['/aviso-legal', 'Aviso legal'],
  ['/privacidad', 'Privacidad'],
  ['/cookies', 'Cookies']
];

test.describe('public static-prerender routes', () => {
  for (const [path, heading] of routes) {
    test(`${path} renders crawlable heading and draft-safe metadata`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { name: heading, level: 1 })).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /pending-domain\.invalid/);
    });
  }

  test('/psicologia-ciudad-real owns local intent without unsafe claims', async ({ page }) => {
    await page.goto('/psicologia-ciudad-real');
    await expect(page.getByText('sin inventar dirección ni disponibilidad')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Preguntar por disponibilidad presencial' })).toHaveAttribute('href', '/contacto?modalidad=in-person-ciudad-real');
  });

  test('contact flow is accessible and disabled safely', async ({ page }) => {
    await page.goto('/contacto');
    await expect(page.getByText('Este formulario no es un servicio de urgencias')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enviar solicitud' })).toBeDisabled();
  });

  test('unknown runtime routes return a real noindex 404 instead of the home page', async ({ page }) => {
    const response = await page.goto('/ruta-desconocida-para-regresion');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'No hemos encontrado esta página', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hilando Fino Psicología', level: 1 })).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://pending-domain.invalid/404');
  });
});
