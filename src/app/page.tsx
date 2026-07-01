import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Gallery from "@/components/Gallery";
import ProductGrid from "@/components/ProductGrid";
import ContactForm from "@/components/ContactForm";
import { Servicios, Proceso, Nosotros, Contacto } from "@/components/HomeSections";
import { getFeaturedItems, getProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

const STRIP = ["Portones automáticos","Frentes modernos","Rejas a medida","Estructuras metálicas","Motorización PPA & SEG","Parrillas corredizas","Cerramientos"];

export default async function Home() {
  const [featured, products] = await Promise.all([getFeaturedItems(), getProducts()]);
  return (
    <>
      <Nav home />
      <Hero />
      <div className="strip" aria-hidden="true">
        <div className="track">
          {[...STRIP, ...STRIP].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      <Servicios />

      <section className="pad" id="proyectos" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Portfolio</span>
            <h2>Proyectos destacados.</h2>
            <p>Una selección de trabajos reales fabricados e instalados por nuestro equipo. Tocá cualquiera para verlo en detalle.</p>
          </div>
          <Gallery items={featured} layout="featured" />
          <div className="featured-cta reveal">
            <span className="count">Más de 250 proyectos realizados en Formosa</span>
            <a href="/proyectos" className="btn btn-primary btn-lg">Ver todos los proyectos →</a>
          </div>
        </div>
      </section>

      <section className="pad" id="productos">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Venta de productos</span>
            <h2>Motorización, cámaras<br />y accesorios.</h2>
            <p>Además de fabricar, vendemos e instalamos los componentes para automatizar y proteger tu acceso. Consultá disponibilidad y precio por WhatsApp.</p>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>

      <Proceso />
      <Nosotros />
      <Contacto form={<ContactForm />} />
      <Footer />
      <WaFloat />
    </>
  );
}
