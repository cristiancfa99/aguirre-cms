import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Gallery from "@/components/Gallery";
import ProductGrid from "@/components/ProductGrid";
import ContactForm from "@/components/ContactForm";
import { Servicios, Proceso, Nosotros, Testimonios, Contacto } from "@/components/HomeSections";
import { getFeaturedItems, getProducts, getTestimonials } from "@/lib/queries";
import { waLink } from "@/lib/whatsapp";

// ISR: HTML cacheado y veloz; se regenera al editar en el panel (revalidatePath) o cada 5 min.
export const revalidate = 300;

const STRIP = ["Portones automáticos","Frentes modernos","Rejas a medida","Estructuras metálicas","Motorización PPA & SEG","Parrillas corredizas","Cerramientos"];

export default async function Home() {
  const [featured, products, testimonials] = await Promise.all([getFeaturedItems(), getProducts(), getTestimonials()]);
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
      <Nosotros />

      <section className="pad" id="proyectos" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Portfolio</span>
            <h2>Proyectos destacados.</h2>
            <p>Una selección de nuestros mejores trabajos reales fabricados e instalados. Tocá cualquiera para ver la ficha completa, fotos y videos.</p>
          </div>
          <Gallery items={featured} layout="featured" />
          <div className="featured-cta reveal">
            <span className="count">Más de 250 proyectos realizados en Formosa</span>
            <div className="cta-row">
              <a href="/proyectos" className="btn btn-primary btn-lg">Ver todos los proyectos →</a>
              <a href={waLink("Hola. Vi sus proyectos y quiero un trabajo similar. ¿Podemos coordinar un presupuesto?")} target="_blank" rel="noopener" className="btn btn-ghost btn-lg">Quiero un trabajo así</a>
            </div>
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
          <div className="band reveal">
            <span>¿No encontrás lo que buscás? Trabajamos con las mejores marcas del mercado.</span>
            <a href={waLink("Hola. Quiero consultar por un producto / motor para mi portón.")} target="_blank" rel="noopener" className="btn btn-primary">Consultar disponibilidad →</a>
          </div>
        </div>
      </section>

      <Proceso />
      <Testimonios items={testimonials} />
      <Contacto form={<ContactForm />} />
      <Footer />
      <WaFloat />
    </>
  );
}
