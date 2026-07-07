import { prisma } from "@/lib/prisma";
import { saveCategory, deleteCategory } from "@/app/actions/categories";

export const dynamic = "force-dynamic";

export default async function CategoriasAdmin() {
  let cats: { id: string; name: string; slug: string; order: number; _count: { projects: number } }[] = [];
  try {
    cats = await prisma.category.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }], include: { _count: { select: { projects: true } } } });
  } catch {}

  return (
    <>
      <h1 className="admin-h1">Categorías</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Definen los filtros del portfolio. El orden controla cómo aparecen.</p>

      <form action={saveCategory} className="admin-form" style={{ marginBottom: 30 }}>
        <fieldset>
          <legend>Nueva categoría</legend>
          <div className="grid2">
            <label>Nombre<input name="name" required placeholder="Ej: Portones Corredizos" /></label>
            <label>Orden<input name="order" type="number" defaultValue={0} /></label>
          </div>
          <label>Slug (URL) — opcional<input name="slug" placeholder="se genera del nombre" /></label>
          <button className="btn btn-primary" type="submit" style={{ alignSelf: "flex-start" }}>Agregar categoría</button>
        </fieldset>
      </form>

      <div className="admin-table">
        <div className="row head"><span>Nombre</span><span>Slug</span><span>Proyectos</span><span>Acciones</span></div>
        {cats.map(c => (
          <div className="row" key={c.id}>
            <span>{c.name}</span>
            <span className="muted">{c.slug}</span>
            <span>{c._count.projects}</span>
            <span className="actions">
              <form action={deleteCategory}><input type="hidden" name="id" value={c.id} /><button type="submit" className="danger">Eliminar</button></form>
            </span>
          </div>
        ))}
        {cats.length === 0 && <p className="muted" style={{ padding: 20 }}>Sin categorías. Agregá la primera arriba.</p>}
      </div>
    </>
  );
}
