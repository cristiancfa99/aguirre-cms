"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/validators";
import type { ProjectStatus, InquiryStatus } from "@prisma/client";

async function requireAuth() {
  const s = await auth();
  if (!s?.user) throw new Error("No autorizado");
}
const list = (v: FormDataEntryValue | null) =>
  String(v || "").split(",").map(s => s.trim()).filter(Boolean);

export async function saveProject(formData: FormData) {
  await requireAuth();
  const id = (formData.get("id") as string) || "";
  const title = String(formData.get("title") || "");
  const data = {
    title,
    slug: slugify(String(formData.get("slug") || title)),
    description: String(formData.get("description") || ""),
    location: String(formData.get("location") || "Formosa"),
    cardLabel: (String(formData.get("cardLabel") || "") || null),
    categoryId: (formData.get("categoryId") as string) || null,
    status: ((formData.get("status") as ProjectStatus) || "PUBLISHED"),
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 0),
    span: String(formData.get("span") || "s-reg"),
    thumbnail: (String(formData.get("thumbnail") || "") || null),
    tags: list(formData.get("tags")),
    materials: list(formData.get("materials")),
    motorBrand: (String(formData.get("motorBrand") || "") || null),
    metaTitle: (String(formData.get("metaTitle") || "") || null),
    metaDescription: (String(formData.get("metaDescription") || "") || null),
    keywords: list(formData.get("keywords")),
    notes: (String(formData.get("notes") || "") || null),
  };
  const productIds = formData.getAll("productIds").map(String).filter(Boolean);
  if (id) await prisma.project.update({ where: { id }, data: { ...data, products: { set: productIds.map(pid => ({ id: pid })) } } });
  else await prisma.project.create({ data: { ...data, products: { connect: productIds.map(pid => ({ id: pid })) } } });
  revalidatePath("/admin/proyectos"); revalidatePath("/proyectos"); revalidatePath("/");
  redirect("/admin/proyectos");
}
export async function deleteProject(formData: FormData) {
  await requireAuth();
  await prisma.project.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/proyectos");
}
export async function duplicateProject(formData: FormData) {
  await requireAuth();
  const p = await prisma.project.findUnique({ where: { id: String(formData.get("id")) } });
  if (!p) return;
  const { id, createdAt, updatedAt, ...rest } = p;
  void id; void createdAt; void updatedAt;
  await prisma.project.create({
    data: { ...rest, featured: false, title: rest.title + " (copia)", slug: rest.slug + "-copia-" + Date.now().toString().slice(-5) },
  });
  revalidatePath("/admin/proyectos");
}
export async function archiveProject(formData: FormData) {
  await requireAuth();
  await prisma.project.update({ where: { id: String(formData.get("id")) }, data: { status: "ARCHIVED" } });
  revalidatePath("/admin/proyectos");
}

export async function saveProduct(formData: FormData) {
  await requireAuth();
  const id = (formData.get("id") as string) || "";
  const name = String(formData.get("name") || "");
  const priceRaw = String(formData.get("price") || "");
  const data = {
    name,
    slug: slugify(String(formData.get("slug") || name)),
    description: String(formData.get("description") || ""),
    category: String(formData.get("category") || "Motores"),
    brand: (String(formData.get("brand") || "") || null),
    price: priceRaw ? Number(priceRaw) : null,
    badge: (String(formData.get("badge") || "") || null),
    thumbnail: (String(formData.get("thumbnail") || "") || null),
    iconKey: (String(formData.get("iconKey") || "") || null),
    published: formData.get("published") === "on",
    order: Number(formData.get("order") || 0),
  };
  if (id) await prisma.product.update({ where: { id }, data });
  else await prisma.product.create({ data });
  revalidatePath("/admin/productos"); revalidatePath("/");
  redirect("/admin/productos");
}
export async function deleteProduct(formData: FormData) {
  await requireAuth();
  await prisma.product.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/productos");
}

export async function setInquiryStatus(formData: FormData) {
  await requireAuth();
  await prisma.inquiry.update({
    where: { id: String(formData.get("id")) },
    data: { status: formData.get("status") as InquiryStatus },
  });
  revalidatePath("/admin/consultas");
}
