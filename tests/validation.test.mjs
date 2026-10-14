import test from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry } from "../src/data/validation.ts";
import { salonConfig, launchState, whatsappUrl } from "../src/data/salon.ts";
import {
  categories,
  services,
  servicePrice,
  unpublishedAdditionalServices,
} from "../src/data/services.ts";
const valid = {
  kind: "priority",
  name: "Test Guest",
  mobile: "+971 50 123 4567",
  email: "test@example.com",
  service: "Signature Haircut",
  consent: true,
};
test("accepts valid priority and appointment requests", () => {
  assert.deepEqual(validateEnquiry(valid), {});
  assert.deepEqual(
    validateEnquiry({
      ...valid,
      kind: "appointment",
      date: "2027-01-10",
      time: "morning",
    }),
    {},
  );
});
test("rejects empty fields and missing consent", () => {
  const e = validateEnquiry({});
  for (const key of ["kind", "name", "mobile", "email", "service", "consent"])
    assert.ok(e[key]);
});
test("rejects malformed email, phone, date and oversized notes", () => {
  const e = validateEnquiry({
    ...valid,
    email: "test@",
    mobile: "abc",
    date: "tomorrow",
    notes: "x".repeat(2001),
  });
  for (const key of ["email", "mobile", "date", "notes"]) assert.ok(e[key]);
});
test("rejects non-string payload values", () => {
  const e = validateEnquiry({
    ...valid,
    name: 123,
    mobile: {},
    email: [],
    service: 400,
  });
  for (const key of ["name", "mobile", "email", "service"]) assert.ok(e[key]);
});
test("catalogue has valid category references and unique IDs", () => {
  assert.equal(new Set(services.map((s) => s.id)).size, services.length);
  for (const c of categories)
    assert.ok(services.some((s) => s.category === c.id));
  for (const s of services) {
    assert.ok(categories.some((c) => c.id === s.category));
    assert.equal(s.confirmed, false);
    assert.equal(servicePrice(s), "Price on request");
  }
});
test("countdown requires a confirmed exact date and respects booking mode", () => {
  const previousDate = salonConfig.launchDate;
  const previousBooking = salonConfig.bookingEnabled;
  try {
    salonConfig.launchDate = "";
    assert.equal(launchState(0).showCountdown, false);
    salonConfig.launchDate = "not a date";
    assert.equal(launchState(0).showCountdown, false);
    salonConfig.launchDate = "2027-01-20T10:00:00+04:00";
    assert.equal(
      launchState(Date.parse(salonConfig.launchDate) - 1000).showCountdown,
      true,
    );
    assert.equal(
      launchState(Date.parse(salonConfig.launchDate) + 1000).showCountdown,
      false,
    );
    salonConfig.bookingEnabled = true;
    assert.deepEqual(launchState(0), {
      prelaunch: false,
      showCountdown: false,
    });
  } finally {
    salonConfig.launchDate = previousDate;
    salonConfig.bookingEnabled = previousBooking;
  }
});
test("WhatsApp is disabled without number and encodes service enquiries", () => {
  const previous = salonConfig.whatsapp;
  try {
    salonConfig.whatsapp = "";
    assert.equal(whatsappUrl("Hair & beard"), null);
    salonConfig.whatsapp = "+971 50 000 0000";
    const url = new URL(whatsappUrl("Hair & beard"));
    assert.equal(url.pathname, "/971500000000");
    assert.ok(url.searchParams.get("text").includes("Hair & beard"));
  } finally {
    salonConfig.whatsapp = previous;
  }
});
test("rejects nonexistent and unavailable appointment dates", () => {
  assert.ok(validateEnquiry({ ...valid, date: "2027-02-30" }).date);
  assert.ok(
    validateEnquiry({ ...valid, date: "2026-12-25" }, "2027-01-01").date,
  );
  assert.equal(
    validateEnquiry({ ...valid, date: "2027-01-02" }, "2027-01-01").date,
    undefined,
  );
});

test("validates UAE mobile formats and multiple selected services", () => {
  for (const mobile of ["0501234567", "+971501234567", "00971501234567"])
    assert.equal(validateEnquiry({ ...valid, mobile }).mobile, undefined);
  assert.ok(validateEnquiry({ ...valid, mobile: "+12025550123" }).mobile);
  assert.deepEqual(
    validateEnquiry({
      ...valid,
      services: ["Haircuts & Styling", "Beard Grooming"],
    }),
    {},
  );
  assert.ok(
    validateEnquiry({ ...valid, services: Array(9).fill("Beard Grooming") })
      .service,
  );
  assert.ok(validateEnquiry({ ...valid, services: [123] }).service);
});
test("only confirmed prices appear", () => {
  assert.equal(
    servicePrice({ ...services[0], price: 150, confirmed: false }),
    "Price on request",
  );
  assert.equal(
    servicePrice({ ...services[0], price: 150, confirmed: true }),
    "AED 150",
  );
});

test("unconfirmed additional grooming stays out of the customer catalogue", () => {
  assert.equal(unpublishedAdditionalServices.length, 4);
  for (const item of unpublishedAdditionalServices) {
    assert.equal(item.published, false);
    assert.equal(item.confirmed, false);
    assert.ok(!services.some((service) => service.name === item.name));
  }
  assert.equal(services.length, 30);
});
