import { createNodeRequestHandler } from '@angular/ssr/node';

import { createHilandoFinoApp } from './src/server/app';

export const app = createHilandoFinoApp();

if (process.env['NODE_ENV'] !== 'test') {
  const port = Number(process.env['PORT'] ?? 4000);
  const host = process.env['HOST'] ?? '127.0.0.1';
  app.listen(port, host, () => {
    console.info(`Hilando Fino static-prerender server listening on http://${host}:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
