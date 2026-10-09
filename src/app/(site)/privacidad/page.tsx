import type { Metadata } from "next";
import { LegalText } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function Privacidad() {
  const s = site();
  return (
    <LegalText title="Política de privacidad">
      <h2>Quién trata tus datos</h2>
      <p>{s.holder}{s.email ? ` · ${s.email}` : ""}, que opera la marca {s.brand}. Es el responsable del tratamiento.</p>
      <h2>Qué datos</h2>
      <p>Los que nos das en el test: nombre, teléfono, email si lo pones, provincia y tus respuestas sobre tus deudas, ingresos y situación. No te pedimos datos de salud ni documentos.</p>
      <h2>Para qué</h2>
      <p>
        Para valorar de forma orientativa si tu caso puede encajar en la Ley de Segunda Oportunidad, llamarte para comentarlo y, si encaja y nos das permiso,
        comunicar tus datos a un despacho de abogados colaborador de tu provincia para que estudie tu caso. Si marcas la casilla opcional, también para
        enviarte avisos y consejos sobre deudas por WhatsApp. El resultado del test no es una decisión sobre ti: solo ordena las llamadas, y quien valora tu
        caso es un abogado.
      </p>
      <h2>Con qué base legal</h2>
      <p>
        Tu consentimiento (art. 6.1.a del Reglamento General de Protección de Datos), que das al marcar la casilla del test. Puedes retirarlo cuando quieras
        sin que afecte a lo hecho antes. Solo te llamamos porque nos lo pides (art. 66.1.b de la Ley 11/2022 General de Telecomunicaciones).
      </p>
      <h2>A quién se comunican</h2>
      <p>
        Al despacho de abogados colaborador que atiende tu provincia, solo para estudiar tu caso; el despacho pasa a ser responsable de los datos que use para
        ello y te informará al contactarte. También los tratan, por cuenta nuestra y con contrato, los proveedores técnicos que alojan la web y la base de
        datos. Algunos pueden estar fuera del Espacio Económico Europeo; en ese caso, con las garantías que exige el Reglamento (Marco de Privacidad de Datos
        UE-EE. UU. o cláusulas contractuales tipo). No vendemos tus datos ni los usamos para otra cosa.
      </p>
      <h2>Cuánto tiempo</h2>
      <p>
        Mientras estudiamos tu caso y, como máximo, 12 meses desde que hiciste el test, salvo que pidas antes que los borremos. Después los bloqueamos solo el
        tiempo que obliga la ley para atender posibles reclamaciones.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes pedir acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {s.email || "nuestro email de contacto"}. Si crees que
        no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
      </p>
    </LegalText>
  );
}
