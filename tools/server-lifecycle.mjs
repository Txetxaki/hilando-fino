import { spawn } from 'node:child_process';
import { createHmac, randomUUID } from 'node:crypto';
import { createServer } from 'node:net';

export function npmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

export async function getAvailablePort(host = '127.0.0.1') {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, host, () => {
      const address = server.address();
      server.close(() => {
        if (address && typeof address === 'object') resolve(address.port);
        else reject(new Error('Could not reserve a local port.'));
      });
    });
  });
}

export async function runCommand(command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: options.cwd ?? process.cwd(),
    env: { ...process.env, ...options.env },
    shell: false,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  child.stdout.on('data', (chunk) => process.stdout.write(chunk));
  child.stderr.on('data', (chunk) => process.stderr.write(chunk));

  const timeout = options.timeoutMs
    ? setTimeout(() => child.kill('SIGTERM'), options.timeoutMs)
    : null;

  try {
    const exitCode = await new Promise((resolve, reject) => {
      child.once('error', reject);
      child.once('close', resolve);
    });
    if (exitCode !== 0) {
      throw new Error(`${options.label ?? command} exited with code ${exitCode}`);
    }
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function buildPrerenderedApp({ baseHref = '/', siteUrl = 'https://pending-domain.invalid', configuration = 'production' } = {}) {
  await runCommand(process.execPath, ['--import', 'tsx', 'tools/generate-sitemap.ts'], {
    label: 'sitemap generation',
    env: { HILANDO_FINO_SITE_URL: siteUrl }
  });

  const buildArgs = ['node_modules/@angular/cli/bin/ng.js', 'build', '--configuration', configuration];
  if (configuration === 'pages') {
    buildArgs.push(
      '--define',
      `__HILANDO_FINO_SITE_URL__=${JSON.stringify(siteUrl)}`,
      '--define',
      `__HILANDO_FINO_BASE_HREF__=${JSON.stringify(baseHref)}`
    );
  }
  if (baseHref !== '/') {
    buildArgs.push('--base-href', baseHref, '--deploy-url', baseHref);
  }

  await runCommand(process.execPath, buildArgs, {
    label: 'Angular prerender build',
    env: { HILANDO_FINO_SITE_URL: siteUrl }
  });
}

export function startBuiltServer({ port, host = '127.0.0.1', env = {} }) {
  const expectedToken = randomUUID();
  const child = spawn(process.execPath, ['dist/hilando-fino/server/server.mjs'], {
    env: {
      ...process.env,
      PORT: String(port),
      HOST: host,
      CONTACT_ENABLED: 'false',
      EXPECTED_SERVER_TOKEN: expectedToken,
      ...env
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  child.stdout.on('data', (chunk) => process.stdout.write(chunk));
  child.stderr.on('data', (chunk) => process.stderr.write(chunk));
  child.expectedServerToken = expectedToken;
  return child;
}

export async function waitForServer(url, { timeoutMs = 120_000, child = null, expectedToken = child?.expectedServerToken, pollIntervalMs = 500 } = {}) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    if (child && (child.exitCode !== null || child.signalCode)) {
      throw new Error(`Server process exited before readiness (code=${child.exitCode ?? 'null'}, signal=${child.signalCode ?? 'null'}).`);
    }
    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.ok) {
        if (!expectedToken) return;
        const body = await response.json();
        const expectedIdentity = healthIdentityForToken(expectedToken);
        if (body?.identity === expectedIdentity) return;
        lastError = new Error('Health endpoint responded from a different server instance.');
      } else {
        lastError = new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, Math.max(1, pollIntervalMs)));
  }
  throw new Error(`Server did not become ready at ${url}: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

export function healthIdentityForToken(token) {
  return createHmac('sha256', token).update('hilando-fino-health-v1').digest('base64url');
}

export async function stopChild(child) {
  if (!child || child.exitCode !== null || child.signalCode) return;
  child.kill('SIGTERM');
  const exited = await Promise.race([
    new Promise((resolve) => child.once('close', resolve)),
    new Promise((resolve) => setTimeout(resolve, 5_000, 'timeout'))
  ]);
  if (exited === 'timeout' && child.exitCode === null && !child.signalCode) {
    child.kill('SIGKILL');
    await Promise.race([
      new Promise((resolve) => child.once('close', resolve)),
      new Promise((resolve) => setTimeout(resolve, 2_000, 'timeout'))
    ]);
  }
}
