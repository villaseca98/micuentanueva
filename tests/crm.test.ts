import { test } from "node:test";
import assert from "node:assert/strict";
import { crmPayload } from "../src/lib/crm";
import { QUESTIONS, validAnswers, type Answers } from "../src/lib/questions";

const answers: Answers = {
  debt: "22000", creditors: "3", can_pay: "no", public_debt: "nada", special_debt: "ninguna",
  income: "1250", employment: "asalariado", home: "no", blockers: "ninguna",
};

test("el envío al CRM lleva las respuestas, el consentimiento y el canal del anuncio", () => {
  const p = crmPayload({ answers, full_name: " Ana ", phone: "600 000 000", province: "Madrid", marketing_ok: false, utm: { utm_source: "meta", utm_campaign: "otoño" } });
  assert.equal(p.debt, "22000");
  assert.equal(p.full_name, "Ana");
  assert.equal(p.consent, true);
  assert.equal(p.canal, "meta");
  assert.equal(p.campana, "otoño");
  assert.equal(p.email, undefined);
});

test("sin utm el canal es la web", () => {
  const p = crmPayload({ answers, full_name: "Ana", phone: "600000000", province: "Madrid", marketing_ok: true, utm: {} });
  assert.equal(p.canal, "web");
});

test("valida que estén todas las respuestas y sean opciones del test", () => {
  assert.equal(validAnswers(answers), true);
  assert.equal(validAnswers({ ...answers, debt: "1" }), false);
  assert.equal(validAnswers({ ...answers, home: undefined }), false);
  assert.equal(QUESTIONS.length, 9);
});
