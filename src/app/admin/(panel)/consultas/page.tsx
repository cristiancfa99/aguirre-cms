import { prisma } from "@/lib/prisma";
import { setInquiryStatus } from "@/app/actions/admin";
export const dynamic = "force-dynamic";
const STATES = ["PENDIENTE","CONTACTADO","PRESUPUESTADO","APROBADO","FINALIZADO"];
export default async function Consultas() {
  let rows: { id: string; name: string | null; phone: string | null; source: string; status: string; createdAt: Date; project: { title: string } | null }[] = [];
  try { rows = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, include: { project: { select: { title: true } } }, take: 200 }); } catch {}
  return (
    <>
      <h1 className="admin-h1">Consultas (CRM)</h1>
      <p className="muted" style={{ marginBottom: 18 }}>Se registran automáticamente desde el formulario y desde “Usar como referencia”.</p>
      <div className="admin-table">
        <div className="row head"><span>Fecha</span><span>Contacto</span><span>Proyecto</span><span>Origen</span><span>Estado</span></div>
        {rows.map(r => (
          <div className="row" key={r.id}>
            <span className="muted">{new Date(r.createdAt).toLocaleDateString("es-AR")}</span>
            <span>{r.name || "—"}<br /><span className="muted">{r.phone || ""}</span></span>
            <span className="muted">{r.project?.title || "—"}</span>
            <span>{r.source}</span>
            <span>
              <form action={setInquiryStatus} className="statusform">
                <input type="hidden" name="id" value={r.id} />
                <select name="status" defaultValue={r.status}>{STATES.map(s => <option key={s} value={s}>{s}</option>)}</select>
                <button type="submit">Guardar</button>
              </form>
            </span>
          </div>
        ))}
        {rows.length === 0 && <p className="muted" style={{ padding: 20 }}>Todavía no hay consultas.</p>}
      </div>
    </>
  );
}
