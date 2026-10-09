// Test "¿Puedo cancelar mis deudas?". Es la página a la que llevan los anuncios.
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { PROVINCES, QUESTIONS } from "@/lib/questions";
import { consentText, site } from "@/lib/site";
import { TestForm } from "./TestForm";

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = site();
  return {
    title: { absolute: `¿Puedo cancelar mis deudas? Test gratuito · ${brand}` },
    description: "Responde unas preguntas y descubre en 2 minutos si tu caso encaja con la Ley de Segunda Oportunidad.",
  };
}

export default async function TestPage(props: PageProps<"/test">) {
  const sp = await props.searchParams;
  const utm = Object.fromEntries(
    Object.entries(sp).filter(([k, v]) => typeof v === "string" && /^utm_|^fbclid$|^gclid$/.test(k)) as [string, string][],
  );
  const s = site();
  const privacyNote = `Responsable: ${s.holder}. Finalidad: valorar tu caso y contactarte. Base: tu consentimiento. Destinatario: el despacho de abogados colaborador de tu provincia. Puedes ejercer tus derechos de acceso, rectificación, supresión y demás${s.email ? ` en ${s.email}` : ""} y reclamar ante la AEPD.`;
  return (
    <main className="min-h-dvh px-5" style={{ paddingTop: "calc(1.25rem + env(safe-area-inset-top, 0px))", paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))" }}>
      <div className="mx-auto w-full max-w-xl">
        <Logo brand={s.brand} />
        <TestForm questions={QUESTIONS} provinces={PROVINCES} consentText={consentText(s.brand)} utm={utm} privacyNote={privacyNote} />
        <p className="mt-10 text-center text-xs leading-relaxed text-muted-400">
          Resultado orientativo y gratuito. No es asesoramiento legal: lo revisa un abogado colegiado de un despacho colaborador y la decisión final es del juez.
          <br />
          {s.brand} no es un despacho de abogados. <Link href="/privacidad" className="underline">Política de privacidad</Link> ·{" "}
          <Link href="/aviso-legal" className="underline">Aviso legal</Link>
        </p>
      </div>
    </main>
  );
}
