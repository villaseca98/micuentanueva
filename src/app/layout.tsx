import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./globals.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = site();
  return {
    title: { default: `${brand} · Ley de Segunda Oportunidad sin letra pequeña`, template: `%s · ${brand}` },
    description: "Comprueba si tu caso encaja con la Ley de Segunda Oportunidad: qué deudas se pueden cancelar, cuáles no y qué requisitos pide la ley.",
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#fafaf8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh font-sans antialiased">{children}</body>
    </html>
  );
}
