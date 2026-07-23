import { RenderMode, ServerRoute } from '@angular/ssr';

import { publicRouteManifest } from './content/public-routes';

export const serverRoutes: ServerRoute[] = [
  ...publicRouteManifest.map((route): ServerRoute => ({
    path: route.path,
    renderMode: RenderMode.Prerender,
    ...(route.draftNoindex ? { headers: { 'X-Robots-Tag': 'noindex' } } : {})
  })),
  { path: '**', renderMode: RenderMode.Server, status: 404, headers: { 'X-Robots-Tag': 'noindex' } }
];
