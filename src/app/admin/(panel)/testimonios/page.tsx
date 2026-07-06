import { prisma } from "@/lib/prisma";
import { saveTestimonial, deleteTestimonial, toggleTestimonial } from "@/app/actions/testimonials";

export const dynamic = "force-dynamic";

export default async function TestimoniosAdmin() {
  let list: { id: string; client: string; neighborhood: string | null; work: string | null; message: string; rating: number; published: boolean }[] = [];
  try {
    list = await prisma.testimonial.findMany({ orderBy: { date: "desc" } });
  } catch {}

  return (
    <>
      <h1 className="admin-h1">Testimonios</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Cargá reseñas reales de tus clientes. Aparecen en la Home solo si están publicadas.</p>

      <form action={saveTestimonial} className="admin-form" style={{ marginBottom: 34 }}>
        <fieldset>
          <legend>Nuevo testimonio</legend>
          <div className="grid2">
            <label>Cliente<input name="client" required placeholder="Nombre y apellido" /></label>
            <label>Barrio / Zona<input name="neighborhood" placeholder="Ej: Barrio San Miguel" /></label>
          </div>
          <div className="grid2">
            <label>Trabajo realizado<input name="work" placeholder="Ej: Portón corredizo automatizado" /></label>
            <label>Puntuación
              <select name="rating" defaultValue="5">
                <option value="5">★★★★★ (5)</option>
                <option value="4">★★★★ (4)</option>
                <option value="3">★★★ (3)</option>
              </select>
            </label>
          </div>
          <label>Mensaje<textarea name="message" required placeholder="Lo que dijo el cliente" /></label>
          <label className="check"><input type="checkbox" name="published" defaultChecked /> Publicado</label>
          <button className="btn btn-primary" type="submit" style={{ alignSelf: "flex-start" }}>Guardar testimonio</button>
        </fieldset>
      </form>

      <div className="admin-table">
        <div className="row head"><span>Cliente</span><span>Trabajo</span><span>Estado</span><span>Acciones</span></div>
        {list.map(t => (
          <div className="row" key={t.id}>
            <span>{t.client}<br /><span className="muted" style={{ fontSize: ".82rem" }}>{"★".repeat(t.rating)}</span></span>
            <span className="muted">{t.work || "—"}</span>
            <span>{t.published ? "Publicado" : "Oculto"}</span>
            <span className="actions">
              <form action={toggleTestimonial}><input type="hidden" name="id" value={t.id} /><button type="submit">{t.published ? "Ocultar" : "Publicar"}</button></form>
              <form action={deleteTestimonial}><input type="hidden" name="id" value={t.id} /><button type="submit" className="danger">Eliminar</button></form>
            </span>
          </div>
        ))}
        {list.length === 0 && <p className="muted" style={{ padding: 20 }}>Sin testimonios aún. Cargá el primero arriba.</p>}
      </div>
    </>
  );
}
