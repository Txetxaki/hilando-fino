# Hilando Fino Psicología — Marta Martín

Paquete de identidad de marca y de configuración de un [Claude Project](https://www.anthropic.com/news/projects) para la consulta de psicología de Marta Martín.

## Contenido

- `logo.png` — logo original de la marca.
- `public/images/` — fotografías reales de la consulta entregadas por Marta (2026-07-31), en WebP + JPG a 480/720/960/1280 px, más `og-hilando-fino.jpg` (1200×630) para redes sociales. El manifiesto con dimensiones y textos alternativos vive en `src/app/content/site-images.ts`.
- `identidad-de-marca/guia-de-marca.md` — paleta de colores (extraída por píxel del logo, con verificación de contraste WCAG), tipografía y uso del logo.
- `claude-project/` — todo lo necesario para levantar un Project de contenidos en claude.ai / Claude Desktop:
  - `instrucciones-personalizadas.md` — pegar en "Instrucciones del proyecto".
  - `conocimiento-01-sobre-marta-y-la-consulta.md` — **completar los `[COMPLETAR]` antes de subir**, es la fuente de verdad sobre datos reales.
  - `conocimiento-02-tono-de-voz-y-estilo.md`
  - `conocimiento-03-publico-y-mensajes-clave.md`
  - `como-configurar-el-project.md` — guía paso a paso.

## Estado

El copy de todas las rutas procede del documento que Marta entregó el 2026-07-31 (`web (1).docx`). De ahí salen también los datos reales de la consulta, centralizados en `src/app/content/practice-identity.ts`: colegiada CM-03249, Registro Sanitario 1309351/1317777, Calle Ramón y Cajal 2 (Local 2.6) de Ciudad Real y teléfono 623 92 17 07. Esos datos alimentan el pie de página, el schema `Psychologist` y las páginas legales, así que cualquier corrección se hace en ese único fichero.

Faltan cuatro datos que solo puede aportar ella y que bloquean la publicación indexable:

- Dominio de producción (`src/environments/site-config.ts` sigue en `pending-domain.invalid`, y con él canonicals, sitemap y schema).
- Correo vinculado al dominio: `tirandodelhilo@gmail.com` no encaja con la marca y Gmail es discutible para datos de salud bajo RGPD.
- NIF, obligatorio en el aviso legal por la LSSI-CE.
- Proveedor de hosting y encargados de tratamiento, para completar la política de privacidad.

`conocimiento-01-sobre-marta-y-la-consulta.md` conserva campos por completar en el paquete del Claude Project.

## Website runtime draft

The Angular website draft is static-prerendered and served by Express with a small `/api/contact` boundary. It is not runtime SSR at this stage. Unknown routes intentionally return HTTP `404` with `noindex` instead of serving the home page.

The GitHub Pages preview is static only and deploys from `dist/hilando-fino/browser` after `npm run build:pages`. It uses the repository base URL `/hilando-fino/`, remains `noindex`, and does not deploy the Express server, `/api/contact`, server bundles, `.env` files, source maps, or contact backend code. Contact stays visibly disabled in the preview.

GitHub Pages is public even for a private repository. `noindex` is not access control; do not publish secrets, patient data, private clinical notes, or approved-only production claims in the preview.

Live contact is blocked. `CONTACT_ENABLED=true` alone is not a working activation path: the UI intentionally does not submit, and the provider implementation rejects until a separate legal/provider/retention/HTTPS deployment approval change lands. Multi-instance contact also requires approved shared CSRF replay storage or sticky sessions.

Use Node `24.15.0` (`.nvmrc`, `.node-version`, `package.json#engines`, CI, and lockfile-pinned `node@24.15.0` dev dependency). Run `npm ci` first so scripts resolve the same local Node runtime; do not use floating `npx -p node@...` execution.

Quality commands:

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm audit --audit-level=moderate`
- `npm audit --omit=dev`
- `npm run build`
- `npm run build:pages`
- `npm run verify:inventory`
- `npm run verify:prerender`
- `npm run verify:pages`
- `npm run e2e`
- `npm run a11y`
- `npm run performance:smoke` — self-contained deterministic build/start/navigation smoke only, not Lighthouse/CWV
- `npm run lighthouse` — real Lighthouse lab budget; does not claim INP

Pushes to `master` and manual `workflow_dispatch` runs deploy the safe Pages preview through GitHub Actions using the official Pages actions. Pull requests run quality gates but do not deploy.

The oversized first delivery is intentionally covered by `docs/review/size-exception-review-guide.md` and `docs/review/change-inventory.md`, including complete untracked-file inventory checks, hot spots, package-lock treatment, verification sequence, and rollback boundaries. The raw `stitch_psicolog_a_mart_n_filo.zip` export is local-only/ignored; review `code.html`, `screen.png`, and `DESIGN.md` instead.
