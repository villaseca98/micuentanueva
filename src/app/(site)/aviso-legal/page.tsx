import type { Metadata } from "next";
import { LegalText } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Aviso legal" };

export default function AvisoLegal() {
  const s = site();
  return (
    <LegalText title="Aviso legal">
      <h2>Titular de la web</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI), el titular de esta
        web y de la marca {s.brand} es <strong className="font-medium">{s.holder}</strong>
        {s.email && <>, con email de contacto <a className="underline" href={`mailto:${s.email}`}>{s.email}</a></>}
        {s.phone && <> y teléfono {s.phone}</>}.
      </p>
      <h2>Qué es {s.brand}</h2>
      <p>
        {s.brand} es un servicio de información y de puesta en contacto. No es un despacho de abogados y no presta asesoramiento jurídico. Cuando una persona
        lo pide y da su consentimiento, sus datos se comunican a un despacho de abogados colegiados colaborador, que es quien estudia el caso, le informa de
        sus honorarios y, si se contrata, lo lleva ante el juzgado.
      </p>
      <h2>Información de la web</h2>
      <p>
        Los contenidos explican de forma general la Ley de Segunda Oportunidad (Texto Refundido de la Ley Concursal, reformado por la Ley 16/2022) y la
        jurisprudencia citada en cada página. Se revisan periódicamente, pero no sustituyen al estudio de cada caso por un abogado. El resultado del test es
        orientativo: la cancelación de deudas depende de cumplir los requisitos legales y de la decisión del juez.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>Los textos, el diseño y la marca de esta web pertenecen a su titular. No se pueden copiar con fines comerciales sin permiso.</p>
      <h2>Ley aplicable</h2>
      <p>Esta web se rige por la ley española. Si eres consumidor, puedes acudir a los juzgados de tu domicilio.</p>
    </LegalText>
  );
}
