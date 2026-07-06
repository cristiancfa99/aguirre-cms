"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export type PwState = { ok: boolean; msg: string } | undefined;

export async function changePassword(_prev: PwState, formData: FormData): Promise<PwState> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return { ok: false, msg: "No autorizado. Volvé a iniciar sesión." };

  const current = String(formData.get("current") || "");
  const next = String(formData.get("next") || "");
  const confirm = String(formData.get("confirm") || "");

  if (next.length < 8) return { ok: false, msg: "La nueva contraseña debe tener al menos 8 caracteres." };
  if (next !== confirm) return { ok: false, msg: "La confirmación no coincide con la nueva contraseña." };
  if (next === current) return { ok: false, msg: "La nueva contraseña debe ser distinta a la actual." };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { ok: false, msg: "Usuario no encontrado." };

  const valid = await bcrypt.compare(current, user.passwordHash);
  if (!valid) return { ok: false, msg: "La contraseña actual es incorrecta." };

  const passwordHash = await bcrypt.hash(next, 10);
  await prisma.user.update({ where: { email }, data: { passwordHash } });

  return { ok: true, msg: "Contraseña actualizada correctamente." };
}
