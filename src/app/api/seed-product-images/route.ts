import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const Q = "?w=800&q=75&auto=format&fit=crop";
// Fotos de Unsplash (licencia libre, uso comercial, sin atribución obligatoria).
// Reemplazables por fotos propias desde el panel (campo imageSource guarda el origen).
const MAP: { slug: string; url: string }[] = [
  { slug: "camaras-seguridad", url: "https://images.unsplash.com/photo-1549109926-58f039549485" },
  { slug: "controles-remotos", url: "https://images.unsplash.com/photo-1614415852388-2406572efce6" },
  { slug: "fotocelulas-sensores", url: "https://images.unsplash.com/photo-1722488359737-7a9b8a8436c7" },
  { slug: "accesorios-varios", url: "https://images.unsplash.com/photo-1613945831677-383c19ad7721" },
];

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (!process.env.AUTH_SECRET || key !== process.env.AUTH_SECRET) {
    return NextResponse.json({ ok: false, error: "Clave inválida" }, { status: 401 });
  }
  try {
    let updated = 0;
    for (const m of MAP) {
      const r = await prisma.product.updateMany({
        where: { slug: m.slug },
        data: { thumbnail: m.url + Q, imageSource: m.url },
      });
      updated += r.count;
    }
    return NextResponse.json({ ok: true, actualizados: updated });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
