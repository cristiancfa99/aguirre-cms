import { prisma } from "@/lib/prisma";
import { saveProduct } from "@/app/actions/admin";
export const dynamic = "force-dynamic";
export default async function ProductForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await prisma.product.findUnique({ where: { id } });
  return (
    <>
      <h1 className="admin-h1">{isNew ? "Nuevo producto" : "Editar producto"}</h1>
      <form action={saveProduct} className="admin-form">
        {!isNew && <input type="hidden" name="id" value={p?.id} />}
        <label>Nombre<input name="name" defaultValue={p?.name || ""} required /></label>
        <label>Slug<input name="slug" defaultValue={p?.slug || ""} placeholder="se genera del nombre" /></label>
        <label>Descripción<textarea name="description" defaultValue={p?.description || ""} /></label>
        <div className="grid2">
          <label>Categoría<input name="category" defaultValue={p?.category || "Motores"} /></label>
          <label>Marca<input name="brand" defaultValue={p?.brand || ""} /></label>
          <label>Precio (opcional)<input name="price" type="number" step="0.01" defaultValue={p?.price ?? ""} /></label>
          <label>Insignia (ej: Disponible)<input name="badge" defaultValue={p?.badge || ""} /></label>
          <label>Ícono (si no hay foto): seg/cam/remote/sensor/acc<input name="iconKey" defaultValue={p?.iconKey || ""} /></label>
          <label>Orden<input name="order" type="number" defaultValue={p?.order ?? 0} /></label>
          <label className="check"><input type="checkbox" name="published" defaultChecked={p?.published ?? true} /> Publicado</label>
        </div>
        <label>Foto (URL)<input name="thumbnail" defaultValue={""} placeholder="/assets/img/... o Cloudinary (Fase 3)" /></label>
        <button className="btn btn-primary" type="submit">Guardar</button>
      </form>
    </>
  );
}
