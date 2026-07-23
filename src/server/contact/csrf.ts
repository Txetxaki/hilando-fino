import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const CSRF_COOKIE_NAME = 'hf_csrf';
const defaultTtlMs = 30 * 60 * 1000;
const minSecretBytes = 32;
const minUniqueSecretBytes = 16;
const maxMostCommonByteFrequency = 12;
const maxRepeatedPatternLength = 16;
const defaultMaxIssuedTokens = 1_000;
const placeholderSecretPattern = /placeholder|replace|example|changeme|change-me|secret|password|test|dummy|sample|todo/i;

interface IssuedToken {
  expiresAt: number;
  used: boolean;
}

export interface CsrfConfig {
  secret: string;
  ttlMs: number;
  secureCookie: boolean;
  maxIssuedTokens: number;
}

export interface CsrfTokenIssue {
  token: string;
  cookie: string;
  expiresAt: number;
}

export interface CsrfVerificationInput {
  token?: unknown;
  cookieHeader?: string;
  env?: NodeJS.ProcessEnv;
  now?: number;
}

const issuedTokens = new Map<string, IssuedToken>();

export function getCsrfConfig(env: NodeJS.ProcessEnv = process.env): CsrfConfig {
  const secret = env['CONTACT_CSRF_SECRET'] ?? '';
  if (!isValidCsrfSecret(secret)) {
    throw new Error('CONTACT_CSRF_SECRET must use explicit random material: base64:<32+ random bytes> or hex:<64+ random hex characters>.');
  }

  const ttlSeconds = Number(env['CONTACT_CSRF_TTL_SECONDS'] ?? defaultTtlMs / 1000);
  const ttlMs = Number.isFinite(ttlSeconds) && ttlSeconds > 0 ? ttlSeconds * 1000 : defaultTtlMs;
  return {
    secret,
    ttlMs,
    secureCookie: contactCookiesMustBeSecure(env),
    maxIssuedTokens: positiveInteger(env['CONTACT_CSRF_MAX_TOKENS'], defaultMaxIssuedTokens)
  };
}

export function isValidCsrfSecret(secret: string): boolean {
  const value = secret.trim();
  if (!value || placeholderSecretPattern.test(value)) return false;

  if (value.startsWith('base64:')) {
    const encoded = value.slice('base64:'.length);
    if (!/^[A-Za-z0-9+/=_-]+$/.test(encoded)) return false;
    try {
      const normalized = encoded.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = Buffer.from(normalized, 'base64');
      return decoded.length >= minSecretBytes && hasDeploymentGuardEntropy(decoded);
    } catch {
      return false;
    }
  }

  if (value.startsWith('hex:')) {
    const encoded = value.slice('hex:'.length);
    if (encoded.length < minSecretBytes * 2 || !/^[a-f0-9]+$/i.test(encoded) || encoded.length % 2 !== 0) return false;
    return hasDeploymentGuardEntropy(Buffer.from(encoded, 'hex'));
  }

  return false;
}

export function issueCsrfToken(env: NodeJS.ProcessEnv = process.env, now = Date.now()): CsrfTokenIssue {
  const config = getCsrfConfig(env);
  pruneExpiredTokens(now, config.maxIssuedTokens);
  const nonce = randomBytes(32).toString('base64url');
  const expiresAt = now + config.ttlMs;
  const payload = `${nonce}.${expiresAt}`;
  const signature = sign(payload, config.secret);
  const token = `${payload}.${signature}`;
  issuedTokens.set(token, { expiresAt, used: false });
  pruneExpiredTokens(now, config.maxIssuedTokens);
  return {
    token,
    cookie: serializeCookie(token, Math.ceil(config.ttlMs / 1000), config.secureCookie),
    expiresAt
  };
}

