import { prisma } from "@/lib/prisma";
import UsuariosClient from "@/components/UsuariosClient";

export const dynamic = "force-dynamic";

export default async function UsuariosAdmin() {
  let users: { id: string; email: string; name: string | null; role: string }[] = [];
  try {
    users = await prisma.user.findMany({ orderBy: { createdAt: "asc" }, select: { id: true, email: true, name: true, role: true } });
  } catch {}
  return <UsuariosClient users={users} />;
}
