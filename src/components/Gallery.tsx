"use client";
import { useState } from "react";
import { trackReference } from "@/app/actions/inquiries";
import { waLink, referenceMessage } from "@/lib/whatsapp";

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
  const [idx, setIdx] = useState<number | null>(null);
  const shown = filter === "all" ? items : items.filter(i => i.cat === filter);
  const cur = idx !== null ? shown[idx] : null;

  function openRef(p: GItem) {
    trackReference(p.id);
    window.open(waLink(referenceMessage(p.title, p.slug)), "_blank");
  }

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
        {shown.map((p, i) => (
          <div key={p.id} className={"card" + (layout === "featured" ? "" : " " + p.span)} onClick={() => setIdx(i)}>
            <div className="media">
              <img src={p.cover} alt={p.title + " — " + p.location} loading="lazy" />
              {p.video && <span className="playicon"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>}
              <div className="ov">
                <span className="cat">{p.catLabel}</span>
                <span className="ttl">{p.title}</span>
                <span className="loc">{PIN}{p.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cur && (
        <div className="lb open" onClick={(e) => { if (e.target === e.currentTarget) setIdx(null); }}>
          <button className="lb-nav lb-prev" onClick={() => setIdx((idx! - 1 + shown.length) % shown.length)}>‹</button>
          <div className="lb-content">
            <button className="lb-close" onClick={() => setIdx(null)}>×</button>
            <div className="lb-stage">
              {cur.video
                ? <video src={cur.video} controls autoPlay loop playsInline poster={cur.cover} />
                : <img src={cur.cover} alt={cur.title} />}
            </div>
            <div className="lb-info">
              <div className="cat">{cur.catLabel}</div>
              <h3>{cur.title}</h3>
              <p className="desc">{cur.description}</p>
              <div className="loc">{PIN}{cur.location}</div>
              <div className="lb-tags">{cur.tags.map((t, k) => <span className="lb-tag" key={k}>{t}</span>)}</div>
              <button className="lb-ref" type="button" onClick={() => openRef(cur)}>
                <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z"/></svg>
                Usar como referencia
              </button>
              <div className="lb-ref-note">Te abre WhatsApp con este proyecto para pedir un presupuesto similar.</div>
            </div>
          </div>
          <button className="lb-nav lb-next" onClick={() => setIdx((idx! + 1) % shown.length)}>›</button>
        </div>
      )}
    </>
  );
}
