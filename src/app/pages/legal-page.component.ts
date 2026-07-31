import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { contentPages } from '../content/content-matrix';
import { legalCopy } from '../content/legal-copy';
import { assertPublicPageKey } from '../content/public-routes';

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
        <p class="overline-pill">Información clara para navegar con confianza</p>
        <h1>{{ page().h1 }}</h1>
        <p class="hero-copy">{{ page().description }}</p>
      </header>
      @for (section of sections(); track section.heading ?? section.body[0]) {
        <section class="content-band legal-section">
          @if (section.heading) {
            <h2>{{ section.heading }}</h2>
          }
          @for (paragraph of section.body; track paragraph) {
            <p>{{ paragraph }}</p>
          }
          @if (section.items?.length) {
            <ul class="legal-list">
              @for (item of section.items; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          }
        </section>
      }

      <section class="content-band">
        <div class="inline-links">
          <a routerLink="/contacto">Ir a contacto</a>
          <a routerLink="/aviso-legal">Leer aviso legal</a>
          <a routerLink="/privacidad">Leer privacidad</a>
          <a routerLink="/cookies">Leer cookies</a>
        </div>
      </section>
    </article>
  `
})
export class LegalPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly key = signal<'legalNotice' | 'privacy' | 'cookies'>('legalNotice');
  readonly page = computed(() => contentPages[this.key()]);
  readonly sections = computed(() => legalCopy[this.key()]);

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
