// Datos de la marca y del titular legal. Salen de variables de entorno (ver .env.example).
export type Site = { brand: string; holder: string; email: string; phone: string };

export function site(): Site {
  const brand = process.env.BRAND_NAME?.trim() || "Mi Cuenta Nueva";
  return {
    brand,
    holder: process.env.LEGAL_HOLDER?.trim() || "Leads Hunters",
    email: process.env.CONTACT_EMAIL?.trim() || "",
    phone: process.env.CONTACT_PHONE?.trim() || "",
  };
}

export const consentText = (brand: string) =>
  `Acepto la política de privacidad y que ${brand} y un despacho de abogados colaborador de mi provincia me contacten por teléfono, WhatsApp o email para estudiar mi caso.`;
