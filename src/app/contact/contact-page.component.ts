import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AnalyticsService } from '../core/analytics/analytics.service';
import { ModalityPreference } from '../content/types';
import { contactFieldLimits, reasonCategoryLabels } from './contact.constants';

@Component({
  selector: 'hf-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <article class="page-shell contact-page">
      <nav class="breadcrumbs" aria-label="Migas de pan">
        <a routerLink="/">Inicio</a><span aria-hidden="true">/</span><span>Contacto</span>
      </nav>
      <header class="hero compact-hero">
        <p class="overline-pill">Un primer mensaje breve, práctico y respetuoso con tu privacidad</p>
        <h1>Contacto</h1>
        <p class="hero-copy">Cuéntame lo mínimo necesario para orientar tu consulta. No hace falta relatar historia clínica ni compartir detalles íntimos en este primer contacto.</p>
      </header>

      <section class="emergency-boundary" aria-labelledby="emergency-title">
        <h2 id="emergency-title">Este formulario no es un servicio de urgencias</h2>
        <p>Si existe riesgo inmediato o una urgencia, usa los servicios de emergencia disponibles en tu zona. Esta web no hace diagnóstico, triaje ni intervención en crisis.</p>
      </section>

      <form class="contact-form" [formGroup]="form" (ngSubmit)="submit()" aria-describedby="contact-status privacy-note">
        <div class="field-pair">
          <label>Nombre <input formControlName="name" autocomplete="name" /></label>
          <label>Preferencia de contacto
            <select formControlName="preferredContact">
              <option value="email">Email</option>
              <option value="phone">Teléfono</option>
            </select>
          </label>
        </div>
        <div class="field-pair">
          <label>Email <input formControlName="email" type="email" autocomplete="email" /></label>
          <label>Teléfono <input formControlName="phone" autocomplete="tel" /></label>
        </div>
        <div class="field-pair">
          <label>Modalidad preferida
            <select formControlName="modalityPreference" (change)="trackModality()">
              <option value="in-person-ciudad-real">Presencial en Ciudad Real</option>
              <option value="unsure">No lo sé todavía</option>
            </select>
          </label>
          <label>Encaje con Ciudad Real
            <select formControlName="ciudadRealFit">
              <option value="yes">Me interesa Ciudad Real</option>
              <option value="unsure">Necesito consultarlo</option>
              <option value="no">No busco Ciudad Real</option>
            </select>
          </label>
        </div>
        <label>Motivo amplio
          <select formControlName="reasonCategory">
            @for (category of categories; track category[0]) {
              <option [value]="category[0]">{{ category[1] }}</option>
            }
          </select>
        </label>
        <label>Mensaje práctico opcional
          <textarea formControlName="message" rows="4" aria-describedby="message-help"></textarea>
        </label>
        <p id="message-help" class="form-help">Evita incluir historia clínica o datos sensibles. Es suficiente indicar cómo prefieres que te respondan.</p>
        <label class="checkbox-row">
          <input type="checkbox" formControlName="privacyConsent" />
          <span>He leído la información de privacidad y acepto que se use este mensaje para responder a mi consulta.</span>
        </label>
        <input type="hidden" formControlName="csrfToken" />
        <input class="honeypot" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />

        @if (form.invalid && submitted) {
          <p class="error-summary" role="alert">Revisa los campos obligatorios antes de enviar.</p>
        }
        <p id="privacy-note">Consulta las rutas de <a routerLink="/privacidad">privacidad</a>, <a routerLink="/aviso-legal">aviso legal</a> y <a routerLink="/cookies">cookies</a>.</p>
        <button class="button primary" type="submit">Enviar solicitud</button>
        <p id="contact-status" role="status">{{ statusMessage }}</p>
      </form>

      <aside class="related-block" aria-labelledby="contact-related-title">
        <p class="eyebrow">Antes de escribir</p>
        <h2 id="contact-related-title">Quizá te ayude leer primero</h2>
        <div class="related-list">
          <a routerLink="/como-trabajo"><strong>Cómo trabajo</strong><span>Evaluación, vínculo, enfoque integrador y herramientas como EMDR.</span></a>
          <a routerLink="/psicologia-ciudad-real"><strong>Psicología Ciudad Real</strong><span>Cómo elegir psicóloga y qué mirar antes de iniciar un proceso.</span></a>
          <a routerLink="/areas-de-intervencion"><strong>Áreas de intervención</strong><span>Infancia, adolescencia, adultos, orientación educativa, trauma y talleres.</span></a>
        </div>
      </aside>
    </article>
  `
})
export class ContactPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly analytics = inject(AnalyticsService);
  readonly categories = Object.entries(reasonCategoryLabels);
  submitted = false;
  statusMessage = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(contactFieldLimits.name)]],
    email: ['', [Validators.email, Validators.maxLength(contactFieldLimits.email)]],
    phone: ['', [Validators.maxLength(contactFieldLimits.phone)]],
    preferredContact: this.fb.nonNullable.control<'email' | 'phone'>('email'),
    modalityPreference: this.fb.nonNullable.control<ModalityPreference>('in-person-ciudad-real'),
    ciudadRealFit: this.fb.nonNullable.control<'yes' | 'no' | 'unsure'>('yes'),
    reasonCategory: this.fb.nonNullable.control('general'),
    message: ['', [Validators.maxLength(contactFieldLimits.message)]],
    privacyConsent: this.fb.nonNullable.control(false, Validators.requiredTrue),
    csrfToken: [''],
    website: ['']
  });

  constructor() {
    const modality = this.route.snapshot.queryParamMap.get('modalidad');
    if (modality === 'in-person-ciudad-real' || modality === 'unsure') {
      this.form.controls.modalityPreference.setValue(modality);
    }
  }

  trackModality(): void {
    this.analytics.track('modality_preference_selected', { modality: this.form.controls.modalityPreference.value });
  }

  submit(): void {
    this.submitted = true;
    this.analytics.track('contact_form_start', { route: '/contacto' });
    if (this.form.invalid) {
      this.analytics.track('contact_submit_failure', { validationOutcome: 'invalid' });
      this.statusMessage = 'Revisa los campos señalados y vuelve a intentarlo.';
      return;
    }
    this.analytics.track('contact_submit_failure', { validationOutcome: 'provider-disabled' });
    this.statusMessage = 'Todavía no puedo recibir tu mensaje desde aquí. Vuelve a visitar esta página más adelante.';
  }
}
