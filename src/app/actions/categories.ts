"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/validators";

async function requireAuth() {
  const s = await auth();
  if (!s?.user) throw new Error("No autorizado");
}

export async function saveCategory(formData: FormData) {
  await requireAuth();
  const id = (formData.get("id") as string) || "";
  const name = String(formData.get("name") || "").trim();
  if (!name) return;
  const data = {
    name,
    slug: slugify(String(formData.get("slug") || name)),
    order: Number(formData.get("order") || 0),
  };
  if (id) await prisma.category.update({ where: { id }, data });
  else await prisma.category.create({ data });
  revalidatePath("/admin/categorias"); revalidatePath("/proyectos"); revalidatePath("/");
}

export async function deleteCategory(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  // Desvincular proyectos antes de borrar para no romper la relación.
  await prisma.project.updateMany({ where: { categoryId: id }, data: { categoryId: null } });
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categorias"); revalidatePath("/proyectos");
}
