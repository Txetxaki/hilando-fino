import { RequestHandler } from 'express';

import { getCsrfConfig, issueCsrfToken, verifyCsrfSubmission } from './csrf';
import { createContactProvider, readSmtpConfig, type ContactProvider } from './provider';
import { InMemoryRateLimiter } from './rate-limit';
import { contactSecurityPolicy } from './security-policy';
import { redactedContactLog, validateContactRequest } from './validation';

const limiter = new InMemoryRateLimiter(contactSecurityPolicy.requestsPerWindow, contactSecurityPolicy.windowMs, contactSecurityPolicy.maxTrackedClients);
const csrfLimiter = new InMemoryRateLimiter(contactSecurityPolicy.requestsPerWindow, contactSecurityPolicy.windowMs, contactSecurityPolicy.maxTrackedClients);

export function clearContactRateLimiters(): void {
  limiter.clear();
  csrfLimiter.clear();
}

export function validateLiveContactDeployment(env: NodeJS.ProcessEnv = process.env): string[] {
  if (env['CONTACT_ENABLED'] !== 'true') return [];
  const errors: string[] = [];
  if (env['CONTACT_RETENTION_APPROVED'] !== 'true') errors.push('retention_not_approved');
  if (env['CONTACT_RUNTIME_APPROVED'] !== 'true') errors.push('runtime_not_approved');
  if (env['CONTACT_DEPLOYMENT_MODE'] !== 'single-instance') errors.push('single_instance_deployment_required');
  if (!env['CONTACT_PUBLIC_ORIGIN']?.startsWith('https://')) errors.push('https_public_origin_required');
  if (env['CONTACT_TRUST_PROXY'] !== 'true') errors.push('trusted_proxy_required');
  if (env['CONTACT_PROVIDER'] !== 'approved-email') errors.push('approved_provider_required');
  try {
    const config = getCsrfConfig(env);
    if (!config.secureCookie) errors.push('secure_cookie_required');
  } catch {
    errors.push('csrf_config_invalid');
  }
  return errors;
}

/**
 * Read-only summary of why live contact is or is not accepting mail, for the boot log.
 * It reports reason codes only, never values, and never changes what the gate allows —
 * `validateLiveContactDeployment` stays the single authority for that.
 */
export function contactReadiness(env: NodeJS.ProcessEnv = process.env): { ready: boolean; blockedBy: string[] } {
  if (env['CONTACT_ENABLED'] !== 'true') return { ready: false, blockedBy: ['contact_not_enabled'] };
  const blockedBy = [...validateLiveContactDeployment(env), ...(readSmtpConfig(env) ? [] : ['smtp_config_incomplete'])];
  return { ready: blockedBy.length === 0, blockedBy };
}

export function csrfTokenHandler(): RequestHandler {
  return (req, res) => {
    const rate = csrfLimiter.check(req.ip ?? 'unknown');
    if (!rate.allowed) {
      res.status(429).json({ ok: false, message: 'Demasiados intentos. Inténtalo más tarde.' });
      return;
    }
    try {
      const issued = issueCsrfToken();
      res.setHeader('Set-Cookie', issued.cookie);
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json({ ok: true, csrfToken: issued.token, expiresAt: issued.expiresAt });
    } catch {
      res.status(503).json({ ok: false, message: 'El formulario todavía no está activado.' });
    }
  };
}

export function contactHandler(): RequestHandler {
  // Resolved on first accepted submission so a disabled deployment never builds an SMTP
  // transport, and so credentials injected after module load are still picked up.
  let provider: ContactProvider | null = null;
  return async (req, res) => {
    const deploymentErrors = validateLiveContactDeployment();
    if (deploymentErrors.length > 0) {
      console.error('contact_live_deployment_blocked', { reasons: deploymentErrors });
      res.status(503).json({ ok: false, message: 'El formulario todavía no está activado.' });
      return;
    }

    const rate = limiter.check(req.ip ?? 'unknown');
    if (!rate.allowed) {
      res.status(429).json({ ok: false, message: 'Demasiados intentos. Inténtalo más tarde.' });
      return;
    }

    const csrfOk = verifyCsrfSubmission({ token: req.body?.csrfToken, cookieHeader: req.headers.cookie });
    if (!csrfOk) {
      res.status(403).json({ ok: false, message: 'La sesión del formulario ha caducado. Recarga la página e inténtalo de nuevo.' });
      return;
    }

    const result = validateContactRequest(req.body);
    console.info('contact_attempt', redactedContactLog(result));
    if (!result.ok || !result.safeRequest) {
      res.status(400).json({ ok: false, message: 'Revisa los campos del formulario.' });
      return;
    }

    if (process.env['CONTACT_ENABLED'] !== 'true') {
      res.status(503).json({ ok: false, message: 'El formulario todavía no está activado.' });
      return;
    }

    provider ??= createContactProvider();
    try {
      await provider.send(result.safeRequest);
      res.status(202).json({ ok: true, message: 'Solicitud recibida.' });
    } catch {
      // `provider: 'disabled'` means the SMTP credentials never resolved; anything else is a real delivery failure.
      console.error('contact_provider_failure', { provider: provider.kind, reasonCategory: result.safeRequest.reasonCategory, modalityPreference: result.safeRequest.modalityPreference });
      res.status(503).json({ ok: false, message: 'No se ha podido enviar ahora mismo.' });
    }
  };
}
