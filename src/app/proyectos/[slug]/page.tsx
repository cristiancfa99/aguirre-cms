// v4
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Link from "next/link";
import ReferenceButton from "@/components/ReferenceButton";
import { getProjectBySlug, getRelatedProjects } from "@/lib/queries";
import { SITE } from "@/lib/whatsapp";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: "Proyecto no encontrado" };
  const title = p.metaTitle || p.title;
  const desc = p.metaDescription || p.description;
  return {
    title, description: desc,
    keywords: p.keywords,
    alternates: { canonical: `/proyectos/${p.slug}` },
    openGraph: { title, description: desc, images: p.thumbnail ? [p.thumbnail] : [] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();
  const related = await getRelatedProjects(p.id, p.categoryId, 3);
  const cover = p.thumbnail || p.media.find(m => m.type === "IMAGE")?.url || "/assets/img/hero-poster.webp";
  const fecha = p.date ? new Date(p.date) : null;
  const ld = {
    "@context": "https://schema.org", "@type": "CreativeWork",
    name: p.title, description: p.description, image: cover,
    locationCreated: p.location, url: `${SITE}/proyectos/${p.slug}`,
    ...(fecha ? { dateCreated: fecha.toISOString() } : {}),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
      { "@type": "ListItem", position: 2, name: "Proyectos", item: `${SITE}/proyectos` },
      { "@type": "ListItem", position: 3, name: p.title, item: `${SITE}/proyectos/${p.slug}` },
    ],
  };
  return (
    <>
      <Nav home={false} />
      <section className="page-hero">
        <div className="wrap">
          <nav style={{ fontSize: ".82rem", color: "var(--muted)", marginBottom: 14 }}>
            <a href="/">Inicio</a> / <a href="/proyectos">Proyectos</a> / <span style={{ color: "var(--text)" }}>{p.title}</span>
          </nav>
          <span className="eyebrow">{p.cardLabel || p.category?.name || "Proyecto"}</span>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.4rem)" }}>{p.title}</h1>
          <p>{p.description}</p>
          <div className="pd-meta">
            {p.category?.name && <span>{p.category.name}</span>}
            <span>{p.location}</span>
            {fecha && <span>{fecha.toLocaleDateString("es-AR", { year: "numeric", month: "long" })}</span>}
          </div>
        </div>
      </section>
      <section className="portfolio-grid">
        <div className="wrap">
          <div className="grid">
            {p.media.length === 0 && (<div className="card s-wide"><div className="media"><img src={cover} alt={p.title} /></div></div>)}
            {p.media.map(m => (
              <div className="card s-half" key={m.id}>
                <div className="media">
                  {m.type === "VIDEO"
                    ? <video src={m.url} controls playsInline poster={m.poster || cover} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <img src={m.url} alt={m.alt || p.title} loading="lazy" />}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {p.tags.map((t, i) => <span className="lb-tag" key={i}>{t}</span>)}
          </div>
          {(p.materials.length > 0 || p.motorBrand) && (
            <p style={{ color: "var(--muted)", marginTop: 18 }}>
              {p.materials.length > 0 && <>Materiales: {p.materials.join(", ")}. </>}
              {p.motorBrand && <>Motor: {p.motorBrand}.</>}
            </p>
          )}
          {p.products.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 16 }}>Productos utilizados en este trabajo</h2>
              <div className="used-prods">
                {p.products.map(pr => (
                  <Link key={pr.id} className="used-prod" href={`/productos/${pr.slug}`}>
                    {pr.thumbnail && <img src={pr.thumbnail} alt={pr.name} loading="lazy" />}
                    <div>
                      <span className="up-name">{pr.name}</span>
                      {pr.brand && <span className="up-brand">{pr.brand}</span>}
                      <span className="up-cta">Ver producto →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: 40, maxWidth: 360 }}>
            <ReferenceButton id={p.id} title={p.title} slug={p.slug} />
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 70 }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: 24 }}>Proyectos relacionados</h2>
              <div className="grid-featured">
                {related.map(r => (
                  <Link href={`/proyectos/${r.slug}`} key={r.id} className="card">
                    <div className="media"><img src={r.cover} alt={r.title} loading="lazy" />
                      {r.video && <span className="playicon"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>}
                      <div className="ov"><span className="cat">{r.catLabel}</span><span className="ttl">{r.title}</span></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <WaFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}
