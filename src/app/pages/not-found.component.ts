import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { notFoundContent } from '../content/not-found';

@Component({
  selector: 'hf-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="page-shell">
      <header class="hero compact-hero">
        <p class="overline-pill">{{ content.label }}</p>
        <h1>{{ content.h1 }}</h1>
        <p class="hero-copy">{{ content.body }} Puedes volver al inicio o revisar las áreas de intervención.</p>
        <div class="hero-actions">
          <a routerLink="/" class="button primary">Volver al inicio</a>
          <a routerLink="/areas-de-intervencion" class="button secondary">Ver áreas</a>
        </div>
      </header>
    </article>
  `
})
export class NotFoundComponent {
  readonly content = notFoundContent;
}
