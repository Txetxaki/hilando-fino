import { createNodeRequestHandler } from '@angular/ssr/node';

import { createHilandoFinoApp } from './src/server/app';
import { contactReadiness } from './src/server/contact/handler';

export const app = createHilandoFinoApp();

if (process.env['NODE_ENV'] !== 'test') {
  const port = Number(process.env['PORT'] ?? 4000);
  const host = process.env['HOST'] ?? '127.0.0.1';
  app.listen(port, host, () => {
    console.info(`Hilando Fino static-prerender server listening on http://${host}:${port}`);
    // Printed once at boot because the alternative is discovering a misconfiguration only
    // when a visitor's message is already lost. Reason codes only, never values.
    console.info('contact_readiness', contactReadiness());
  });
}

export const reqHandler = createNodeRequestHandler(app);
