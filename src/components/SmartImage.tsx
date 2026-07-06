"use client";
import { useRef, useState } from "react";
import { analyzeProjectImage } from "@/app/actions/ai";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function SmartImage({ initialUrl = "" }: { initialUrl?: string }) {
  const [url, setUrl] = useState(initialUrl);
  const [b64, setB64] = useState<{ data: string; mime: string } | null>(null);
  const [busy, setBusy] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  function fillForm(name: string, value: string) {
    if (!value) return;
    const form = wrapRef.current?.closest("form");
    const el = form?.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement | null;
    if (el) el.value = value;
  }

  function onFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const res = String(reader.result);
      setB64({ data: res.slice(res.indexOf(",") + 1), mime: file.type });
    };
    reader.readAsDataURL(file);

    if (CLOUD && PRESET) {
      setBusy("Subiendo imagen...");
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET);
      fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: fd })
        .then(r => r.json())
        .then(j => { if (j.secure_url) { setUrl(j.secure_url); setBusy("Imagen subida ✓"); } else setBusy("No se pudo subir la imagen."); })
        .catch(() => setBusy("No se pudo subir la imagen."));
    } else {
      setBusy("Imagen lista para analizar. (Cloudinary no configurado: pegá la URL abajo para publicarla.)");
    }
  }

  async function analyze() {
    if (!b64) { setBusy("Primero elegí una imagen."); return; }
    setBusy("Analizando con IA...");
    const r = await analyzeProjectImage(b64.data, b64.mime);
    if (!r.ok) { setBusy(r.error); return; }
    const d = r.data;
    fillForm("title", d.title);
    fillForm("slug", d.slug);
    fillForm("description", d.description);
    fillForm("tags", d.tags.join(", "));
    fillForm("keywords", d.keywords.join(", "));
    fillForm("metaTitle", d.metaTitle);
    fillForm("metaDescription", d.metaDescription);
    setBusy("Listo ✓ Revisá y editá los campos antes de guardar. Categoría sugerida: " + (d.category || "—"));
  }

  return (
    <fieldset ref={wrapRef as React.Ref<HTMLFieldSetElement>}>
      <legend>Foto principal + IA</legend>
      <label>Subí una foto del trabajo
        <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      </label>
      {url && <img src={url} alt="" style={{ maxWidth: 220, borderRadius: 10, marginTop: 4, border: "1px solid var(--border)" }} />}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button type="button" className="btn btn-primary" onClick={analyze}>✨ Analizar con IA</button>
        {busy && <span className="muted" style={{ fontSize: ".85rem" }}>{busy}</span>}
      </div>
      <label>Miniatura / foto principal (URL) — se completa al subir, o pegá una
        <input name="thumbnail" value={url} onChange={e => setUrl(e.target.value)} placeholder="/assets/img/... o URL de Cloudinary" />
      </label>
    </fieldset>
  );
}
