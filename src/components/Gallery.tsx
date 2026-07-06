"use client";
import { useState } from "react";
import Link from "next/link";

export type GItem = {
  id: string; slug: string; title: string; description: string;
  location: string; cat: string; catLabel: string; tags: string[];
  cover: string; video: string | null; span: string;
};
const PIN = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B5B5B5" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

const FILTERS: [string, string][] = [
  ["all", "Todos"], ["automatizacion", "Automatización"], ["frentes", "Frentes"],
  ["portones", "Portones"], ["herreria", "Herrería"], ["estructuras", "Estructuras"],
];

export default function Gallery({ items, showFilters = false, layout = "all" }: { items: GItem[]; showFilters?: boolean; layout?: "all" | "featured" }) {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? items : items.filter(i => i.cat === filter);

  return (
    <>
      {showFilters && (
        <div className="filterbar">
          <div className="wrap">
            <div className="filters">
              {FILTERS.map(([k, label]) => (
                <button key={k} className={filter === k ? "active" : ""} onClick={() => { setFilter(k); }}>{label}</button>
              ))}
            </div>
            <span className="count">{shown.length} proyectos</span>
          </div>
        </div>
      )}
      <div className={layout === "featured" ? "grid-featured" : "grid"}>
        {shown.map((p) => (
          <Link href={`/proyectos/${p.slug}`} key={p.id} className={"card" + (layout === "featured" ? "" : " " + p.span)} aria-label={`Ver proyecto: ${p.title}`}>
            <div className="media">
              <img src={p.cover} alt={p.title + " — " + p.location} loading="lazy" />
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
    </>
  );
}
