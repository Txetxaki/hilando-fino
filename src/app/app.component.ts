import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { AnalyticsService } from './core/analytics/analytics.service';
import { SeoService } from './core/seo/seo.service';

@Component({
  selector: 'hf-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <a class="skip-link" href="#contenido">Saltar al contenido principal</a>
    <section class="draft-banner" aria-label="Aviso de vista previa pública">
      Vista previa pública no clínica: contenido en borrador, noindex, sin diagnóstico, triaje, urgencias ni envío real de contacto.
    </section>
    <header class="site-header" aria-label="Cabecera principal">
      <nav class="nav-shell" aria-label="Navegación principal">
        <a routerLink="/" class="brand" aria-label="Hilando Fino Psicología, inicio">
          <img src="logo.png" width="220" height="86" alt="Marta Martín · Hilando Fino Psicología" />
        </a>
        <div class="nav-links">
          <a routerLink="/sobre-mi" routerLinkActive="active">Sobre mí</a>
          <a routerLink="/como-trabajo" routerLinkActive="active">Cómo trabajo</a>
          <a routerLink="/areas-de-intervencion" routerLinkActive="active">Áreas</a>
          <a routerLink="/psicologia-ciudad-real" routerLinkActive="active">Ciudad Real</a>
          <a routerLink="/contacto" class="nav-cta">Contacto</a>
        </div>
      </nav>
    </header>

    <main id="contenido" tabindex="-1">
      <router-outlet />
    </main>

    <footer class="site-footer">
      <div>
        <strong>Hilando Fino Psicología</strong>
        <p>Web en modo borrador seguro hasta completar aprobación profesional, legal y de contenidos.</p>
      </div>
      <nav aria-label="Navegación legal">
        <a routerLink="/aviso-legal">Aviso legal</a>
        <a routerLink="/privacidad">Privacidad</a>
        <a routerLink="/cookies">Cookies</a>
      </nav>
    </footer>
  `
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.seo.applyForPath(event.urlAfterRedirects);
      this.analytics.track('page_view', { route: event.urlAfterRedirects });
    });
  }
}
