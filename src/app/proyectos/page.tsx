import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Gallery from "@/components/Gallery";
import { getAllItems } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Proyectos — Portfolio en Formosa",
  description: "Portfolio de portones automáticos, frentes modernos, rejas, postigones, montacargas y estructuras metálicas fabricados e instalados en Formosa.",
  alternates: { canonical: "/proyectos" },
};

export default async function Proyectos() {
  const items = await getAllItems();
  return (
    <>
      <Nav home={false} />
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Portfolio</span>
          <h1>Nuestros<br /><span className="acc">Proyectos</span></h1>
          <p>Trabajos reales fabricados e instalados por nuestro equipo en Formosa. Filtrá por categoría y tocá cualquiera para ver el detalle, fotos y videos.</p>
        </div>
      </section>
      <section className="portfolio-grid">
        <div className="wrap"><Gallery items={items} showFilters layout="all" /></div>
      </section>
      <Footer />
      <WaFloat />
    </>
  );
}
