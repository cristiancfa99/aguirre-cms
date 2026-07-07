import { getSettings } from "@/lib/queries";
import { saveSettings } from "@/app/actions/settings";

export const dynamic = "force-dynamic";

export default async function SeoAdmin() {
  const s = await getSettings();
  return (
    <>
      <h1 className="admin-h1">SEO y Analítica</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Metadatos por defecto y medición. Cada proyecto/producto puede tener su propio SEO.</p>
      <form action={saveSettings} className="admin-form">
        <label>Meta título por defecto<input name="metaTitle" defaultValue={s?.metaTitle || ""} placeholder="Se usa si no hay uno específico" /></label>
        <label>Meta descripción por defecto<textarea name="metaDescription" defaultValue={s?.metaDescription || ""} placeholder="Máx 155 caracteres" /></label>
        <label>ID de Google Analytics 4 (GA4)<input name="ga4Id" defaultValue={s?.ga4Id || ""} placeholder="G-XXXXXXXXXX" /></label>
        <button className="btn btn-primary" type="submit" style={{ alignSelf: "flex-start" }}>Guardar</button>
      </form>
    </>
  );
}
