const assert = require("node:assert/strict");
const test = require("node:test");

process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role";
process.env.RESEND_API_KEY = "test-resend-key";

const handler = require("../api/data-deletion-confirm.js");

function requestFor(token) {
  const payload = Buffer.from(JSON.stringify({ token }));
  return {
    method: "POST",
    async *[Symbol.asyncIterator]() { yield payload; }
  };
}

function responseRecorder() {
  return {
    statusCode: 0,
    headers: {},
    body: "",
    setHeader(name, value) { this.headers[name] = value; },
    end(value) { this.body = String(value || ""); }
  };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

async function runConfirmation(scope) {
  const token = "a".repeat(64);
  const calls = [];
  const originalFetch = global.fetch;
  global.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), method: options.method, body: options.body });
    if (String(url).includes("data_deletion_requests?")) {
      return jsonResponse([{
        id: "11111111-1111-4111-8111-111111111111",
        email: "bee@example.com",
        scope,
        reason: "",
        status: "pending",
        expires_at: new Date(Date.now() + 60_000).toISOString(),
        verified_at: null,
        processed_at: null
      }]);
    }
    if (String(url).endsWith("/rest/v1/rpc/resolve_account_deletion_user_id")) {
      return jsonResponse("22222222-2222-4222-8222-222222222222");
    }
    return jsonResponse({});
  };

  try {
    const res = responseRecorder();
    await handler(requestFor(token), res);
    assert.equal(res.statusCode, 200);
    assert.equal(JSON.parse(res.body).ok, true);
    return calls;
  } finally {
    global.fetch = originalFetch;
  }
}

test("extension-only request uses the scoped RPC and never deletes Auth", async () => {
  const calls = await runConfirmation("data");
  assert.ok(calls.some((call) => call.url.endsWith("/rest/v1/rpc/delete_extension_account_data")));
  assert.ok(calls.some((call) => call.url.endsWith("/rest/v1/rpc/audit_extension_account_residue")));
  assert.ok(!calls.some((call) => call.url.includes("/auth/v1/admin/users/")));
  assert.ok(calls.some((call) => call.method === "PATCH" && String(call.body).includes('"status":"processed"')));
});

test("full account request deletes the shared Auth user and lets the database trigger purge both products", async () => {
  const calls = await runConfirmation("account");
  assert.ok(calls.some((call) => call.method === "DELETE" && call.url.includes("/auth/v1/admin/users/")));
  assert.ok(!calls.some((call) => call.url.endsWith("/rest/v1/rpc/delete_extension_account_data")));
  assert.ok(calls.some((call) => call.method === "PATCH" && String(call.body).includes('"status":"processed"')));
});

test("already processed links are idempotent", async () => {
  const token = "b".repeat(64);
  const calls = [];
  const originalFetch = global.fetch;
  global.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), method: options.method });
    return jsonResponse([{
      id: "11111111-1111-4111-8111-111111111111",
      email: "bee@example.com",
      scope: "account",
      status: "processed",
      expires_at: new Date(Date.now() - 60_000).toISOString(),
      verified_at: new Date().toISOString(),
      processed_at: new Date().toISOString()
    }]);
  };

  try {
    const res = responseRecorder();
    await handler(requestFor(token), res);
    assert.equal(res.statusCode, 200);
    assert.equal(JSON.parse(res.body).already_processed, true);
    assert.equal(calls.length, 1);
  } finally {
    global.fetch = originalFetch;
  }
});
