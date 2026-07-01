"use server";
import { prisma } from "@/lib/prisma";
import { inquirySchema } from "@/lib/validators";

export async function trackReference(projectId: string) {
  try {
    await prisma.inquiry.create({ data: { projectId, source: "referencia" } });
  } catch { /* no romper la UX si falla el log */ }
}

export async function createInquiry(formData: FormData) {
  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    source: "formulario",
    projectId: formData.get("projectId") || null,
  });
  if (!parsed.success) return { ok: false, error: "Datos inválidos" };
  try {
    await prisma.inquiry.create({ data: parsed.data });
    return { ok: true };
  } catch {
    return { ok: false, error: "No se pudo guardar la consulta" };
  }
}
