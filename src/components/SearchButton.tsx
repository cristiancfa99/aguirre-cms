"use client";
// v4
import { useState, useEffect, useRef } from "react";
import { globalSearch, type SearchResults } from "@/app/actions/search";

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [res, setRes] = useState<SearchResults>({ projects: [], products: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (q.trim().length < 2) { setRes({ projects: [], products: [] }); return; }
    setLoading(true);
    const t = setTimeout(async () => {
      const r = await globalSearch(q);
      setRes(r);
      setLoading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [q, open]);

  const total = res.projects.length + res.products.length;

  return (
    <>
      <button className="search-trigger" aria-label="Buscar" onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      </button>
      {open && (
        <div className="search-overlay" onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="search-panel">
            <div className="search-input">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar proyectos, productos, marcas, materiales..." />
              <button className="search-close" onClick={() => setOpen(false)} aria-label="Cerrar">×</button>
            </div>
            <div className="search-results">
              {q.trim().length < 2 && <p className="search-hint">Escribí al menos 2 letras. Ej: “corredizo”, “PPA”, “WPC”, “reja”.</p>}
              {q.trim().length >= 2 && loading && <p className="search-hint">Buscando…</p>}
              {q.trim().length >= 2 && !loading && total === 0 && <p className="search-hint">Sin resultados para “{q}”.</p>}
              {res.projects.length > 0 && (
                <div className="search-group">
                  <h4>Proyectos</h4>
                  {res.projects.map(p => (
                    <a key={p.slug} href={`/proyectos/${p.slug}`} className="search-item">
                      <span className="si-title">{p.title}</span><span className="si-label">{p.label}</span>
                    </a>
                  ))}
                </div>
              )}
              {res.products.length > 0 && (
                <div className="search-group">
                  <h4>Productos</h4>
                  {res.products.map(p => (
                    <a key={p.slug} href={`/productos/${p.slug}`} className="search-item">
                      <span className="si-title">{p.name}</span>{p.brand && <span className="si-label">{p.brand}</span>}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
 