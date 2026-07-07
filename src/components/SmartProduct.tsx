"use client";
import { useRef, useState } from "react";
import { analyzeProduct } from "@/app/actions/ai";

export default function SmartProduct() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState("");
  const wrapRef = useRef<HTMLFieldSetElement>(null);

  function fill(name: string, value: string) {
    if (!value) return;
    const form = wrapRef.current?.closest("form");
    const el = form?.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement | null;
    if (el) el.value = value;
  }

  async function analyze() {
    if (q.trim().length < 3) { setBusy("Escribí marca y modelo (ej: PPA DZ Rio 500kg)."); return; }
    setBusy("Analizando con IA...");
    const r = await analyzeProduct(q);
    if (!r.ok) { setBusy(r.error); return; }
    const d = r.data;
    fill("description", d.description);
    fill("features", d.features.join(", "));
    fill("compatibility", d.compatibility);
    fill("specs", Object.entries(d.specs).map(([k, v]) => `${k}: ${v}`).join("\n"));
    if (!(wrapRef.current?.closest("form")?.querySelector('[name="category"]') as HTMLInputElement)?.value) fill("category", d.category);
    setBusy("Listo ✓ Revisá y editá los campos antes de guardar. Categoría sugerida: " + (d.category || "—"));
  }

  return (
    <fieldset ref={wrapRef}>
      <legend>Asistente IA de producto</legend>
      <label>Marca + modelo (la IA completa descripción, ventajas, ficha técnica y compatibilidad)
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Ej: Motor PPA DZ Rio 500kg / Cámara Dahua 2MP" />
      </label>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button type="button" className="btn btn-primary" onClick={analyze}>✨ Analizar con IA</button>
        {busy && <span className="muted" style={{ fontSize: ".85rem" }}>{busy}</span>}
      </div>
    </fieldset>
  );
}
