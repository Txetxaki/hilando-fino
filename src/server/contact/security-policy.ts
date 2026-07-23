export const contactSecurityPolicy = {
  /** Limit CSRF/contact attempts from one client to protect the disabled preview and future single-instance deployment from abuse. */
  requestsPerWindow: 20,
  /** One-minute windows keep accidental retries usable while bounding brute-force and token spray attempts. */
  windowMs: 60_000,
  /** Bound in-memory state because the preview intentionally avoids shared infra until live-contact approval exists. */
  maxTrackedClients: 1_000
} as const;
