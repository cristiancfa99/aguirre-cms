import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/app/actions/admin";
export const dynamic = "force-dynamic";
export default async function ProductosAdmin() {
  let products: { id: string; name: string; category: string; published: boolean }[] = [];
  try { products = await prisma.product.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true, category: true, published: true } }); } catch {}
  return (
    <>
      <div className="admin-head"><h1 className="admin-h1">Productos</h1><Link className="btn btn-primary" href="/admin/productos/new">+ Nuevo producto</Link></div>
      <div className="admin-table">
        <div className="row head"><span>Nombre</span><span>Categoría</span><span>Estado</span><span>Acciones</span></div>
        {products.map(p => (
          <div className="row" key={p.id}>
            <span>{p.name}</span><span className="muted">{p.category}</span><span>{p.published ? "Publicado" : "Oculto"}</span>
            <span className="actions">
              <Link href={`/admin/productos/${p.id}`}>Editar</Link>
              <form action={deleteProduct}><input type="hidden" name="id" value={p.id} /><button type="submit" className="danger">Eliminar</button></form>
            </span>
          </div>
        ))}
        {products.length === 0 && <p className="muted" style={{ padding: 20 }}>Sin productos aún.</p>}
      </div>
    </>
  );
}
