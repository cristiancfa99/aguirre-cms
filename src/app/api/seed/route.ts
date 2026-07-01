import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runSeed } from "@/lib/seed-core";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (!process.env.AUTH_SECRET || key !== process.env.AUTH_SECRET) {
    return NextResponse.json({ ok: false, error: "Clave inválida" }, { status: 401 });
  }
  try {
    await runSeed(prisma);
    return NextResponse.json({ ok: true, message: "Datos cargados. Ya podés entrar a /admin." });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
