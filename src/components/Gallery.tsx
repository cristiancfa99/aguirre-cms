"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

export type GItem = {
  id: string; slug: string; title: string; description: string;
  location: string; cat: string; catLabel: string; tags: string[];
  cover: string; video: string | null; span: string;
};
export type Cat = { slug: string; name: string };

const PIN = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B5B5B5" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default function Gallery({
  items, categories = [], showFilters = false, layout = "all", pageSize = 9,
}: { items: GItem[]; categories?: Cat[]; showFilters?: boolean; layout?: "all" | "featured"; pageSize?: number }) {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [visible, setVisible] = useState(pageSize);

  const filters: [string, string][] = [["all", "Todos"], ...categories.map(c => [c.slug, c.name] as [string, string])];

  const shown = useMemo(() => {
    let list = filter === "all" ? items : items.filter(i => i.cat === filter);
    const term = q.trim().toLowerCase();
    if (term) {
      list = list.filter(i =>
        (i.title + " " + i.description + " " + i.catLabel + " " + i.location + " " + i.tags.join(" ")).toLowerCase().includes(term)
      );
    }
    return list;
  }, [items, filter, q]);

  const visibleItems = layout === "featured" ? shown : shown.slice(0, visible);

  return (
    <>
      {showFilters && (
        <div className="filterbar">
          <div className="wrap">
            <div className="filters">
              {filters.map(([k, label]) => (
                <button key={k} className={filter === k ? "active" : ""} onClick={() => { setFilter(k); setVisible(pageSize); }}>{label}</button>
              ))}
            </div>
            <div className="filterbar-right">
              <div className="portfolio-search">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
                <input value={q} onChange={e => { setQ(e.target.value); setVisible(pageSize); }} placeholder="Buscar trabajo, material, motor..." aria-label="Buscar proyectos" />
              </div>
              <span className="count">{shown.length} {shown.length === 1 ? "proyecto" : "proyectos"}</span>
            </div>
          </div>
        </div>
      )}
      <div className={layout === "featured" ? "grid-featured" : "grid"}>
        {visibleItems.map((p, i) => (
          <Link href={`/proyectos/${p.slug}`} key={p.id} className={"card card-in" + (layout === "featured" ? "" : " " + p.span)} style={{ animationDelay: `${(i % pageSize) * 45}ms` }} aria-label={`Ver proyecto: ${p.title}`}>
            <div className="media">
              <img src={p.cover} alt={p.title + " — " + p.location} loading="lazy" decoding="async" />
              {p.video && <span className="playicon"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>}
              <div className="ov">
                <span className="cat">{p.catLabel}</span>
                <span className="ttl">{p.title}</span>
                <span className="loc">{PIN}{p.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {layout !== "featured" && visible < shown.length && (
        <div className="loadmore"><button className="btn btn-ghost btn-lg" onClick={() => setVisible(v => v + pageSize)}>Cargar más proyectos ({shown.length - visible})</button></div>
      )}
      {shown.length === 0 && <p className="muted" style={{ textAlign: "center", padding: "50px 0" }}>No encontramos proyectos con ese criterio. Probá otra categoría o término.</p>}
    </>
  );
}
