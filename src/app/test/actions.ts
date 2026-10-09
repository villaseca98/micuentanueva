"use server";
import { sendToCrm, type Lead } from "@/lib/crm";
import { validAnswers } from "@/lib/questions";

type Input = Omit<Lead, "answers"> & { answers: Partial<Lead["answers"]>; consent: boolean; website?: string };

export async function submitTest(input: Input) {
  // Campo trampa: solo lo rellenan los bots
  if (input.website) return { ok: true as const, verdict: { kind: "revisar" as const, title: "Gracias", text: "Te llamaremos pronto." } };
  if (!input.consent) return { ok: false as const, error: "Para enviarte el resultado necesitamos que aceptes la política de privacidad." };
  if (!validAnswers(input.answers)) return { ok: false as const, error: "Falta alguna respuesta. Vuelve atrás y revísalas." };
  if (!input.full_name.trim() || input.phone.replace(/\D/g, "").length < 9) {
    return { ok: false as const, error: "Revisa tu nombre y tu teléfono." };
  }
  try {
    return await sendToCrm({ ...input, answers: input.answers });
  } catch (e) {
    console.error("test", e);
    return { ok: false as const, error: "No hemos podido guardar tus respuestas. Inténtalo de nuevo en un momento." };
  }
}
