"use server";
// v4
import { prisma } from "@/lib/prisma";

export type SearchResults = {
  projects: { slug: string; title: string; label: string }[];
  products: { slug: string; name: string; brand: string | null }[];
};

export async function globalSearch(q: string): Promise<SearchResults> {
  const term = q.trim();
  if (term.length < 2) return { projects: [], products: [] };
  const ci = { contains: term, mode: "insensitive" as const };
  try {
    const [projects, products] = await Promise.all([
      prisma.project.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: ci }, { description: ci }, { location: ci }, { motorBrand: ci }, { cardLabel: ci },
            { tags: { has: term } }, { materials: { has: term } },
          ],
        },
        select: { slug: true, title: true, cardLabel: true, category: { select: { name: true } } },
        take: 6,
      }),
      prisma.product.findMany({
        where: {
          published: true,
          OR: [{ name: ci }, { description: ci }, { brand: ci }, { category: ci }, { compatibility: ci }],
        },
        select: { slug: true, name: true, brand: true },
        take: 6,
      }),
    ]);
    return {
      projects: projects.map(p => ({ slug: p.slug, title: p.title, label: p.cardLabel || p.category?.name || "Proyecto" })),
      products,
    };
  } catch {
    return { projects: [], products: [] };
