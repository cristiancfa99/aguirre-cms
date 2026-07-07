import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return (
    <div className="admin">
      <aside className="admin-side">
        <div className="admin-brand">AGUIRRE <span>admin</span></div>
        <nav>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/proyectos">Proyectos</Link>
          <Link href="/admin/productos">Productos</Link>
          <Link href="/admin/categorias">Categorías</Link>
          <Link href="/admin/consultas">Consultas (CRM)</Link>
          <Link href="/admin/testimonios">Testimonios</Link>
          <Link href="/admin/cuenta">Mi cuenta</Link>
        </nav>
        <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }} className="admin-signout">
          <div className="muted" style={{ fontSize: ".8rem", marginBottom: 8 }}>{session.user.email}</div>
          <button className="btn btn-ghost" type="submit">Cerrar sesión</button>
        </form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
