import { RenderMode, ServerRoute } from '@angular/ssr';

import { publicRouteManifest } from './content/public-routes';
import { siteConfig } from '../environments/site-config';

export const serverRoutes: ServerRoute[] = [
  ...publicRouteManifest.map((route): ServerRoute => ({
    path: route.path,
    renderMode: RenderMode.Prerender,
    ...(siteConfig.draftNoindex ? { headers: { 'X-Robots-Tag': 'noindex, nofollow' } } : {})
  })),
  { path: '**', renderMode: RenderMode.Server, status: 404, headers: { 'X-Robots-Tag': 'noindex' } }
];
