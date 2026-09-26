import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';

const source = readFileSync(new URL('../supabase/functions/process-alerts/index.ts', import.meta.url), 'utf8')
  .replace(/^import .*$/m, '');
const js = stripTypeScriptTypes(source);

function setup(secret, alerts = []) {
  let handler, dbCalls = 0, sends = 0, updates = 0;
  const context = {
    Request, Response, console: { log() {}, error() {} },
    Deno: { env: { get: key => key === 'CRON_SECRET' ? secret : undefined }, serve: fn => { handler = fn; } },
    fetch: async () => { sends++; throw new Error('Unexpected live request'); },
    createClient: () => {
      dbCalls++;
      return { from: table => ({
        select: () => table === 'user_alerts'
          ? { order: async () => ({ data: alerts }) }
          : Promise.resolve({ data: [{ protocol_slug: 'demo', chain: 'demo', apy: 5, protocol_name: 'Demo' }] }),
        update: () => { updates++; return { eq: async () => ({}) }; },
      }) };
    },
  };
  vm.runInNewContext(js, context);
  return { run: (method, authorization) => handler(new Request('https://example.test', {
    method, headers: authorization ? { Authorization: authorization } : {},
  })), counts: () => ({ dbCalls, sends, updates }) };
}

for (const [label, method, secret, header, status] of [
  ['missing configuration', 'POST', undefined, undefined, 503],
  ['blank configuration', 'POST', ' ', undefined, 503],
  ['missing bearer', 'POST', 'test-only', undefined, 401],
  ['wrong bearer', 'POST', 'test-only', 'Bearer wrong', 401],
  ['wrong method', 'GET', 'test-only', 'Bearer test-only', 405],
]) test(label + ' blocks all side effects', async () => {
  const app = setup(secret);
  assert.equal((await app.run(method, header)).status, status);
  assert.deepEqual(app.counts(), { dbCalls: 0, sends: 0, updates: 0 });
});

test('authorized scheduler reaches database', async () => {
  const app = setup('test-only');
  assert.equal((await app.run('POST', 'Bearer test-only')).status, 200);
  assert.equal(app.counts().dbCalls, 1);
});

test('missing email configuration never records delivery', async () => {
  const app = setup('test-only', [{ id: 'fictional', email: 'demo@example.test',
    protocol_slug: 'demo', chain: 'demo', condition: 'ABOVE', threshold: 1, last_sent_at: null }]);
  const response = await app.run('POST', 'Bearer test-only');
  assert.equal((await response.json()).sent, 0);
  assert.deepEqual(app.counts(), { dbCalls: 1, sends: 0, updates: 0 });
});
