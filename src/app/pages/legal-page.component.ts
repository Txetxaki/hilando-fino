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
      <section class="content-band">
        @for (paragraph of paragraphs(); track paragraph) {
          <p>{{ paragraph }}</p>
        }
        <div class="inline-links">
          <a routerLink="/contacto">Ir a contacto</a>
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
