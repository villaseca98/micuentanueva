"use client";
import { useState, useTransition } from "react";
import type { Verdict } from "@/lib/crm";
import type { Answers, Question } from "@/lib/questions";
import { submitTest } from "./actions";

const input =
  "block h-13 w-full rounded-2xl border-0 bg-white px-4 text-base ring-1 ring-black/10 placeholder:text-muted-400 focus:ring-2 focus:ring-ink focus:outline-none";

const VERDICT_TONE: Record<Verdict["kind"], string> = {
  apto: "bg-accent text-white",
  revisar: "bg-warm text-ink",
  no_apto: "bg-ink text-white",
};

type Props = { questions: Question[]; provinces: string[]; consentText: string; utm: Record<string, string>; privacyNote: string };

export function TestForm({ questions, provinces, consentText, utm, privacyNote }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [error, setError] = useState("");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [pending, start] = useTransition();
  const total = questions.length + 1;

  if (verdict) {
    return (
      <section className="mt-8 space-y-4" aria-live="polite">
        <div className={`rounded-[2rem] p-7 ${VERDICT_TONE[verdict.kind]}`}>
          <div className="text-[12px] font-medium uppercase tracking-[0.14em] opacity-70">Tu resultado</div>
          <h1 className="display mt-3 text-[1.75rem] font-medium leading-tight">{verdict.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed opacity-90">{verdict.text}</p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 text-[15px] leading-relaxed text-muted-700 ring-1 ring-black/[0.06]">
          <div className="font-medium text-ink">¿Y ahora qué?</div>
          <p className="mt-1">Te llamaremos en unos minutos (de lunes a sábado, de 9 a 21 h) para revisar tu caso y, si encaja, que un abogado colegiado lo estudie contigo en una consulta gratuita.</p>
          <p className="mt-2 text-sm text-muted-500">Ten a mano un resumen de lo que debes y a quién.</p>
        </div>
      </section>
    );
  }

  const q = questions[step];
  const choose = (value: string) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    setStep((s) => s + 1);
  };

  const send = (fd: FormData) => {
    setError("");
    start(async () => {
      const r = await submitTest({
        answers,
        full_name: String(fd.get("full_name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        email: String(fd.get("email") ?? ""),
        province: String(fd.get("province") ?? ""),
        consent: fd.get("consent") === "1",
        marketing_ok: fd.get("marketing_ok") === "1",
        website: String(fd.get("website") ?? ""),
        utm,
      });
      if (r.ok) {
        setVerdict(r.verdict);
        window.scrollTo({ top: 0 });
      } else setError(r.error);
    });
  };

  return (
    <section className="mt-6">
      <div className="flex items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="grid size-9 shrink-0 place-items-center rounded-full bg-white ring-1 ring-black/10" aria-label="Atrás">
            ←
          </button>
        )}
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
          <div className="h-full rounded-full bg-ink transition-all" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
        <span className="tabular text-xs text-muted-500">{step + 1}/{total}</span>
      </div>

      {step === 0 && (
        <div className="mt-8">
          <h1 className="display text-[2rem] font-medium leading-tight">¿Puedes cancelar tus deudas?</h1>
          <p className="mt-2 text-[15px] text-muted-500">{questions.length} preguntas, 2 minutos. Gratis y sin compromiso.</p>
        </div>
      )}

      {q ? (
        <div className="mt-8">
          <h2 className="text-xl font-medium leading-snug">{q.title}</h2>
          {q.hint && <p className="mt-1 text-sm text-muted-500">{q.hint}</p>}
          <div className="mt-5 grid gap-2.5">
            {q.options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => choose(o.value)}
                className={`min-h-14 rounded-2xl bg-white px-5 text-left text-base ring-1 transition active:scale-[0.99] ${answers[q.id] === o.value ? "ring-2 ring-ink" : "ring-black/10 hover:ring-black/25"}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form action={send} className="mt-8 space-y-3">
          <h2 className="text-xl font-medium leading-snug">¿Dónde te enviamos el resultado?</h2>
          <p className="text-sm text-muted-500">Lo ves al momento y te llamamos para revisarlo contigo.</p>
          <input name="full_name" autoComplete="name" required placeholder="Nombre" className={input} />
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="Teléfono móvil" className={input} />
          <input name="email" type="email" autoComplete="email" placeholder="Email (opcional)" className={input} />
          <select name="province" required defaultValue="" className={input}>
            <option value="" disabled>Provincia</option>
            {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <label className="flex gap-3 rounded-2xl bg-white p-4 text-sm leading-snug text-muted-700 ring-1 ring-black/10">
            <input type="checkbox" name="consent" value="1" required className="mt-0.5 size-5 shrink-0 accent-[var(--color-ink)]" />
            <span>{consentText} <a href="/privacidad" target="_blank" className="underline">Ver política</a></span>
          </label>
          <label className="flex gap-3 px-1 text-sm leading-snug text-muted-500">
            <input type="checkbox" name="marketing_ok" value="1" className="mt-0.5 size-5 shrink-0 accent-[var(--color-ink)]" />
            <span>Quiero recibir avisos y consejos sobre mis deudas por WhatsApp (opcional).</span>
          </label>
          <p className="px-1 text-xs leading-relaxed text-muted-500">{privacyNote}</p>
          {error && <p className="rounded-2xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
          <button disabled={pending} className="h-14 w-full rounded-full bg-ink px-6 text-base font-medium text-white disabled:opacity-60">
            {pending ? "Calculando…" : "Ver mi resultado"}
          </button>
        </form>
      )}
    </section>
  );
}
