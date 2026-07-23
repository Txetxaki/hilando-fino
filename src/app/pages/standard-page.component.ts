import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { assertStandardPageKey, StandardPageKey } from '../content/public-routes';
import { pageContents } from './page-data';

@Component({
  selector: 'hf-standard-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="page-shell" [class.local-page]="content().page.key === 'local'" [class.trauma-page]="content().page.key === 'traumaLocal'">
      <nav class="breadcrumbs" aria-label="Migas de pan">
        @for (crumb of breadcrumbs(); track crumb.href ?? crumb.label) {
          @if (crumb.href) {
            <a [routerLink]="crumb.href">{{ crumb.label }}</a>
            <span aria-hidden="true">/</span>
          } @else {
            <span>{{ crumb.label }}</span>
          }
        }
      </nav>

      <header class="hero woven-hero">
        <p class="overline-pill">{{ content().heroNote }}</p>
        <h1>{{ content().page.h1 }}</h1>
        <p class="hero-copy">{{ content().page.description }}</p>
        <div class="hero-actions">
          <a routerLink="/contacto" class="button primary">Orientar mi consulta</a>
          <a routerLink="/areas-de-intervencion" class="button secondary">Ver áreas de intervención</a>
        </div>
      </header>

      @if (content().sections.length > 2) {
        <nav class="toc" aria-label="Índice de la página">
          <p>En esta página</p>
          @for (section of content().sections; track section.title) {
            <a [href]="'#' + sectionId(section.title)">{{ section.title }}</a>
          }
        </nav>
      }

      @for (section of content().sections; track section.title) {
        <section class="content-band" [id]="sectionId(section.title)">
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
        <section class="card-grid" aria-label="Temas y áreas">
          @for (card of content().cards; track card.title) {
            @if (card.href) {
              <a class="thread-card" [routerLink]="card.href">
                <h2>{{ card.title }}</h2>
                <p>{{ card.body }}</p>
              </a>
            } @else {
              <article class="thread-card is-static">
                <h2>{{ card.title }}</h2>
                <p>{{ card.body }}</p>
              </article>
            }
          }
        </section>
      }

      @if (content().related?.length) {
        <aside class="related-block" aria-labelledby="related-title">
          <p class="eyebrow">Seguir leyendo</p>
          <h2 id="related-title">Páginas relacionadas</h2>
          <div class="related-list">
            @for (item of content().related; track item.href ?? item.title) {
              <a [routerLink]="item.href || '/'">
                <strong>{{ item.title }}</strong>
                <span>{{ item.body }}</span>
              </a>
            }
          </div>
        </aside>
      }
    </article>
  `
})
export class StandardPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageKey = signal<StandardPageKey>('home');
  readonly content = computed(() => pageContents[this.pageKey()]);
  readonly breadcrumbs = computed(() => this.buildBreadcrumbs(this.pageKey()));

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

  sectionId(title: string): string {
    return title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private buildBreadcrumbs(key: StandardPageKey): { label: string; href?: string }[] {
    const current = pageContents[key].page.h1;
    if (['childrenFamilies', 'adolescents', 'adults', 'educationTraining'].includes(key)) {
      return [{ label: 'Inicio', href: '/' }, { label: 'Áreas de intervención', href: '/areas-de-intervencion' }, { label: current }];
    }
    if (key === 'traumaLocal') return [{ label: 'Inicio', href: '/' }, { label: 'Psicología Ciudad Real', href: '/psicologia-ciudad-real' }, { label: current }];
    return [{ label: 'Inicio', href: '/' }, { label: current }];
  }
}
