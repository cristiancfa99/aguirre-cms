"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const s = await auth();
  if (!s?.user) throw new Error("No autorizado");
}

const str = (v: FormDataEntryValue | null, d = "") => (v == null ? d : String(v).trim());

export async function saveSettings(formData: FormData) {
  await requireAuth();
  // Solo actualiza los campos presentes en el formulario (Configuración y SEO no se pisan).
  const fields = ["phone", "whatsapp", "instagram", "address", "hours", "priceRange", "metaTitle", "metaDescription", "ga4Id"];
  const data: Record<string, string> = {};
  for (const f of fields) if (formData.has(f)) data[f] = str(formData.get(f));
  await prisma.settings.upsert({ where: { id: "singleton" }, update: data, create: { id: "singleton", ...data } });
  revalidatePath("/admin/configuracion"); revalidatePath("/admin/seo"); revalidatePath("/", "layout");
}
