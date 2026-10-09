import type { Metadata } from "next";
import { Closing, Hero, Kicker, Panel, PanelTitle, Sources } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cómo funciona la Ley de Segunda Oportunidad",
  description: "Los dos caminos para cancelar deudas, con liquidación de bienes o con plan de pagos, cuánto tarda y qué pasa después.",
};

const TIMES = [
  ["6-12 meses", "Orientativo, sin bienes y sin oposición de los acreedores. Más en los juzgados con más carga."],
  ["12-24 meses", "Orientativo, si hay bienes que vender. Con plan de pagos, súmale los 3 o 5 años del plan."],
];

export default function ComoFunciona() {
  return (
    <>
      <Hero
        kicker="Proceso"
        title="Cómo funciona"
        intro="Es un procedimiento judicial: lo lleva un abogado con un procurador, los dos obligatorios, ante la sección de lo mercantil del tribunal de instancia de tu domicilio. Lo decide el juez. Hay dos caminos."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <Panel>
          <Kicker>Camino 1</Kicker>
          <h2 className="display mt-2 text-2xl font-medium">Con liquidación de bienes</h2>
          <p className="mt-3 leading-relaxed text-muted-600">
            Se venden los bienes que se puedan embargar y se cancela lo que quede por pagar. Si no tienes bienes que cubran los gastos, el proceso es más
            corto (“concurso sin masa”): los acreedores que sumen al menos el 5 % de la deuda tienen 15 días para pedir que un administrador lo investigue.
            Si nadie lo pide, o si no encuentra nada, se puede pedir la cancelación directamente. El juez revisa tu buena fe igualmente.
          </p>
        </Panel>
        <Panel>
          <Kicker>Camino 2</Kicker>
          <h2 className="display mt-2 text-2xl font-medium">Con plan de pagos</h2>
          <p className="mt-3 leading-relaxed text-muted-600">
            Conservas tus bienes, por ejemplo tu casa, y pagas una parte de tus deudas durante <strong className="font-medium">3 años</strong>, o{" "}
            <strong className="font-medium">5 años</strong> si conservas tu vivienda habitual o si los pagos dependen sobre todo de tus ingresos. Durante el plan
            la cancelación es provisional; al terminarlo, es definitiva.
          </p>
        </Panel>
      </div>
      <Panel tone="accent" className="mt-4">
        <PanelTitle>¿Cuánto tarda?</PanelTitle>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          {TIMES.map(([n, d]) => (
            <div key={n}>
              <div className="display tabular text-4xl font-medium text-accent">{n}</div>
              <p className="mt-2 leading-relaxed text-muted-600">{d}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel className="mt-4">
        <PanelTitle>Después de la cancelación</PanelTitle>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted-700">
          <li>Los acreedores de las deudas canceladas ya no pueden reclamártelas.</li>
          <li>Durante <strong className="font-medium">3 años</strong> se puede revocar si aparecen bienes o ingresos ocultos, si mejoras mucho por una herencia, donación o premio, o si llega una condena o sanción firme que estaba en trámite.</li>
          <li>Si eliges plan de pagos y no lo cumples, se puede revocar.</li>
          <li>El juez ordena a los acreedores que comuniquen la cancelación a los ficheros de morosos para que actualicen tus datos.</li>
          <li>Las resoluciones del concurso se inscriben en el Registro Público Concursal.</li>
        </ul>
      </Panel>
      <Sources>art. 6, arts. 37 bis-37 quinquies, 492 ter, 493 y 495-502 del Texto Refundido de la Ley Concursal, en la redacción de la Ley 16/2022.</Sources>
      <Closing />
    </>
  );
}
