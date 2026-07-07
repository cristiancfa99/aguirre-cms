import { prisma } from "@/lib/prisma";
import { saveProduct } from "@/app/actions/admin";
export const dynamic = "force-dynamic";

type Specs = Record<string, string>;

export default async function ProductForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await prisma.product.findUnique({ where: { id }, include: { projects: { select: { id: true } } } });
  const linked = new Set((p?.projects || []).map(pr => pr.id));
  let projects: { id: string; title: string }[] = [];
  try { projects = await prisma.project.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }); } catch {}
  const specsText = p?.specs ? Object.entries(p.specs as Specs).map(([k, v]) => `${k}: ${v}`).join("\n") : "";

  return (
    <>
      <h1 className="admin-h1">{isNew ? "Nuevo producto" : "Editar producto"}</h1>
      <form action={saveProduct} className="admin-form">
        {!isNew && <input type="hidden" name="id" value={p?.id} />}
        <label>Nombre<input name="name" defaultValue={p?.name || ""} required /></label>
        <label>Slug<input name="slug" defaultValue={p?.slug || ""} placeholder="se genera del nombre" /></label>
        <label>Descripción comercial<textarea name="description" defaultValue={p?.description || ""} /></label>
        <div className="grid2">
          <label>Categoría<input name="category" defaultValue={p?.category || "Motores"} /></label>
          <label>Marca<input name="brand" defaultValue={p?.brand || ""} /></label>
          <label>Precio (opcional)<input name="price" type="number" step="0.01" defaultValue={p?.price ?? ""} /></label>
          <label>Insignia (ej: Disponible)<input name="badge" defaultValue={p?.badge || ""} /></label>
          <label>Ícono (si no hay foto): seg/cam/remote/sensor/acc<input name="iconKey" defaultValue={p?.iconKey || ""} /></label>
          <label>Orden<input name="order" type="number" defaultValue={p?.order ?? 0} /></label>
          <label className="check"><input type="checkbox" name="published" defaultChecked={p?.published ?? true} /> Publicado</label>
        </div>
        <label>Compatibilidad<input name="compatibility" defaultValue={p?.compatibility || ""} placeholder="Ej: Portones hasta 400kg, uso residencial e industrial liviano" /></label>
        <label>Ventajas (separadas por coma)<input name="features" defaultValue={(p?.features || []).join(", ")} placeholder="Ej: Arranque suave, Encoder, Batería de respaldo" /></label>
        <label>Ficha técnica (una por línea, formato «Campo: Valor»)<textarea name="specs" defaultValue={specsText} placeholder={"Fuerza: 400 kg\nVelocidad: 12 m/min\nAlimentación: 220V"} /></label>
        <label>Foto (URL)<input name="thumbnail" defaultValue={p?.thumbnail || ""} placeholder="/assets/img/... o URL de Cloudinary" /></label>
        <label>Fuente de la imagen (si no es propia)<input name="imageSource" defaultValue={p?.imageSource || ""} placeholder="URL del sitio oficial del fabricante (para reemplazar por foto propia luego)" /></label>
        {projects.length > 0 && (
          <fieldset><legend>Proyectos donde se usó este producto</legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {projects.map(pr => (
                <label key={pr.id} className="check" style={{ margin: 0 }}>
                  <input type="checkbox" name="projectIds" value={pr.id} defaultChecked={linked.has(pr.id)} /> {pr.title}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <button className="btn btn-primary" type="submit">Guardar</button>
      </form>
    </>
  );
}
