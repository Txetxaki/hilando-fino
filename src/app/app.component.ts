import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { AnalyticsService } from './core/analytics/analytics.service';
import { SeoService } from './core/seo/seo.service';
import { hubLabels } from './content/hub-labels';
import { mailtoHref, practiceIdentity, telHref } from './content/practice-identity';
import { parentHref, treatmentsForSector } from './content/treatment-index';
import type { TreatmentSector } from './content/treatment-types';

const areaLinks = [
  { label: hubLabels['children-families'], href: parentHref('children-families') },
  { label: hubLabels.adolescents, href: parentHref('adolescents') },
  { label: hubLabels.adults, href: parentHref('adults') },
  { label: hubLabels.perinatal, href: parentHref('perinatal') },
  { label: hubLabels['education-training'], href: parentHref('education-training') },
  { label: 'Trauma y duelo', href: '/psicologia-trauma-ciudad-real' },
  { label: 'Psicología en Ciudad Real', href: '/psicologia-ciudad-real' }
] as const;

const treatmentSectors: readonly TreatmentSector[] = ['children-families', 'adolescents', 'adults', 'perinatal', 'education-training'];

const sectorMenu: readonly { label: string; href: string; sector: TreatmentSector; children: readonly { label: string; href: string }[] }[] = treatmentSectors.map((sector) => ({
  label: hubLabels[sector],
  href: parentHref(sector),
  sector,
  children: treatmentsForSector(sector).map((page) => ({ label: page.h1, href: page.canonicalPath }))
}));

// Marta's own nav order (copy document, 2026-07-31): logo, inicio, sobre mí, cómo
// trabajo, áreas de intervención, talleres, contacto. `/psicologia-ciudad-real` is
// deliberately not a top-level item any more — it keeps its inbound links from the
// home, about, hub and treatment pages plus the footer, so the local SEO page loses
// no internal link equity while the header matches what she asked for.
const primaryLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Cómo trabajo', href: '/como-trabajo' },
  { label: 'Áreas de intervención', href: '/areas-de-intervencion' },
  { label: 'Talleres', href: '/talleres' },
  { label: 'Contacto', href: '/contacto' }
] as const;

