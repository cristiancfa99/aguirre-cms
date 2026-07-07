import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import { getProductBySlug } from "@/lib/queries";
import { SITE, waLink } from "@/lib/whatsapp";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Producto no encontrado" };
  const title = `${p.name}${p.brand ? " · " + p.brand : ""}`;
  const desc = p.description || `${p.name} — consultá disponibilidad y precio en Aguirre Automatizaciones, Formosa.`;
  return {
    title, description: desc.slice(0, 155),
    alternates: { canonical: `/productos/${p.slug}` },
    openGraph: { title, description: desc, images: p.thumbnail ? [p.thumbnail] : [] },
    twitter: { card: "summary_large_image", title, description: desc, images: p.thumbnail ? [p.thumbnail] : [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();
  const specs = (p.specs || null) as Record<string, string> | null;
  const consulta = waLink(`Hola Aguirre Automatizaciones! Quiero consultar por ${p.name}${p.brand ? " (" + p.brand + ")" : ""}. ¿Precio y disponibilidad?`);
  const ld = {
    "@context": "https://schema.org", "@type": "Product",
    name: p.name, description: p.description, brand: p.brand || undefined,
    image: p.thumbnail || `${SITE}/assets/img/hero-poster.webp`,
    category: p.category, url: `${SITE}/productos/${p.slug}`,
  };
  return (
    <>
      <Nav home={false} />
      <section className="prod-detail pad">
        <div className="wrap">
          <nav className="crumbs"><Link href="/">Inicio</Link> / <Link href="/#productos">Productos</Link> / <span>{p.name}</span></nav>
          <div className="pd-grid">
            <div className="pd-media">
              {p.thumbnail
                ? <img src={p.thumbnail} alt={p.name + (p.brand ? " " + p.brand : "")} />
                : <div className="pd-noimg"><span>{p.brand || p.category}</span><small>{p.name}</small></div>}
              {p.imageSource && <a className="pd-source" href={p.imageSource} target="_blank" rel="noopener">Imagen de referencia del fabricante</a>}
            </div>
            <div className="pd-info">
              {p.brand && <span className="eyebrow">{p.brand}</span>}
              <h1>{p.name}</h1>
              <p className="pd-desc">{p.description}</p>
              {p.features.length > 0 && (
                <ul className="pd-features">
                  {p.features.map((f, i) => (
                    <li key={i}><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>{f}</li>
                  ))}
                </ul>
              )}
              {p.compatibility && <p className="pd-compat"><strong>Compatibilidad:</strong> {p.compatibility}</p>}
              <a className="btn btn-primary btn-lg pd-cta" href={consulta} target="_blank" rel="noopener">Consultar por WhatsApp →</a>
            </div>
          </div>

          {specs && Object.keys(specs).length > 0 && (
            <div className="pd-specs">
              <h2>Ficha técnica</h2>
              <table><tbody>
                {Object.entries(specs).map(([k, v]) => (<tr key={k}><th>{k}</th><td>{v}</td></tr>))}
              </tbody></table>
            </div>
          )}

          {p.projects.length > 0 && (
            <div className="pd-used">
              <h2>Usado en estos proyectos</h2>
              <div className="grid-featured">
                {p.projects.slice(0, 4).map(pr => {
                  const cover = pr.thumbnail || pr.media.find(m => m.type === "IMAGE")?.url || "/assets/img/hero-poster.webp";
                  return (
                    <Link href={`/proyectos/${pr.slug}`} key={pr.id} className="card">
                      <div className="media"><img src={cover} alt={pr.title} loading="lazy" />
                        <div className="ov"><span className="cat">{pr.category?.name || "Proyecto"}</span><span className="ttl">{pr.title}</span></div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <WaFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
