import { prisma } from "@/lib/prisma";
import type { GItem } from "@/components/Gallery";

type ProjectWithMedia = Awaited<ReturnType<typeof getRawProjects>>[number];

async function getRawProjects() {
  return prisma.project.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true, media: { orderBy: { order: "asc" } } },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

function toItem(p: ProjectWithMedia): GItem {
  const firstImg = p.thumbnail || p.media.find(m => m.type === "IMAGE")?.url || "/assets/img/hero-poster.webp";
  const firstVid = p.media.find(m => m.type === "VIDEO")?.url || null;
  return {
    id: p.id, slug: p.slug, title: p.title, description: p.description,
    location: p.location, cat: p.category?.slug || "otros",
    catLabel: p.cardLabel || p.category?.name || "Proyecto",
    tags: p.tags, cover: firstImg, video: firstVid, span: p.span,
  };
}

export async function getFeaturedItems(): Promise<GItem[]> {
  try {
    const list = await getRawProjects();
    // Home vende, no es galería: máximo 6 destacados (los mejores trabajos).
    return list.filter(p => p.featured).map(toItem).slice(0, 6);
  } catch { return []; }
}
export async function getAllItems(): Promise<GItem[]> {
  try { return (await getRawProjects()).map(toItem); } catch { return []; }
}
export async function getProducts() {
  try {
    return await prisma.product.findMany({ where: { published: true }, orderBy: { order: "asc" } });
  } catch { return []; }
}
export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({ where: { published: true }, orderBy: { date: "desc" } });
  } catch { return []; }
}
export async function getProjectBySlug(slug: string) {
  try {
    return await prisma.project.findUnique({ where: { slug }, include: { category: true, media: { orderBy: { order: "asc" } }, products: { where: { published: true }, orderBy: { order: "asc" } } } });
  } catch { return null; }
}
export async function countAll() {
  try {
    const [projects, products, inquiries, featured] = await Promise.all([
      prisma.project.count(), prisma.product.count(),
      prisma.inquiry.count(), prisma.project.count({ where: { featured: true } }),
    ]);
    return { projects, products, inquiries, featured };
  } catch { return { projects: 0, products: 0, inquiries: 0, featured: 0 }; }
}
