"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import type { Role } from "@prisma/client";

async function requireAuth() {
  const s = await auth();
  if (!s?.user) throw new Error("No autorizado");
  return s;
}

export type UserState = { ok: boolean; msg: string } | undefined;

export async function createUser(_prev: UserState, formData: FormData): Promise<UserState> {
  await requireAuth();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const name = String(formData.get("name") || "").trim() || null;
  const password = String(formData.get("password") || "");
  const role = (String(formData.get("role") || "EDITOR") as Role);
  if (!email || !password) return { ok: false, msg: "Email y contraseña son obligatorios." };
  if (password.length < 8) return { ok: false, msg: "La contraseña debe tener al menos 8 caracteres." };
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { ok: false, msg: "Ya existe un usuario con ese email." };
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, name, passwordHash, role } });
  revalidatePath("/admin/usuarios");
  return { ok: true, msg: "Usuario creado." };
}

export async function deleteUser(formData: FormData) {
  const s = await requireAuth();
  const id = String(formData.get("id"));
  const target = await prisma.user.findUnique({ where: { id } });
  // No permitir borrarse a uno mismo ni quedarse sin usuarios.
  if (target && target.email === s.user?.email) return;
  const count = await prisma.user.count();
  if (count <= 1) return;
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/usuarios");
}
