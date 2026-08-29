import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AnalyticsService } from '../core/analytics/analytics.service';
import { mailtoHref, practiceIdentity } from '../content/practice-identity';
import { contactSubmissionMessages, submitContactRequest, type ContactSubmissionStatus } from './contact-submission';
import {
  approvedContactModalities,
  ciudadRealFitLabels,
  ciudadRealFitOptions,
  contactFieldLimits,
  modalityPreferenceLabels,
  preferredContactLabels,
  preferredContactOptions,
  reasonCategoryLabels
} from './contact.constants';
import type { CiudadRealFit, ContactRequest, PreferredContact, ReasonCategory } from './contact.types';

type ApprovedModality = (typeof approvedContactModalities)[number];

@Component({
  selector: 'hf-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <article class="page-shell contact-page">
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
              @for (option of preferredContactChoices; track option) {
                <option [value]="option">{{ preferredContactLabels[option] }}</option>
              }
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
              @for (option of modalityChoices; track option) {
                <option [value]="option">{{ modalityPreferenceLabels[option] }}</option>
              }
            </select>
          </label>
          <label>Encaje con Ciudad Real
            <select formControlName="ciudadRealFit">
              @for (option of ciudadRealFitChoices; track option) {
                <option [value]="option">{{ ciudadRealFitLabels[option] }}</option>
              }
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
        <input class="honeypot" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />

        @if (form.invalid && submitted()) {
          <p class="error-summary" role="alert">Revisa los campos obligatorios antes de enviar.</p>
        }
        <p id="privacy-note">Consulta las rutas de <a routerLink="/privacidad">privacidad</a>, <a routerLink="/aviso-legal">aviso legal</a> y <a routerLink="/cookies">cookies</a>.</p>
        <button class="button primary" type="submit" [disabled]="sending()">{{ sending() ? 'Enviando…' : 'Enviar solicitud' }}</button>
        <p id="contact-status" role="status">{{ statusMessage() }}</p>
        @if (status() === 'unavailable') {
          <p class="contact-fallback"><a [href]="mailtoHref">{{ practiceEmail }}</a></p>
        }
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

  readonly categories = Object.entries(reasonCategoryLabels) as [ReasonCategory, string][];
  /** The server approves only a subset of modalities, so the select is built from that list instead of every modality the site talks about. */
  readonly modalityChoices = approvedContactModalities;
  readonly preferredContactChoices = preferredContactOptions;
  readonly ciudadRealFitChoices = ciudadRealFitOptions;
  readonly modalityPreferenceLabels = modalityPreferenceLabels;
  readonly preferredContactLabels = preferredContactLabels;
  readonly ciudadRealFitLabels = ciudadRealFitLabels;
  readonly mailtoHref = mailtoHref;
  readonly practiceEmail = practiceIdentity.email;

  readonly submitted = signal(false);
  readonly sending = signal(false);
  readonly status = signal<ContactSubmissionStatus | 'idle'>('idle');
  readonly statusMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(contactFieldLimits.name)]],
    email: ['', [Validators.email, Validators.maxLength(contactFieldLimits.email)]],
    phone: ['', [Validators.maxLength(contactFieldLimits.phone)]],
    preferredContact: this.fb.nonNullable.control<PreferredContact>('email'),
    modalityPreference: this.fb.nonNullable.control<ApprovedModality>('in-person-ciudad-real'),
    ciudadRealFit: this.fb.nonNullable.control<CiudadRealFit>('yes'),
    reasonCategory: this.fb.nonNullable.control<ReasonCategory>('general'),
    message: ['', [Validators.maxLength(contactFieldLimits.message)]],
    privacyConsent: this.fb.nonNullable.control(false, Validators.requiredTrue),
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

  async submit(): Promise<void> {
    if (this.sending()) return;
    this.submitted.set(true);
    this.analytics.track('contact_form_start', { route: '/contacto' });

    if (this.form.invalid) {
      this.analytics.track('contact_submit_failure', { validationOutcome: 'invalid' });
      this.status.set('rejected');
      this.statusMessage.set(contactSubmissionMessages.invalid);
      return;
    }

    this.sending.set(true);
    this.statusMessage.set('Enviando tu solicitud…');
    try {
      const result = await submitContactRequest(this.toContactRequest(), { fetch: globalThis.fetch.bind(globalThis) });
      this.status.set(result.status);
      this.statusMessage.set(result.message);
      if (result.status === 'sent') {
        this.analytics.track('contact_submit_success', { route: '/contacto', validationOutcome: 'valid' });
        this.resetAfterSuccess();
        return;
      }
      this.analytics.track('contact_submit_failure', {
        validationOutcome: result.status === 'rejected' ? 'invalid' : 'provider-disabled'
      });
    } finally {
      this.sending.set(false);
    }
  }

  private toContactRequest(): ContactRequest {
    const raw = this.form.getRawValue();
    return {
      name: raw.name,
      email: raw.email || undefined,
      phone: raw.phone || undefined,
      preferredContact: raw.preferredContact,
      modalityPreference: raw.modalityPreference,
      ciudadRealFit: raw.ciudadRealFit,
      reasonCategory: raw.reasonCategory,
      message: raw.message || undefined,
      privacyConsent: true,
      website: raw.website
    };
  }

  private resetAfterSuccess(): void {
    const modality = this.form.controls.modalityPreference.value;
    this.form.reset();
    this.form.controls.modalityPreference.setValue(modality);
    this.submitted.set(false);
  }
}
