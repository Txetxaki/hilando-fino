import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { parentHref, treatmentByPath } from '../content/treatment-index';
import type { TreatmentPage } from '../content/treatment-types';

@Component({
  selector: 'hf-treatment-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="page-shell treatment-page">
      <header class="hero woven-hero treatment-hero">
        <p class="overline-pill">{{ page().summary }}</p>
        <h1>{{ page().h1 }}</h1>
        <p class="hero-copy">{{ page().introFirstPerson }}</p>
        <div class="hero-actions">
          <a routerLink="/contacto" class="button primary">Orientar mi consulta</a>
          <a [routerLink]="parentHref()" class="button secondary">Volver al área</a>
        </div>
      </header>

      <nav class="toc" aria-label="Índice de la página">
        <p>En esta página</p>
        <a [routerLink]="[]" fragment="situaciones">Señales</a>
        <a [routerLink]="[]" fragment="impacto">Impacto</a>
        <a [routerLink]="[]" fragment="acompanarte">Cómo puedo acompañarte</a>
        <a [routerLink]="[]" fragment="proceso">Proceso</a>
        <a [routerLink]="[]" fragment="preguntas">Preguntas frecuentes</a>
      </nav>

      <section id="situaciones" class="content-band"><p class="eyebrow">{{ page().situations.eyebrow }}</p><h2>{{ page().situations.title }}</h2>@for (paragraph of page().situations.body; track paragraph) { <p>{{ paragraph }}</p> }</section>
      <section id="impacto" class="content-band"><p class="eyebrow">{{ page().contextImpact.eyebrow }}</p><h2>{{ page().contextImpact.title }}</h2>@for (paragraph of page().contextImpact.body; track paragraph) { <p>{{ paragraph }}</p> }</section>
      <section id="acompanarte" class="content-band"><p class="eyebrow">{{ page().howICanHelp.eyebrow }}</p><h2>{{ page().howICanHelp.title }}</h2>@for (paragraph of page().howICanHelp.body; track paragraph) { <p>{{ paragraph }}</p> }</section>
      <section id="proceso" class="content-band"><p class="eyebrow">{{ page().process.eyebrow }}</p><h2>{{ page().process.title }}</h2>@for (paragraph of page().process.body; track paragraph) { <p>{{ paragraph }}</p> }<div class="inline-links">@for (link of page().process.links ?? []; track link.href) { <a [routerLink]="link.href">{{ link.label }}</a> }</div></section>

      @if (page().boundaries.length) {
        <aside class="emergency-boundary" aria-labelledby="boundary-title">
          <h2 id="boundary-title">Límite importante</h2>
          @for (boundary of page().boundaries; track boundary.text) { <p>{{ boundary.text }}</p> }
        </aside>
      }

      <section id="preguntas" class="faq-block" aria-labelledby="faq-title">
        <p class="eyebrow">Preguntas frecuentes</p>
        <h2 id="faq-title">Preguntas sobre {{ page().h1.toLowerCase() }}</h2>
        @for (item of page().faq; track item.question) {
          <article class="faq-item"><h3>{{ item.question }}</h3><p>{{ item.answer }}</p></article>
        }
      </section>

      <section class="content-band local-cta" aria-labelledby="local-cta-title">
        <p class="eyebrow">Ciudad Real</p>
        <h2 id="local-cta-title">Si estás valorando pedir ayuda</h2>
        <p>{{ page().localCta }}</p>
        <div class="inline-links"><a routerLink="/contacto">Escribirme una primera orientación</a><a routerLink="/psicologia-ciudad-real">Psicología en Ciudad Real</a></div>
      </section>

      <aside class="related-block" aria-labelledby="related-treatment-title">
        <p class="eyebrow">Seguir leyendo</p>
        <h2 id="related-treatment-title">Páginas relacionadas</h2>
        <div class="related-list">
          @for (item of page().related; track item.href ?? item.title) {
            <a [routerLink]="item.href || '/'"><strong>{{ item.title }}</strong><span>{{ item.body }}</span></a>
          }
        </div>
      </aside>
    </article>
  `
})
export class TreatmentPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly current = signal<TreatmentPage | undefined>(undefined);
  readonly page = computed(() => {
    const page = this.current();
    if (!page) throw new Error('Treatment page not found');
    return page;
  });

  constructor() {
    this.route.data.subscribe((data) => {
      const page = treatmentByPath(String(data['canonicalPath'] ?? ''));
      if (!page) throw new Error(`Unknown treatment page: ${String(data['canonicalPath'])}`);
      this.current.set(page);
    });
  }

  parentHref(): string {
    return parentHref(this.page().sector);
  }
}