export function verifyCsrfSubmission(input: CsrfVerificationInput): boolean {
  const now = input.now ?? Date.now();
  const config = safeConfig(input.env);
  pruneExpiredTokens(now, config?.maxIssuedTokens ?? defaultMaxIssuedTokens);
  const token = typeof input.token === 'string' ? input.token : '';
  const cookieToken = parseCookie(input.cookieHeader ?? '')[CSRF_COOKIE_NAME] ?? '';
  if (!token || !cookieToken || !safeEqual(token, cookieToken)) return false;

  if (!config) return false;

  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) return false;
  const [nonce, expiresRaw, signature] = tokenParts;
  if (!nonce || !expiresRaw || !signature) return false;
  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= now) return false;

  const expected = sign(`${nonce}.${expiresRaw}`, config.secret);
  if (!safeEqual(signature, expected)) return false;

  const issued = issuedTokens.get(token);
  if (!issued || issued.used || issued.expiresAt !== expiresAt) return false;
  issued.used = true;
  return true;
}

export function clearIssuedCsrfTokens(): void {
  issuedTokens.clear();
}

export function getIssuedCsrfTokenCount(): number {
  return issuedTokens.size;
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function serializeCookie(token: string, maxAgeSeconds: number, secure: boolean): string {
  const parts = [
    `${CSRF_COOKIE_NAME}=${encodeURIComponent(token)}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/api/contact',
    `Max-Age=${maxAgeSeconds}`
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

function parseCookie(header: string): Record<string, string> {
  return Object.fromEntries(
    header
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf('=');
        if (index === -1) return [part, ''];
        try {
          return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
        } catch {
          return [part.slice(0, index), ''];
        }
      })
  );
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

/**
 * Conservative deployment guard only: software cannot prove that secret material
 * was generated randomly. This rejects obviously trivial decoded material such as
 * all-zero bytes, repeated bytes, short repeated cycles, simple counters, and
 * very low unique-byte distribution before accepting 32+ decoded bytes.
 */
function hasDeploymentGuardEntropy(bytes: Buffer): boolean {
  const counts = new Map<number, number>();
  for (const byte of bytes) counts.set(byte, (counts.get(byte) ?? 0) + 1);

  const uniqueBytes = counts.size;
  const mostCommonFrequency = Math.max(...counts.values());
  if (uniqueBytes < minUniqueSecretBytes) return false;
  if (mostCommonFrequency > maxMostCommonByteFrequency) return false;
  if (isRepeatedShortPattern(bytes)) return false;
  if (isSimpleArithmeticPattern(bytes)) return false;
  return true;
}

function isRepeatedShortPattern(bytes: Buffer): boolean {
  for (let size = 1; size <= Math.min(maxRepeatedPatternLength, Math.floor(bytes.length / 2)); size += 1) {
    if (bytes.length % size !== 0) continue;
    let repeated = true;
    for (let index = size; index < bytes.length; index += 1) {
      if (bytes[index] !== bytes[index % size]) {
        repeated = false;
        break;
      }
    }
    if (repeated) return true;
  }
  return false;
}

function isSimpleArithmeticPattern(bytes: Buffer): boolean {
  if (bytes.length < minSecretBytes) return false;
  const delta = (bytes[1] - bytes[0] + 256) % 256;
  for (let index = 2; index < bytes.length; index += 1) {
    if (((bytes[index] - bytes[index - 1] + 256) % 256) !== delta) return false;
  }
  return true;
}

function pruneExpiredTokens(now: number, maxTokens = defaultMaxIssuedTokens): void {
  for (const [token, issued] of issuedTokens.entries()) {
    if (issued.expiresAt <= now || issued.used) issuedTokens.delete(token);
  }
  while (issuedTokens.size > maxTokens) {
    const oldest = issuedTokens.keys().next().value as string | undefined;
    if (!oldest) break;
    issuedTokens.delete(oldest);
  }
}

function safeConfig(env: NodeJS.ProcessEnv | undefined): CsrfConfig | null {
  try {
    return getCsrfConfig(env);
  } catch {
    return null;
  }
}

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function contactCookiesMustBeSecure(env: NodeJS.ProcessEnv): boolean {
  return env['CONTACT_COOKIE_SECURE'] === 'true' || env['CONTACT_PUBLIC_ORIGIN']?.startsWith('https://') === true || env['NODE_ENV'] === 'production';
}
