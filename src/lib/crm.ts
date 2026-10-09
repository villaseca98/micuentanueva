// Envío del test al CRM de LeadsHunters, que valora el caso y lo reparte al despacho colaborador de la provincia.
import type { Answers } from "./questions";

export type Verdict = { kind: "apto" | "revisar" | "no_apto"; title: string; text: string };
export type Lead = {
  answers: Answers;
  full_name: string;
  phone: string;
  email?: string;
  province: string;
  marketing_ok: boolean;
  utm: Record<string, string>;
};

/** Cuerpo que espera POST /api/v1/particulares. El canal y la campaña salen de los utm del anuncio. */
export function crmPayload(l: Lead) {
  return {
    ...l.answers,
    full_name: l.full_name.trim(),
    phone: l.phone.trim(),
    email: l.email?.trim() || undefined,
    province: l.province,
    consent: true,
    marketing_ok: l.marketing_ok,
    canal: l.utm.utm_source || "web",
    campana: l.utm.utm_campaign || "web",
  };
}

export async function sendToCrm(l: Lead): Promise<{ ok: true; verdict: Verdict } | { ok: false; error: string }> {
  const url = process.env.CRM_API_URL?.replace(/\/$/, "");
  const key = process.env.CRM_API_KEY;
  if (!url || !key) {
    console.error("Faltan CRM_API_URL o CRM_API_KEY");
    return { ok: false, error: "No hemos podido guardar tus respuestas. Inténtalo de nuevo en un momento." };
  }
  const res = await fetch(`${url}/api/v1/particulares`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key },
    body: JSON.stringify(crmPayload(l)),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; resultado?: Verdict["kind"]; titulo?: string; texto?: string };
  if (!res.ok || !data.ok || !data.resultado) {
    // 422 trae un mensaje para la persona (teléfono no válido…); el resto es un fallo nuestro
    if (res.status === 422 && data.error) return { ok: false, error: data.error };
    console.error("CRM", res.status, data.error);
    return { ok: false, error: "No hemos podido guardar tus respuestas. Inténtalo de nuevo en un momento." };
  }
  return { ok: true, verdict: { kind: data.resultado, title: data.titulo ?? "", text: data.texto ?? "" } };
}
