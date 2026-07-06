import { prisma } from "@/lib/prisma";
import { saveProject } from "@/app/actions/admin";
import SmartImage from "@/components/SmartImage";
export const dynamic = "force-dynamic";

export default async function ProjectForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await prisma.project.findUnique({ where: { id }, include: { products: { select: { id: true } } } });
  const linked = new Set((p?.products || []).map(pr => pr.id));
  let cats: { id: string; name: string }[] = [];
  let prods: { id: string; name: string }[] = [];
  try { cats = await prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }); } catch {}
  try { prods = await prisma.product.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }); } catch {}
  return (
    <>
      <h1 className="admin-h1">{isNew ? "Nuevo proyecto" : "Editar proyecto"}</h1>
      <form action={saveProject} className="admin-form">
        {!isNew && <input type="hidden" name="id" value={p?.id} />}
        <label>Título<input name="title" defaultValue={p?.title || ""} required /></label>
        <label>Slug (URL) — dejar vacío para autogenerar<input name="slug" defaultValue={p?.slug || ""} placeholder="se genera del título" /></label>
        <label>Etiqueta de tarjeta<input name="cardLabel" defaultValue={p?.cardLabel || ""} placeholder="Ej: Frente · Portón levadizo" /></label>
        <label>Descripción<textarea name="description" defaultValue={p?.description || ""} /></label>
        <div className="grid2">
          <label>Categoría
            <select name="categoryId" defaultValue={p?.categoryId || ""}>
              <option value="">— Sin categoría —</option>
              {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label>Ubicación<input name="location" defaultValue={p?.location || "Formosa"} /></label>
          <label>Estado
            <select name="status" defaultValue={p?.status || "PUBLISHED"}>
              <option value="PUBLISHED">Publicado</option><option value="DRAFT">Borrador</option><option value="ARCHIVED">Archivado</option>
            </select>
          </label>
          <label>Tamaño en grilla
            <select name="span" defaultValue={p?.span || "s-reg"}>
              <option value="s-reg">Normal</option><option value="s-wide">Ancho</option><option value="s-tall">Alto</option><option value="s-half">Medio</option>
            </select>
          </label>
          <label>Orden<input name="order" type="number" defaultValue={p?.order ?? 0} /></label>
          <label className="check"><input type="checkbox" name="featured" defaultChecked={p?.featured || false} /> Destacado (aparece en la Home)</label>
        </div>
        <SmartImage initialUrl={p?.thumbnail || ""} />
        <label>Etiquetas (separadas por coma)<input name="tags" defaultValue={(p?.tags || []).join(", ")} /></label>
        <label>Materiales (coma)<input name="materials" defaultValue={(p?.materials || []).join(", ")} /></label>
        <label>Marca del motor<input name="motorBrand" defaultValue={p?.motorBrand || ""} /></label>
        {prods.length > 0 && (
          <fieldset><legend>Productos utilizados en este trabajo</legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {prods.map(pr => (
                <label key={pr.id} className="check" style={{ margin: 0 }}>
                  <input type="checkbox" name="productIds" value={pr.id} defaultChecked={linked.has(pr.id)} /> {pr.name}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <fieldset><legend>SEO</legend>
          <label>Meta título<input name="metaTitle" defaultValue={p?.metaTitle || ""} /></label>
          <label>Meta descripción<textarea name="metaDescription" defaultValue={p?.metaDescription || ""} /></label>
          <label>Palabras clave (coma)<input name="keywords" defaultValue={(p?.keywords || []).join(", ")} /></label>
        </fieldset>
        <label>Observaciones<textarea name="notes" defaultValue={p?.notes || ""} /></label>
        <button className="btn btn-primary" type="submit">Guardar</button>
      </form>
    </>
  );
}
