import { Routes } from '@angular/router';

import { publicRouteManifest } from './content/public-routes';

const standardPage = () => import('./pages/standard-page.component').then((module) => module.StandardPageComponent);
const treatmentPage = () => import('./pages/treatment-page.component').then((module) => module.TreatmentPageComponent);
const legalPage = () => import('./pages/legal-page.component').then((module) => module.LegalPageComponent);
const contactPage = () => import('./contact/contact-page.component').then((module) => module.ContactPageComponent);

const publicRoutes: Routes = publicRouteManifest.map((route) => ({
  path: route.path,
  pathMatch: 'full',
  loadComponent: route.kind === 'contact' ? contactPage : route.kind === 'legal' ? legalPage : route.kind === 'treatment' ? treatmentPage : standardPage,
  data: { pageKey: route.pageKey, canonicalPath: route.canonicalPath },
  ...(route.pageKey === 'home' ? { title: 'Hilando Fino Psicología' } : {})
}));

export const routes: Routes = [
  ...publicRoutes,
  { path: '**', loadComponent: () => import('./pages/not-found.component').then((module) => module.NotFoundComponent) }
];
