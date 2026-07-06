"use server";
import { auth } from "@/auth";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export type AIResult =
  | { ok: true; data: { title: string; description: string; alt: string; category: string; tags: string[]; keywords: string[]; metaTitle: string; metaDescription: string; slug: string } }
  | { ok: false; error: string };

export async function analyzeProjectImage(imageBase64: string, mime: string): Promise<AIResult> {
  const s = await auth();
  if (!s?.user) return { ok: false, error: "No autorizado." };

  const key = process.env.GEMINI_API_KEY;
  if (!key) return { ok: false, error: "Falta configurar GEMINI_API_KEY en Vercel (Variables ambientales)." };

  const prompt = `Sos el asistente de "Aguirre Automatizaciones", una herrería y empresa de automatización de portones en Formosa, Argentina. Analizá esta fotografía de un trabajo realizado (puede ser un portón, frente moderno, reja, quincho/parrillero, montacargas, estructura metálica, etc.).
Devolvé SOLAMENTE un objeto JSON válido, en español rioplatense (voseo), con estas claves exactas:
{
  "title": "título comercial y concreto del trabajo (máx 6 palabras)",
  "description": "2 a 3 frases claras y vendedoras describiendo el trabajo, materiales visibles y terminación",
  "alt": "texto alternativo SEO breve que describe la imagen",
  "category": "una sola de: automatizacion, frentes, portones, herreria, estructuras",
  "tags": ["entre 3 y 6 etiquetas cortas en minúscula"],
  "keywords": ["entre 4 y 6 palabras clave SEO relacionadas, incluyendo 'Formosa' cuando aplique"],
  "metaTitle": "título SEO (máx 60 caracteres)",
  "metaDescription": "meta descripción SEO (máx 155 caracteres)",
  "slug": "version-kebab-case-del-titulo-sin-tildes"
}
No agregues texto fuera del JSON.`;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mime, data: imageBase64 } }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.4 },
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, error: `Gemini devolvió un error (${res.status}). Revisá la API key. ${t.slice(0, 160)}` };
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return { ok: false, error: "Gemini no devolvió contenido." };
    const parsed = JSON.parse(text);
    return {
      ok: true,
      data: {
        title: String(parsed.title || ""),
        description: String(parsed.description || ""),
        alt: String(parsed.alt || ""),
        category: String(parsed.category || ""),
        tags: Array.isArray(parsed.tags) ? parsed.tags.map(String) : [],
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords.map(String) : [],
        metaTitle: String(parsed.metaTitle || ""),
        metaDescription: String(parsed.metaDescription || ""),
        slug: String(parsed.slug || ""),
      },
    };
  } catch (e) {
    return { ok: false, error: "No se pudo interpretar la respuesta de Gemini. Probá de nuevo." };
  }
}
