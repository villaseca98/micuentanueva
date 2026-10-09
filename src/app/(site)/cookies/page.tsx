import type { Metadata } from "next";
import { LegalText } from "@/components/ui";

export const metadata: Metadata = { title: "Política de cookies" };

// Si se añade analítica o el píxel de Meta, hace falta un banner con Aceptar / Rechazar / Configurar al mismo nivel
// y no cargarlos antes del consentimiento (art. 22.2 LSSI y Guía sobre el uso de cookies de la AEPD).
export default function Cookies() {
  return (
    <LegalText title="Política de cookies">
      <p>Esta web no usa cookies de publicidad ni de analítica, ni propias ni de terceros. Por eso no te mostramos ningún aviso para aceptarlas.</p>
      <h2>Qué usamos</h2>
      <p>
        Solo los elementos técnicos imprescindibles para que la web funcione y para enviar el test de forma segura. Están exentos de consentimiento según el
        artículo 22.2 de la Ley 34/2002 (LSSI).
      </p>
      <h2>Si esto cambia</h2>
      <p>
        Si en el futuro añadimos cookies de analítica o publicidad, te pediremos permiso antes de usarlas, con opciones para aceptarlas, rechazarlas o
        configurarlas, y actualizaremos esta página.
      </p>
    </LegalText>
  );
}
