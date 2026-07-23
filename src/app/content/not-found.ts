export const notFoundContent = {
  title: 'Página no encontrada | Hilando Fino Psicología',
  label: 'Página no encontrada',
  h1: 'No hemos encontrado esta página',
  body: 'La ruta solicitada no existe. Te ayudamos a volver a una página útil.',
  homeLabel: 'Volver al inicio',
  canonicalPath: '/404'
} as const;

export function renderNotFoundHtml({ siteUrl, baseHref, includeBase = false }: { siteUrl: string; baseHref: string; includeBase?: boolean }): string {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${notFoundContent.title}</title>
  ${includeBase ? `<base href="${baseHref}">` : ''}
  <meta name="robots" content="noindex, nofollow">
  <link rel="canonical" href="${siteUrl}${notFoundContent.canonicalPath}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#FBF8F7">
</head>
<body>
  <main>
    <p>${notFoundContent.label}</p>
    <h1>${notFoundContent.h1}</h1>
    <p>${notFoundContent.body}</p>
    <a href="${baseHref}">${notFoundContent.homeLabel}</a>
  </main>
</body>
</html>
`;
}
