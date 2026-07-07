import { prisma } from "@/lib/prisma";
import { countAll } from "@/lib/queries";
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const c = await countAll();
  let latest: { id: string; title: string; createdAt: Date }[] = [];
  let latestProd: { id: string; name: string; createdAt: Date }[] = [];
  try { latest = await prisma.project.findMany({ orderBy: { createdAt: "desc" }, take: 6, select: { id: true, title: true, createdAt: true } }); } catch {}
  try { latestProd = await prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 6, select: { id: true, name: true, createdAt: true } }); } catch {}
  const cards = [
    ["Proyectos", c.projects], ["Productos", c.products],
    ["Consultas", c.inquiries], ["Destacados", c.featured],
  ] as const;
  return (
    <>
      <h1 className="admin-h1">Dashboard</h1>
      <div className="admin-stats">
        {cards.map(([k, v]) => (<div className="admin-stat" key={k}><div className="v">{v}</div><div className="l">{k}</div></div>))}
      </div>
      <h2 className="admin-h2">Últimos trabajos agregados</h2>
      <div className="admin-table">
        {latest.length === 0 && <p className="muted">Todavía no hay proyectos. Creá el primero en “Proyectos”.</p>}
        {latest.map(p => (
          <div className="row" key={p.id}><span>{p.title}</span><span className="muted">{new Date(p.createdAt).toLocaleDateString("es-AR")}</span></div>
        ))}
      </div>
      <h2 className="admin-h2">Últimos productos agregados</h2>
      <div className="admin-table">
        {latestProd.length === 0 && <p className="muted">Todavía no hay productos.</p>}
        {latestProd.map(p => (
          <div className="row" key={p.id}><span>{p.name}</span><span className="muted">{new Date(p.createdAt).toLocaleDateString("es-AR")}</span></div>
        ))}
      </div>
    </>
  );
}
