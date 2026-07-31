import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { assertStandardPageKey, StandardPageKey } from '../content/public-routes';
import { credentialGroups } from '../content/credentials';
import { methodModels, methodResources } from '../content/method-models';
import { fallbackSrc, jpgSrcset, siteImages, webpSrcset, type SiteImage } from '../content/site-images';
import type { PageBlock, SiteImageKey } from '../content/types';
import { workshopLines } from '../content/workshops';
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

      <header class="hero woven-hero" [class.has-media]="heroImage()">
        <div class="hero-text">
          <p class="overline-pill">{{ content().heroNote }}</p>
          <h1>{{ content().page.h1 }}</h1>
          <p class="hero-copy">{{ content().page.description }}</p>
          <div class="hero-actions">
            <a routerLink="/contacto" class="button primary">Pedir cita</a>
            <a routerLink="/areas-de-intervencion" class="button secondary">Ver áreas</a>
          </div>
        </div>
        @if (heroImage(); as media) {
          <picture class="hero-media">
            <source type="image/webp" [srcset]="webpSrcset(media)" [sizes]="media.sizes" />
            <img
              [src]="fallbackSrc(media)"
              [srcset]="jpgSrcset(media)"
              [sizes]="media.sizes"
              [width]="media.width"
              [height]="media.height"
              [alt]="media.alt"
              fetchpriority="high"
              decoding="async"
            />
          </picture>
        }
      </header>

      @if (content().sections.length > 2) {
        <nav class="toc" aria-label="Índice de la página">
          <p>En esta página</p>
          @for (section of content().sections; track section.title) {
            <a [routerLink]="[]" [fragment]="sectionId(section.title)">{{ section.title }}</a>
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

      @for (block of content().blocks ?? []; track blockKey(block)) {
        @switch (block.kind) {
          @case ('quote') {
            <blockquote class="pull-quote">{{ block.text }}</blockquote>
          }
          @case ('figure') {
            <figure class="content-figure">
              <picture>
                <source type="image/webp" [srcset]="webpSrcset(image(block.imageKey))" [sizes]="image(block.imageKey).sizes" />
                <img
                  [src]="fallbackSrc(image(block.imageKey))"
                  [srcset]="jpgSrcset(image(block.imageKey))"
                  [sizes]="image(block.imageKey).sizes"
                  [width]="image(block.imageKey).width"
                  [height]="image(block.imageKey).height"
                  [alt]="image(block.imageKey).alt"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              @if (block.caption) {
                <figcaption>{{ block.caption }}</figcaption>
              }
            </figure>
          }
          @case ('credentials') {
            <section class="content-band block-band" [id]="sectionId(block.title)">
              <p class="eyebrow">{{ block.eyebrow }}</p>
              <h2>{{ block.title }}</h2>
              @if (block.intro) { <p>{{ block.intro }}</p> }
              <div class="credential-grid">
                @for (group of credentialGroups; track group.title) {
                  <div class="credential-group">
                    <h3>{{ group.title }}</h3>
                    <ul>
                      @for (item of group.items; track item) { <li>{{ item }}</li> }
                    </ul>
                  </div>
                }
              </div>
            </section>
          }
          @case ('models') {
            <section class="content-band block-band wide-band" [id]="sectionId(block.title)">
              <p class="eyebrow">{{ block.eyebrow }}</p>
              <h2>{{ block.title }}</h2>
              @if (block.intro) { <p>{{ block.intro }}</p> }
              <div class="model-grid">
                @for (model of methodModels; track model.name) {
                  <article class="model-card">
                    <h3>{{ model.name }}</h3>
                    @if (model.summary) { <p>{{ model.summary }}</p> }
                    @for (facet of model.facets; track facet.label) {
                      <p><strong>{{ facet.label }}</strong> {{ facet.text }}</p>
                    }
                  </article>
                }
              </div>
            </section>
          }
          @case ('resources') {
            <section class="content-band block-band wide-band" [id]="sectionId(block.title)">
              <p class="eyebrow">{{ block.eyebrow }}</p>
              <h2>{{ block.title }}</h2>
              @if (block.intro) { <p>{{ block.intro }}</p> }
              <div class="resource-list">
                @for (resource of methodResources; track resource.name) {
                  <article class="resource-item">
                    @if (resource.imageKey; as key) {
                      <picture>
                        <source type="image/webp" [srcset]="webpSrcset(image(key))" [sizes]="image(key).sizes" />
                        <img
                          [src]="fallbackSrc(image(key))"
                          [srcset]="jpgSrcset(image(key))"
                          [sizes]="image(key).sizes"
                          [width]="image(key).width"
                          [height]="image(key).height"
                          [alt]="image(key).alt"
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    }
                    <div>
                      <h3>{{ resource.name }}</h3>
                      <p class="resource-qualifier">{{ resource.qualifier }}</p>
                      <p>{{ resource.body }}</p>
                    </div>
                  </article>
                }
              </div>
            </section>
          }
          @case ('workshops') {
            <section class="content-band block-band wide-band" [id]="sectionId(block.title)">
              <p class="eyebrow">{{ block.eyebrow }}</p>
              <h2>{{ block.title }}</h2>
              @if (block.intro) { <p>{{ block.intro }}</p> }
              <div class="workshop-list">
                @for (line of workshopLines; track line.name) {
                  <article class="workshop-item">
                    <h3>{{ line.name }}</h3>
                    <p>{{ line.body }}</p>
                    @if (line.audience) { <p class="workshop-audience">{{ line.audience }}</p> }
                    @if (line.contents?.length) {
                      <p class="workshop-contents-title">{{ line.contentsTitle }}</p>
                      <ul>
                        @for (item of line.contents; track item) { <li>{{ item }}</li> }
                      </ul>
                    }
                  </article>
                }
              </div>
            </section>
          }
          @case ('checklist') {
            <section class="content-band block-band" [id]="sectionId(block.title)">
              <p class="eyebrow">{{ block.eyebrow }}</p>
              <h2>{{ block.title }}</h2>
              @if (block.intro) { <p>{{ block.intro }}</p> }
              <ul class="checklist">
                @for (item of block.items; track item) { <li>{{ item }}</li> }
              </ul>
            </section>
          }
          @case ('highlight') {
            <section class="content-band highlight-band" [id]="sectionId(block.title)">
              <p class="eyebrow">{{ block.eyebrow }}</p>
              <h2>{{ block.title }}</h2>
              @for (paragraph of block.body; track paragraph) { <p>{{ paragraph }}</p> }
              @if (block.links?.length) {
                <div class="inline-links">
                  @for (link of block.links; track link.href) {
                    <a [routerLink]="linkPath(link.href)" [queryParams]="linkQueryParams(link.href)">{{ link.label }}</a>
                  }
                </div>
              }
            </section>
          }
        }
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
  readonly heroImage = computed(() => {
    const key = this.content().heroImage;
    return key ? siteImages[key] : undefined;
  });
  readonly credentialGroups = credentialGroups;
  readonly methodModels = methodModels;
  readonly methodResources = methodResources;
  readonly workshopLines = workshopLines;

  constructor() {
    this.route.data.subscribe((data) => {
      const key = data['pageKey'];
      assertStandardPageKey(key);
      this.pageKey.set(key);
    });
  }

  image(key: SiteImageKey): SiteImage {
    return siteImages[key];
  }

  webpSrcset(image: SiteImage): string {
    return webpSrcset(image);
  }

  jpgSrcset(image: SiteImage): string {
    return jpgSrcset(image);
  }

  fallbackSrc(image: SiteImage): string {
    return fallbackSrc(image);
  }

  /** Stable @for key: blocks have no id, and two figures can share a kind. */
  blockKey(block: PageBlock): string {
    if (block.kind === 'quote') return `quote:${block.text.slice(0, 24)}`;
    if (block.kind === 'figure') return `figure:${block.imageKey}`;
    return `${block.kind}:${block.title}`;
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
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private buildBreadcrumbs(key: StandardPageKey): { label: string; href?: string }[] {
    const current = pageContents[key].page.h1;
    if (['childrenFamilies', 'adolescents', 'adults', 'perinatal', 'educationTraining'].includes(key)) {
      return [{ label: 'Inicio', href: '/' }, { label: 'Áreas de intervención', href: '/areas-de-intervencion' }, { label: current }];
    }
    if (key === 'traumaLocal') return [{ label: 'Inicio', href: '/' }, { label: 'Psicología Ciudad Real', href: '/psicologia-ciudad-real' }, { label: current }];
    return [{ label: 'Inicio', href: '/' }, { label: current }];
  }
}
