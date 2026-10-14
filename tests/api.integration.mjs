import test from "node:test";
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const valid = {
  kind: "priority",
  name: "Test Guest",
  mobile: "+971 50 123 4567",
  email: "preview@example.com",
  service: "Signature Haircut",
  consent: true,
};
let i = 0;
const post = (body, headers = {}) =>
  fetch(`${base}/api/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: base,
      "x-forwarded-for": `test-${i++}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });
test("both customer pages return 200", async () => {
  for (const route of ["/", "/services"])
    assert.equal((await fetch(base + route)).status, 200);
});
test("server rejects malformed input with field errors", async () => {
  const r = await post({});
  assert.equal(r.status, 422);
  const d = await r.json();
  assert.ok(d.errors.email);
  assert.ok(d.errors.consent);
});
test("server rejects cross-origin submissions", async () => {
  assert.equal(
    (await post(valid, { Origin: "https://unrelated.example" })).status,
    403,
  );
});
test("honeypot rejects automated submissions", async () => {
  assert.equal((await post({ ...valid, website: "spam" })).status, 400);
});
test("backend status is explicit", async () => {
  const r = await post(valid);
  if (process.env.TEST_WEBHOOK_ENABLED === "1") {
    assert.equal(r.status, 200);
    assert.match((await r.json()).message, /received/);
  } else {
    assert.equal(r.status, 503);
    assert.match((await r.json()).error, /not been sent or saved/);
  }
});
test("rate limit rejects sixth request within a minute", async () => {
  for (let n = 0; n < 5; n++)
    assert.notEqual(
      (await post({}, { "x-forwarded-for": "rate-test" })).status,
      429,
    );
  assert.equal(
    (await post({}, { "x-forwarded-for": "rate-test" })).status,
    429,
  );
});
test("server accepts multiple-service structure and rejects oversized selections", async () => {
  const body = {
    ...valid,
    service: "Beard Trim, Classic Shave",
    services: ["Beard Trim", "Classic Shave"],
  };
  const good = await post(body);
  assert.equal(
    good.status,
    process.env.TEST_WEBHOOK_ENABLED === "1" ? 200 : 503,
  );
  assert.equal(
    (await post({ ...body, services: Array(9).fill("Beard Grooming") })).status,
    422,
  );
});
test("server requires a valid UAE mobile", async () => {
  const r = await post({ ...valid, mobile: "+12025550123" });
  assert.equal(r.status, 422);
  assert.ok((await r.json()).errors.mobile);
});