@Component({
  selector: 'hf-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <a class="skip-link" href="#contenido">Saltar al contenido principal</a>
    <header class="site-header" aria-label="Cabecera principal">
      <nav class="nav-shell" aria-label="Navegación principal">
        <a routerLink="/" class="brand" aria-label="Hilando Fino Psicología, inicio" (click)="closeMenus()">
          <!-- The brand master logo.png is 3509x1412 and 278kB, but the header renders it at
               220x86 CSS px on every single page. Serving pre-scaled variants instead cuts
               ~214kB from every route. The sizes attribute mirrors the .brand img rule
               (width: min(13rem, 42vw)): 42vw wins below a 495px viewport, which is exactly
               where 42vw equals 13rem. -->
          <span class="brand-mark">
            <picture>
              <source
                type="image/webp"
                srcset="images/logo-220.webp 220w, images/logo-440.webp 440w, images/logo-660.webp 660w"
                sizes="(max-width: 495px) 42vw, 208px"
              />
              <img
                src="images/logo-440.png"
                srcset="images/logo-220.png 220w, images/logo-440.png 440w, images/logo-660.png 660w"
                sizes="(max-width: 495px) 42vw, 208px"
                width="220"
                height="86"
                alt="Marta Martín · Hilando Fino Psicología"
              /></picture>
          </span>
        </a>

        <button class="menu-toggle" type="button" [attr.aria-expanded]="mobileOpen()" aria-controls="primary-navigation" (click)="toggleMobile($event)">
          Menú
        </button>

        <div id="primary-navigation" class="nav-links" [class.open]="mobileOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenus()">Inicio</a>
          <a routerLink="/sobre-mi" routerLinkActive="active" (click)="closeMenus()">Sobre mí</a>
          <a routerLink="/como-trabajo" routerLinkActive="active" (click)="closeMenus()">Cómo trabajo</a>

          <div class="nav-dropdown" [class.open]="areasOpen()">
            <button
              class="dropdown-trigger"
              type="button"
              aria-controls="areas-menu"
              [attr.aria-expanded]="areasOpen()"
              [class.active]="isAreaRoute()"
              (click)="toggleAreas($event)"
              (keydown.arrowdown)="focusFirstAreaLink($event)"
            >
              Áreas de intervención
            </button>
            <div id="areas-menu" class="dropdown-panel">
              <a routerLink="/areas-de-intervencion" routerLinkActive="active" (click)="closeMenus()">Vista general</a>
              <div class="mega-grid" aria-label="Tratamientos por área">
              @for (sector of sectorMenu; track sector.href) {
                <section class="mega-sector">
                  <a class="mega-sector-title" [routerLink]="sector.href" routerLinkActive="active" (click)="closeMenus()">{{ sector.label }}</a>
                  @for (child of sector.children; track child.href) {
                    <a class="mega-child" [routerLink]="child.href" routerLinkActive="active" (click)="closeMenus()">{{ child.label }}</a>
                  }
                </section>
              }
              </div>
              <a routerLink="/psicologia-trauma-ciudad-real" routerLinkActive="active" (click)="closeMenus()">Trauma y duelo</a>
            </div>
          </div>

          <a routerLink="/talleres" routerLinkActive="active" (click)="closeMenus()">Talleres</a>
        </div>

        <a routerLink="/contacto" class="nav-cta" routerLinkActive="active" (click)="closeMenus()">Contacto</a>
      </nav>
    </header>

    <main id="contenido" tabindex="-1">
      <router-outlet />
    </main>

    <footer class="site-footer">
      <div class="footer-grid">
        <div class="footer-intro">
          <span class="footer-mark">
            <picture>
              <source
                type="image/webp"
                srcset="images/logo-220.webp 220w, images/logo-440.webp 440w, images/logo-660.webp 660w"
                sizes="72px"
              />
              <img
                src="images/logo-440.png"
                srcset="images/logo-220.png 220w, images/logo-440.png 440w, images/logo-660.png 660w"
                sizes="72px"
                width="220"
                height="86"
                alt="Marta Martín · Hilando Fino Psicología"
              /></picture>
          </span>
          <p class="footer-signature">{{ identity.practitionerName }} · {{ identity.professionalTitle }}</p>
          <p>Psicología en Ciudad Real con una mirada integradora, cercana y respetuosa con cada proceso.</p>
        </div>

        <div class="footer-contact">
          <h2>Contacto</h2>
          <address class="footer-nap">
            <a class="footer-contact-link" [href]="telHref">
              <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              {{ identity.phone }}
            </a>
            <a class="footer-contact-link" [href]="mailtoHref">
              <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              {{ identity.email }}
            </a>
            <span class="footer-subhead">Consulta</span>
            <span>{{ identity.address.streetAddress }}, {{ identity.address.addressLocality }}</span>
            <span class="footer-subhead">Acreditaciones</span>
            <span class="footer-registry">Col. {{ identity.collegiateNumber }} · Nº de Registro Sanitario {{ identity.healthRegistryNumber }}</span>
          </address>
        </div>

        <nav class="footer-nav" aria-label="Mapa del sitio">
          <div class="footer-nav-col">
            <h2>Web</h2>
            @for (link of primaryLinks; track link.href) {
              <a [routerLink]="link.href">{{ link.label }}</a>
            }
          </div>
          <div class="footer-nav-col">
            <h2>Áreas</h2>
            @for (link of areaLinks; track link.href) {
              <a [routerLink]="link.href">{{ link.label }}</a>
            }
          </div>
        </nav>
      </div>

      <div class="footer-bottom">
        <span>© {{ currentYear }} {{ identity.practitionerName }} - {{ identity.brandName }}. Todos los derechos reservados.</span>
        <nav class="footer-legal" aria-label="Legal">
          <a routerLink="/aviso-legal">Aviso legal</a>
          <a routerLink="/privacidad">Privacidad</a>
          <a routerLink="/cookies">Cookies</a>
        </nav>
      </div>
    </footer>
  `
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  readonly areaLinks = areaLinks;
  readonly sectorMenu = sectorMenu;
  readonly primaryLinks = primaryLinks;
  readonly identity = practiceIdentity;
  readonly telHref = telHref;
  readonly mailtoHref = mailtoHref;
  readonly currentYear = new Date().getFullYear();
  readonly mobileOpen = signal(false);
  readonly areasOpen = signal(false);
  readonly currentUrl = signal('/');

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentUrl.set(event.urlAfterRedirects.split('?')[0] || '/');
      this.seo.applyForPath(event.urlAfterRedirects);
      this.analytics.track('page_view', { route: event.urlAfterRedirects });
    });
  }

  @HostListener('document:keydown.escape')
  closeMenus(): void {
    this.mobileOpen.set(false);
    this.areasOpen.set(false);
    // The desktop mega-menu panel stays visually open via `.nav-dropdown:focus-within`
    // even after `areasOpen` flips to false, because SPA navigation does not blur the
    // clicked link. Blurring here lets the CSS focus fallback release the panel.
    const active = document.activeElement as HTMLElement | null;
    if (active?.closest('.nav-shell')) active.blur();
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement | null)?.closest('.nav-shell')) this.closeMenus();
  }

  toggleMobile(event: Event): void {
    event.stopPropagation();
    this.mobileOpen.update((value) => !value);
  }

  toggleAreas(event: Event): void {
    event.stopPropagation();
    this.areasOpen.update((value) => !value);
  }

  isAreaRoute(): boolean {
    return this.currentUrl().startsWith('/areas-de-intervencion') || this.currentUrl() === '/psicologia-trauma-ciudad-real';
  }

  focusFirstAreaLink(event: Event): void {
    event.preventDefault();
    this.areasOpen.set(true);
    setTimeout(() => document.querySelector<HTMLAnchorElement>('#areas-menu a')?.focus());
  }
}
