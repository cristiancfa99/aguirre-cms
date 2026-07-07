import { getSettings } from "@/lib/queries";
import { saveSettings } from "@/app/actions/settings";

export const dynamic = "force-dynamic";

export default async function ConfiguracionAdmin() {
  const s = await getSettings();
  return (
    <>
      <h1 className="admin-h1">Configuración del negocio</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Estos datos alimentan el contacto, el footer y los datos estructurados del sitio.</p>
      <form action={saveSettings} className="admin-form">
        <div className="grid2">
          <label>Teléfono<input name="phone" defaultValue={s?.phone || "3704014443"} /></label>
          <label>WhatsApp (con código país)<input name="whatsapp" defaultValue={s?.whatsapp || "543704014443"} /></label>
          <label>Instagram (usuario)<input name="instagram" defaultValue={s?.instagram || "herreriaaguirre"} /></label>
          <label>Rango de precio<input name="priceRange" defaultValue={s?.priceRange || "$$"} /></label>
        </div>
        <label>Dirección / Zona<input name="address" defaultValue={s?.address || "Formosa, Argentina"} /></label>
        <label>Horario<input name="hours" defaultValue={s?.hours || "Lun a Sáb · 8 a 18 h"} /></label>
        <button className="btn btn-primary" type="submit" style={{ alignSelf: "flex-start" }}>Guardar</button>
      </form>
    </>
  );
}
