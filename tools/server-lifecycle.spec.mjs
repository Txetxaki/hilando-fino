import { createServer } from 'node:http';

import { afterEach, describe, expect, it } from 'vitest';

import { healthIdentityForToken, waitForServer } from './server-lifecycle.mjs';

describe('server lifecycle health identity', () => {
  let server;

  afterEach(async () => {
    if (!server?.listening) return;
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  });

  it('rejects an HTTP 2xx health endpoint with mismatched HMAC identity', async () => {
    const url = await startHealthServer({ ok: true, identity: healthIdentityForToken('other-instance') });

    await expect(waitForServer(url, { expectedToken: 'expected-instance', timeoutMs: 80, pollIntervalMs: 5 })).rejects.toThrow(
      'Health endpoint responded from a different server instance.'
    );
  });

  it('accepts an HTTP 2xx health endpoint with matching HMAC identity', async () => {
    const expectedToken = 'expected-instance';
    const url = await startHealthServer({ ok: true, identity: healthIdentityForToken(expectedToken) });

    await expect(waitForServer(url, { expectedToken, timeoutMs: 80, pollIntervalMs: 5 })).resolves.toBeUndefined();
  });

  async function startHealthServer(payload) {
    server = createServer((_req, response) => {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify(payload));
    });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    return `http://127.0.0.1:${address.port}/__healthz`;
  }
});
