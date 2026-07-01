const WA = process.env.NEXT_PUBLIC_WHATSAPP || "543704014443";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aguirreautomatizaciones.com.ar";
export function waLink(text: string) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
}
export function referenceMessage(title: string, slug: string) {
  const url = `${SITE}/proyectos/${slug}`;
  return `Hola. Vi este proyecto en la página web. Me gustaría solicitar un presupuesto tomando este trabajo como referencia.\nProyecto: ${title}\nLink: ${url}`;
}
export { WA, SITE };
