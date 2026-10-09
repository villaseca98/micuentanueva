# Mi Cuenta Nueva

Web de Mi Cuenta Nueva: información sobre la Ley de Segunda Oportunidad (España) y el test "¿Puedo cancelar mis deudas?".

- Next.js 16 + Tailwind 4, sin base de datos propia.
- El test envía cada respuesta al CRM de LeadsHunters (`POST /api/v1/particulares`), que valora el caso, devuelve el resultado y lo reparte al despacho colaborador de la provincia.
- Ningún texto promete resultados: cancelar deudas depende de los requisitos legales y de la decisión del juez.

## Variables de entorno

Copia `.env.example` en `.env.local` (o en Vercel, Settings → Environment Variables):

| Variable | Para qué |
| --- | --- |
| `CRM_API_URL` | URL del CRM, p. ej. `https://leadshunters-nrfo.vercel.app` |
| `CRM_API_KEY` | La clave de n8n de Ajustes del CRM |
| `BRAND_NAME` | Nombre de la marca (por defecto, Mi Cuenta Nueva) |
| `LEGAL_HOLDER` | Razón social, CIF y domicilio del titular (aviso legal y privacidad) |
| `CONTACT_EMAIL`, `CONTACT_PHONE` | Contacto que sale en el pie y en las páginas legales |

## Desarrollo

```bash
npm install
npm run dev
npm test && npm run lint && npm run typecheck
```
