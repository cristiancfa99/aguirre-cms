import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aguirreautomatizaciones.com.ar";
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects: { slug: string; updatedAt: Date }[] = [];
  try {
    projects = await prisma.project.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } });
  } catch {}
  const base: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/proyectos`, changeFrequency: "weekly", priority: 0.9 },
  ];
  const proj: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${SITE}/proyectos/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...base, ...proj];
}
