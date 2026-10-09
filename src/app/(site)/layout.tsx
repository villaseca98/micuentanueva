import { Footer, Header } from "@/components/ui";
import { site } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const s = site();
  return (
    <>
      <Header brand={s.brand} />
      <main className="mx-auto max-w-6xl px-5 pt-8 md:pt-12">{children}</main>
      <Footer s={s} />
    </>
  );
}
