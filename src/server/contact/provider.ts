import { createTransport, type Transporter } from 'nodemailer';

import { ciudadRealFitLabels, modalityPreferenceLabels, preferredContactLabels, reasonCategoryLabels } from '../../app/contact/contact.constants';
import { ContactRequest } from '../../app/contact/contact.types';
import { practiceIdentity } from '../../app/content/practice-identity';

/** Implicit TLS submission port. Anything else is treated as STARTTLS unless `CONTACT_SMTP_SECURE` says otherwise. */
const implicitTlsPort = 465;
const minPasswordLength = 8;
/** Values that only ever appear in an example env file. Accepting one would silently ship a broken mailbox. */
const placeholderPasswordPattern = /^(replace|change|placeholder|example|todo|your|xxx)/i;
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
  to: string;
}

export interface ContactMailMessage {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export interface ContactProvider {
  readonly kind: 'disabled' | 'smtp';
  send(request: ContactRequest): Promise<void>;
}

export class DisabledContactProvider implements ContactProvider {
  readonly kind = 'disabled';

  async send(): Promise<void> {
    throw new Error('Contact provider disabled: SMTP credentials are missing or incomplete.');
  }
}

export class SmtpContactProvider implements ContactProvider {
  readonly kind = 'smtp';
  private transporter: Transporter | null = null;

  constructor(private readonly config: SmtpConfig) {}

  async send(request: ContactRequest): Promise<void> {
    this.transporter ??= createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
      // On a STARTTLS port, refuse to continue if the server will not upgrade the connection.
      requireTLS: !this.config.secure,
      auth: { user: this.config.user, pass: this.config.password },
      tls: { minVersion: 'TLSv1.2', servername: this.config.host },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000
    });

    await this.transporter.sendMail(buildContactEmail(request, this.config));
  }
}

export function createContactProvider(env: NodeJS.ProcessEnv = process.env): ContactProvider {
  const config = readSmtpConfig(env);
  return config ? new SmtpContactProvider(config) : new DisabledContactProvider();
}

/**
 * Returns null instead of a partial config: a half-configured mailbox would accept
 * submissions and drop them, which is worse than staying visibly disabled.
 */
export function readSmtpConfig(env: NodeJS.ProcessEnv = process.env): SmtpConfig | null {
  const host = value(env['CONTACT_SMTP_HOST']);
  const user = value(env['CONTACT_SMTP_USER']);
  const password = value(env['CONTACT_SMTP_PASSWORD']);
  const to = value(env['CONTACT_SMTP_TO']);
  if (!host || !user || !password || !to) return null;
  if (password.length < minPasswordLength || placeholderPasswordPattern.test(password)) return null;

  const port = Number(value(env['CONTACT_SMTP_PORT']) || implicitTlsPort);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) return null;

  const explicitSecure = value(env['CONTACT_SMTP_SECURE']);
  return {
    host,
    port,
    secure: explicitSecure ? explicitSecure === 'true' : port === implicitTlsPort,
    user,
    password,
    from: value(env['CONTACT_SMTP_FROM']) || user,
    to
  };
}

/**
 * The envelope sender stays the authenticated mailbox so SPF/DKIM alignment holds;
 * the visitor address only ever reaches `Reply-To`, and only when it is header-safe.
 */
export function buildContactEmail(request: ContactRequest, config: SmtpConfig): ContactMailMessage {
  const visitorEmail = safeAddress(request.email);
  const lines = [
    `Nueva solicitud desde el formulario de contacto de ${practiceIdentity.brandName}.`,
    '',
    `Nombre: ${singleLine(request.name)}`,
    `Prefiere respuesta por: ${preferredContactLabels[request.preferredContact]}`,
    `Email: ${singleLine(request.email) || '—'}`,
    `Teléfono: ${singleLine(request.phone) || '—'}`,
    `Modalidad preferida: ${modalityPreferenceLabels[request.modalityPreference]}`,
    `Encaje con Ciudad Real: ${ciudadRealFitLabels[request.ciudadRealFit]}`,
    `Motivo amplio: ${reasonCategoryLabels[request.reasonCategory]}`,
    '',
    'Mensaje:',
    request.message?.trim() || '(sin mensaje)',
    '',
    '—',
    visitorEmail
      ? 'Responde a este correo para contestar directamente a la persona.'
      : 'Esta persona no dejó email: contáctala por teléfono.'
  ];

  return {
    from: `${practiceIdentity.brandName} <${config.from}>`,
    to: config.to,
    ...(visitorEmail ? { replyTo: visitorEmail } : {}),
    subject: `[${practiceIdentity.brandName}] Nueva solicitud de contacto — ${reasonCategoryLabels[request.reasonCategory]}`,
    text: lines.join('\n')
  };
}

function value(raw: string | undefined): string {
  return typeof raw === 'string' ? raw.trim() : '';
}

/** Body text is not a header, but a pasted newline would still break the line-per-field layout. */
function singleLine(raw: string | undefined): string {
  return value(raw).replace(/[\r\n\t]+/g, ' ');
}

function safeAddress(raw: string | undefined): string | undefined {
  const candidate = value(raw);
  return emailPattern.test(candidate) ? candidate : undefined;
}
