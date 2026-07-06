"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const s = await auth();
  if (!s?.user) throw new Error("No autorizado");
}

export async function saveTestimonial(formData: FormData) {
  await requireAuth();
  const id = (formData.get("id") as string) || "";
  const ratingRaw = Number(formData.get("rating") || 5);
  const data = {
    client: String(formData.get("client") || "").trim(),
    neighborhood: (String(formData.get("neighborhood") || "").trim() || null),
    work: (String(formData.get("work") || "").trim() || null),
    message: String(formData.get("message") || "").trim(),
    rating: Math.min(5, Math.max(1, ratingRaw)),
    published: formData.get("published") === "on",
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidatePath("/admin/testimonios"); revalidatePath("/");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAuth();
  await prisma.testimonial.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/testimonios"); revalidatePath("/");
}

export async function toggleTestimonial(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) return;
  await prisma.testimonial.update({ where: { id }, data: { published: !t.published } });
  revalidatePath("/admin/testimonios"); revalidatePath("/");
}
