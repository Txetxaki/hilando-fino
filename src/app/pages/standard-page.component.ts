import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { assertStandardPageKey, StandardPageKey } from '../content/public-routes';
import { pageContents } from './page-data';

@Component({
  selector: 'hf-standard-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="page-shell" [class.local-page]="content().page.key === 'local'">
      <nav class="breadcrumbs" aria-label="Migas de pan">
        <a routerLink="/">Inicio</a>
        <span aria-hidden="true">/</span>
        <span>{{ content().page.h1 }}</span>
      </nav>

      <header class="hero woven-hero">
        <p class="draft-pill">{{ content().heroNote }}</p>
        <h1>{{ content().page.h1 }}</h1>
        <p class="hero-copy">{{ content().page.description }}</p>
        <div class="hero-actions">
          <a routerLink="/contacto" class="button primary">Contacto seguro</a>
          <a routerLink="/como-trabajo" class="button secondary">Conocer el enfoque</a>
        </div>
      </header>

      @for (section of content().sections; track section.title) {
        <section class="content-band">
          @if (section.eyebrow) {
            <p class="eyebrow">{{ section.eyebrow }}</p>
          }
          <h2>{{ section.title }}</h2>
          @for (paragraph of section.body; track paragraph) {
            <p>{{ paragraph }}</p>
          }
          @if (section.links?.length) {
            <div class="inline-links" aria-label="Enlaces relacionados">
              @for (link of section.links; track link.href) {
                <a [routerLink]="linkPath(link.href)" [queryParams]="linkQueryParams(link.href)">{{ link.label }}</a>
              }
            </div>
          }
        </section>
      }

      @if (content().cards?.length) {
        <section class="card-grid" aria-label="Contenido relacionado">
          @for (card of content().cards; track card.title) {
            <a class="thread-card" [routerLink]="card.href || null" [class.is-static]="!card.href">
              @if (card.status) {
                <span class="status-chip">{{ card.status }}</span>
              }
              <h2>{{ card.title }}</h2>
              <p>{{ card.body }}</p>
            </a>
          }
        </section>
      }

      <aside class="approval-panel" id="bloqueadores" aria-labelledby="approval-title">
        <h2 id="approval-title">Estado de aprobación</h2>
        <p><strong>Estado:</strong> {{ content().page.status }}</p>
        <p><strong>Indexación:</strong> {{ content().page.noindex ? 'bloqueada/noindex' : 'permitida' }}</p>
        <ul>
          @for (blocker of content().page.blockers; track blocker) {
            <li>{{ blocker }}</li>
          }
        </ul>
      </aside>
    </article>
  `
})
export class StandardPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageKey = signal<StandardPageKey>('home');
  readonly content = computed(() => pageContents[this.pageKey()]);

  constructor() {
    this.route.data.subscribe((data) => {
      const key = data['pageKey'];
      assertStandardPageKey(key);
      this.pageKey.set(key);
    });
  }

  linkPath(href: string): string {
    return href.split('?')[0] || '/';
  }

  linkQueryParams(href: string): Record<string, string> | null {
    const query = href.split('?')[1];
    if (!query) return null;
    return Object.fromEntries(new URLSearchParams(query).entries());
  }
}
