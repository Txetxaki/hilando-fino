import { expect, test } from '@playwright/test';
import { treatmentPages } from '../../src/app/content/treatment-pages';

const routes = [
  ['/', 'Hilando Fino Psicología'],
  ['/sobre-mi', 'Sobre Marta Martín'],
  ['/como-trabajo', 'Cómo trabajo'],
  ['/areas-de-intervencion', 'Áreas de intervención'],
  ['/areas-de-intervencion/infancia-y-familias', 'Infancia y familias'],
  ['/areas-de-intervencion/adolescentes', 'Adolescentes'],
  ['/areas-de-intervencion/adultos', 'Adultos'],
  ['/areas-de-intervencion/orientacion-educativa-y-formacion', 'Orientación educativa y formación'],
  ['/psicologia-ciudad-real', 'Psicóloga en Ciudad Real'],
  ['/psicologia-trauma-ciudad-real', 'Psicología para trauma y duelo en Ciudad Real'],
  ['/contacto', 'Contacto'],
  ['/talleres', 'Talleres'],
  ['/aviso-legal', 'Aviso legal'],
  ['/privacidad', 'Privacidad'],
  ['/cookies', 'Cookies']
] as const;

const treatmentRouteSamples = [
  treatmentPages.find((page) => page.sector === 'children-families')!,
  treatmentPages.find((page) => page.sector === 'adolescents')!,
  treatmentPages.find((page) => page.sector === 'adults')!,
  treatmentPages.find((page) => page.sector === 'education-training')!
];

const requiredMenuLinks = [
  ['Inicio', '/'],
  ['Sobre mí', '/sobre-mi'],
  ['Cómo trabajo', '/como-trabajo'],
  ['Áreas de intervención', '/areas-de-intervencion'],
  ['Psicología Ciudad Real', '/psicologia-ciudad-real'],
  ['Talleres', '/talleres'],
  ['Contacto', '/contacto'],
  ['Infancia y familias', '/areas-de-intervencion/infancia-y-familias'],
  ['Adolescentes', '/areas-de-intervencion/adolescentes'],
  ['Adultos', '/areas-de-intervencion/adultos'],
  ['Orientación educativa y formación', '/areas-de-intervencion/orientacion-educativa-y-formacion'],
  ['Trauma y duelo', '/psicologia-trauma-ciudad-real']
] as const;

const forbiddenVisibleTerms = [
  /\bborrador\b/i,
  /\bnoindex\b/i,
  /\bpendiente\b/i,
  /\bpreparad[ao]s?\b/i,
  /faltan datos/i,
  /approved-placeholder/i,
  /estado de aprobación/i,
  /modo seguro/i,
  /cuando se confirme/i,
  /placeholder/i,
  /technical status/i,
  /launch gates?/i
];

