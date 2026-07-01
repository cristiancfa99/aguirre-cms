import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject, duplicateProject, archiveProject } from "@/app/actions/admin";
export const dynamic = "force-dynamic";

export default async function ProyectosAdmin() {
  let projects: { id: string; title: string; status: string; featured: boolean; order: number }[] = [];
  try { projects = await prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }], select: { id: true, title: true, status: true, featured: true, order: true } }); } catch {}
  return (
    <>
      <div className="admin-head"><h1 className="admin-h1">Proyectos</h1><Link className="btn btn-primary" href="/admin/proyectos/new">+ Nuevo proyecto</Link></div>
      <div className="admin-table">
        <div className="row head"><span>Título</span><span>Estado</span><span>Dest.</span><span>Acciones</span></div>
        {projects.map(p => (
          <div className="row" key={p.id}>
            <span>{p.title}</span>
            <span className="muted">{p.status}</span>
            <span>{p.featured ? "★" : "—"}</span>
            <span className="actions">
              <Link href={`/admin/proyectos/${p.id}`}>Editar</Link>
              <form action={duplicateProject}><input type="hidden" name="id" value={p.id} /><button type="submit">Duplicar</button></form>
              <form action={archiveProject}><input type="hidden" name="id" value={p.id} /><button type="submit">Archivar</button></form>
              <form action={deleteProject}><input type="hidden" name="id" value={p.id} /><button type="submit" className="danger">Eliminar</button></form>
            </span>
          </div>
        ))}
        {projects.length === 0 && <p className="muted" style={{ padding: 20 }}>Sin proyectos aún.</p>}
      </div>
    </>
  );
}
