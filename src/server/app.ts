import { existsSync } from 'node:fs';
import { createHmac } from 'node:crypto';
import { join } from 'node:path';

import express from 'express';

import { contactFieldLimits } from '../app/contact/contact.constants';
import { renderNotFoundHtml } from '../app/content/not-found';
import { knownPrerenderedPaths } from '../app/content/public-routes';
import { contactHandler, csrfTokenHandler } from './contact/handler';
import { siteConfig } from '../environments/site-config';

export function createHilandoFinoApp(): express.Express {
  const app = express();
  const browserDist = join(process.cwd(), 'dist', 'hilando-fino', 'browser');
  const siteUrl = process.env['HILANDO_FINO_SITE_URL'] ?? siteConfig.siteUrl;
  const baseHref = process.env['HILANDO_FINO_BASE_HREF'] ?? siteConfig.baseHref;
  const knownPrerenderedRoutes = new Set(knownPrerenderedPaths);

  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });
  app.use(express.json({ limit: contactFieldLimits.jsonBytes }));
  app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (isBodyParserError(error, 'entity.too.large')) {
      res.status(413).json({ ok: false, message: 'La solicitud es demasiado grande.' });
      return;
    }

    if (isBodyParserError(error, 'entity.parse.failed') || error instanceof SyntaxError) {
      res.status(400).json({ ok: false, message: 'JSON mal formado.' });
      return;
    }
    next(error);
  });
  app.get('/__healthz', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(createHealthPayload(process.env['EXPECTED_SERVER_TOKEN']));
  });
  app.get('/api/contact/csrf', csrfTokenHandler());
  app.post('/api/contact', contactHandler());
  app.use(express.static(browserDist, { index: false, maxAge: '1h', immutable: true }));

  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      next();
      return;
    }

    const routePath = normalizeRoutePath(req.path);
    if (routePath && knownPrerenderedRoutes.has(routePath)) {
      const routeIndex = routePath === '/' ? join(browserDist, 'index.html') : join(browserDist, routePath.slice(1), 'index.html');
      if (existsSync(routeIndex)) {
        res.setHeader('Cache-Control', 'no-store');
        if (siteConfig.draftNoindex) res.setHeader('X-Robots-Tag', 'noindex, nofollow');
        res.sendFile(routeIndex);
        return;
      }

      res.status(500).type('text/plain').send('Prerendered route file is missing.');
      return;
    }

    res
      .status(404)
      .setHeader('Cache-Control', 'no-store')
      .setHeader('X-Robots-Tag', 'noindex, nofollow')
      .type('html')
      .send(renderNotFoundHtml({ siteUrl, baseHref }));
  });

  return app;
}

export function createHealthPayload(expectedServerToken: string | undefined): { ok: true; identity?: string } {
  if (!expectedServerToken) return { ok: true };
  return {
    ok: true,
    identity: createHmac('sha256', expectedServerToken).update('hilando-fino-health-v1').digest('base64url')
  };
}

function isBodyParserError(error: unknown, type: string): boolean {
  return typeof error === 'object' && error !== null && 'type' in error && (error as { type?: unknown }).type === type;
}

function normalizeRoutePath(path: string): string | null {
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');
  if (!normalized.startsWith('/') || normalized.includes('..')) return null;
  return normalized || '/';
}
