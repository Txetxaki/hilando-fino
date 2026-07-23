import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { contentPages } from '../content/content-matrix';
import { assertPublicPageKey } from '../content/public-routes';

const legalCopy = {
  legalNotice: [
    'Este aviso legal está pendiente de completar con datos profesionales y legales verificados.',
    'No se publica identidad fiscal, domicilio profesional, número de colegiación ni datos regulatorios hasta que Marta los confirme.'
  ],
  privacy: [
    'La política de privacidad está bloqueada hasta aprobar responsable del tratamiento, proveedor de email/hosting, base jurídica, retención y canal de ejercicio de derechos.',
    'Por ese motivo el formulario público permanece desactivado y no se envían datos sensibles a terceros.'
  ],
  cookies: [
    'Este borrador no instala analítica de terceros ni cookies de marketing.',
    'Cualquier medición futura deberá usar la taxonomía segura aprobada y consentimiento cuando corresponda.'
  ]
};

@Component({
  selector: 'hf-legal-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="page-shell legal-page">
      <nav class="breadcrumbs" aria-label="Migas de pan">
        <a routerLink="/">Inicio</a>
        <span aria-hidden="true">/</span>
        <span>{{ page().h1 }}</span>
      </nav>
      <header class="hero compact-hero">
        <p class="draft-pill">Documento legal no publicable todavía</p>
        <h1>{{ page().h1 }}</h1>
        <p class="hero-copy">{{ page().description }}</p>
      </header>
      <section class="content-band">
        @for (paragraph of paragraphs(); track paragraph) {
          <p>{{ paragraph }}</p>
        }
        <p>Hasta completar estos datos, esta ruta queda noindex y omitida del sitemap.</p>
      </section>
    </article>
  `
})
export class LegalPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly key = signal<'legalNotice' | 'privacy' | 'cookies'>('legalNotice');
  readonly page = computed(() => contentPages[this.key()]);
  readonly paragraphs = computed(() => legalCopy[this.key()]);

  constructor() {
    this.route.data.subscribe((data) => {
      const key = data['pageKey'];
      assertPublicPageKey(key);
      if (key !== 'legalNotice' && key !== 'privacy' && key !== 'cookies') {
        throw new Error(`Legal page cannot render non-legal key: ${key}`);
      }
      this.key.set(key);
    });
  }
}