test.describe('public static-prerender routes', () => {
  for (const [path, heading] of routes) {
    test(`${path} renders crawlable heading and preview-safe metadata`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { name: heading, level: 1 })).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /pending-domain\.invalid/);
      const visibleText = await page.locator('body').innerText();
      for (const forbidden of forbiddenVisibleTerms) expect(visibleText).not.toMatch(forbidden);
    });
  }

  test('all 29 dedicated treatment pages are available and internally useful', async ({ page }) => {
    expect(treatmentPages).toHaveLength(29);
    for (const route of treatmentPages) {
      await page.goto(route.canonicalPath);
      await expect(page.getByRole('heading', { name: route.h1, level: 1 })).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Migas de pan' }).getByRole('link', { name: /Áreas de intervención/ })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Preguntas sobre/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Orientar mi consulta|Escribirme una primera orientación/i }).first()).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      const visibleText = await page.locator('body').innerText();
      for (const forbidden of forbiddenVisibleTerms) expect(visibleText).not.toMatch(forbidden);
    }
  });

  for (const route of treatmentRouteSamples) {
    test(`${route.sector} sample treatment renders related links and FAQ`, async ({ page }) => {
      await page.goto(route.canonicalPath);
      await expect(page.getByRole('heading', { name: 'Páginas relacionadas' })).toBeVisible();
      const faqRegion = page.getByRole('region', { name: /Preguntas sobre/i });
      await expect(faqRegion.getByRole('heading', { level: 3 })).toHaveCount(4);
      await expect(page.getByRole('link', { name: /Volver al área/i })).toBeVisible();
    });
  }

  test('desktop navigation exposes the complete IA and area menu links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    for (const [label, href] of requiredMenuLinks.slice(0, 7)) {
      if (label === 'Áreas de intervención') {
        await expect(page.getByRole('button', { name: label })).toBeVisible();
        continue;
      }
      await expect(page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href);
    }
    await page.getByRole('button', { name: 'Áreas de intervención' }).click();
    await expect(page.locator('#areas-menu').getByRole('link', { name: 'Vista general' })).toHaveAttribute('href', '/areas-de-intervencion');
    for (const [label, href] of requiredMenuLinks.slice(7)) {
      await expect(page.locator('#areas-menu').getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href);
    }
    await expect(page.locator('#areas-menu').getByRole('link', { name: 'Ansiedad infantil' })).toHaveAttribute('href', '/areas-de-intervencion/infancia-y-familias/ansiedad-infantil');
    await expect(page.locator('#areas-menu').getByRole('link', { name: 'Ansiedad en adolescentes' })).toHaveAttribute('href', '/areas-de-intervencion/adolescentes/ansiedad-adolescente');
    await expect(page.locator('#areas-menu').getByRole('link', { name: 'Ansiedad en adultos' })).toHaveAttribute('href', '/areas-de-intervencion/adultos/ansiedad');
  });

  test('dropdown supports keyboard focus, escape close, outside close, and current route state', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/areas-de-intervencion/adultos');
    const trigger = page.getByRole('button', { name: 'Áreas de intervención' });
    await expect(trigger).toHaveClass(/active/);
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#areas-menu').getByRole('link', { name: 'Vista general' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.mouse.click(20, 20);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu exposes the same IA without hover-only access', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Menú' }).click();
    await page.getByRole('button', { name: 'Áreas de intervención' }).click();
    for (const [label, href] of requiredMenuLinks) {
      const locator = label === 'Áreas de intervención'
        ? page.getByRole('button', { name: label })
        : label === 'Infancia y familias' || label === 'Adolescentes' || label === 'Adultos' || label === 'Orientación educativa y formación' || label === 'Trauma y duelo'
          ? page.locator('#areas-menu').getByRole('link', { name: label, exact: true })
          : page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: label, exact: true }).first();
      await expect(locator).toBeVisible();
      if (label !== 'Áreas de intervención') await expect(locator).toHaveAttribute('href', href);
    }
  });

  test('/psicologia-ciudad-real is a real local landing page with natural cross-links', async ({ page }) => {
    await page.goto('/psicologia-ciudad-real');
    await expect(page.getByRole('heading', { name: 'Qué mirar al elegir psicóloga en Ciudad Real.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Trauma y duelo en Ciudad Real' }).first()).toHaveAttribute('href', '/psicologia-trauma-ciudad-real');
    await expect(page.locator('a[href="/contacto?modalidad=in-person-ciudad-real"]').first()).toBeVisible();
  });

  test('trauma and grief page is substantial and linked to age-context pages', async ({ page }) => {
    await page.goto('/psicologia-trauma-ciudad-real');
    await expect(page.getByRole('heading', { name: 'EMDR puede formar parte del proceso, pero siempre con valoración previa.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Trauma y duelo infantil' }).first()).toHaveAttribute('href', '/areas-de-intervencion/infancia-y-familias/trauma-y-duelo-infantil');
    await expect(page.getByRole('link', { name: 'Trauma en adolescentes' }).first()).toHaveAttribute('href', '/areas-de-intervencion/adolescentes/trauma-adolescente');
    await expect(page.getByRole('link', { name: 'Trauma en adultos' }).first()).toHaveAttribute('href', '/areas-de-intervencion/adultos/trauma');
  });

  test('contact flow looks final and honestly declines instead of a fake retryable failure', async ({ page }) => {
    await page.goto('/contacto');
    await expect(page.getByText('Este formulario no es un servicio de urgencias')).toBeVisible();
    const button = page.getByRole('button', { name: 'Enviar solicitud' });
    await expect(button).toBeEnabled();
    await page.getByLabel('Nombre').fill('Persona de prueba');
    await page.getByRole('textbox', { name: 'Email' }).fill('persona@example.com');
    await page.getByLabel('He leído la información de privacidad').check();
    await button.click();
    await expect(page.getByRole('status')).toContainText('Todavía no puedo recibir tu mensaje');
    await expect(page.getByRole('status')).not.toContainText(/éxito|enviad[ao]/i);
    await expect(page.getByRole('status')).not.toContainText(/vuelve a intentarlo/i);
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
