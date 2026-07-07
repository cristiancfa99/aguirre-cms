import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const CATS: { name: string; slug: string; order: number }[] = [
  { name: "Automatización", slug: "automatizacion", order: 1 },
  { name: "Portones Corredizos", slug: "portones-corredizos", order: 2 },
  { name: "Portones Levadizos", slug: "portones-levadizos", order: 3 },
  { name: "Frentes Modernos", slug: "frentes-modernos", order: 4 },
  { name: "WPC", slug: "wpc", order: 5 },
  { name: "Rejas", slug: "rejas", order: 6 },
  { name: "Parrillas", slug: "parrillas", order: 7 },
  { name: "Seguridad Electrónica", slug: "seguridad-electronica", order: 8 },
  { name: "Otros", slug: "otros", order: 9 },
];

const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(DIACRITICS, "");

function pick(text: string): string {
  const t = norm(text);
  if (t.includes("wpc")) return "wpc";
  if (t.includes("corrediz")) return "portones-corredizos";
  if (t.includes("levadiz")) return "portones-levadizos";
  if (t.includes("reja") || t.includes("baranda")) return "rejas";
  if (t.includes("parrill") || t.includes("quincho") || t.includes("asador")) return "parrillas";
  if (t.includes("camara") || t.includes("seguridad") || t.includes("cctv") || t.includes("cerco")) return "seguridad-electronica";
  if (t.includes("frente") || t.includes("postig")) return "frentes-modernos";
  if (t.includes("automatiz") || t.includes("motor") || t.includes("ppa") || t.includes(" seg") || t.includes("porton")) return "automatizacion";
  return "otros";
}

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (!process.env.AUTH_SECRET || key !== process.env.AUTH_SECRET) {
    return NextResponse.json({ ok: false, error: "Clave inválida" }, { status: 401 });
  }
  try {
    // 1) upsert de las 9 categorías (idempotente)
    for (const c of CATS) {
      await prisma.category.upsert({ where: { slug: c.slug }, update: { name: c.name, order: c.order }, create: c });
    }
    const bySlug = new Map((await prisma.category.findMany()).map(c => [c.slug, c.id]));

    // 2) auto-asignar proyectos a la nueva taxonomía por palabras clave
    const projects = await prisma.project.findMany();
    let reassigned = 0;
    for (const p of projects) {
      const blob = [p.title, p.cardLabel, p.description, (p.tags || []).join(" "), (p.materials || []).join(" ")].filter(Boolean).join(" ");
      const slug = pick(blob);
      const catId = bySlug.get(slug);
      if (catId && catId !== p.categoryId) {
        await prisma.project.update({ where: { id: p.id }, data: { categoryId: catId } });
        reassigned++;
      }
    }
    return NextResponse.json({ ok: true, categorias: CATS.length, proyectos: projects.length, reasignados: reassigned });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
