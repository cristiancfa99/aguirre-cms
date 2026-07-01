import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "El título es obligatorio"),
  slug: z.string().min(2),
  description: z.string().default(""),
  categoryId: z.string().optional().nullable(),
  subcategory: z.string().optional().nullable(),
  location: z.string().default("Formosa"),
  client: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().default(0),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  keywords: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),
  motorBrand: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
});

export const productSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  slug: z.string().min(2),
  description: z.string().default(""),
  category: z.string().default("Motores"),
  brand: z.string().optional().nullable(),
  price: z.coerce.number().optional().nullable(),
  badge: z.string().optional().nullable(),
  iconKey: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  published: z.boolean().default(true),
  order: z.coerce.number().int().default(0),
});

export const inquirySchema = z.object({
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().or(z.literal("")).nullable(),
  message: z.string().optional().nullable(),
  source: z.string().default("formulario"),
  projectId: z.string().optional().nullable(),
});

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
