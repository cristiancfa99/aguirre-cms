import type { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const CATS: [string, string][] = [
  ["automatizacion", "Automatización"], ["frentes", "Frentes"],
  ["portones", "Portones"], ["herreria", "Herrería"], ["estructuras", "Estructuras"],
];

type P = { slug: string; title: string; description: string; cat: string; cardLabel: string; location: string; tags: string[]; thumb: string; video?: string; span: string; featured?: boolean };

const PROJECTS: P[] = [
  { slug: "frente-wpc-simil-madera", title: "Frente revestido en WPC símil madera", description: "Frente con listones de WPC símil madera y portón corredizo automatizado: estética premium y bajo mantenimiento.", cat: "frentes", cardLabel: "Frente · WPC símil madera", location: "Formosa", tags: ["WPC", "Símil madera", "Listones", "Premium"], thumb: "/assets/img/p19-frente-wpc.webp", span: "s-wide", featured: true },
  { slug: "porton-corredizo-planchuelas", title: "Portón corredizo de planchuelas", description: "Portón corredizo de planchuelas horizontales con tramos calados, en negro: seguridad, ventilación y diseño.", cat: "frentes", cardLabel: "Frente · Corredizo", location: "Formosa", tags: ["Corredizo", "Planchuelas", "Frente", "Negro"], thumb: "/assets/img/p17-corredizo-planchuelas.webp", span: "s-reg", featured: true },
  { slug: "porton-levadizo-peatonal-gris", title: "Portón levadizo con puerta peatonal", description: "Portón levadizo en chapa con puerta peatonal integrada y terminación gris.", cat: "portones", cardLabel: "Portón levadizo", location: "Formosa", tags: ["Levadizo", "Puerta peatonal", "Chapa", "Gris"], thumb: "/assets/img/p18-levadizo-peatonal-gris.webp", span: "s-reg", featured: true },
  { slug: "porton-levadizo-barrotes", title: "Portón levadizo de barrotes 20x30 mm", description: "Portón levadizo con barrotes de caño 20x30 mm para frente domiciliario moderno, listo para automatizar.", cat: "frentes", cardLabel: "Frente · Portón levadizo", location: "Ciudad de Formosa", tags: ["Levadizo", "Barrotes 20x30", "Frente", "Automatizable"], thumb: "/assets/img/p06-frente-corredizo.webp", span: "s-wide", featured: true },
  { slug: "porton-automatizado", title: "Portón automatizado en funcionamiento", description: "Portón corredizo automatizado abriendo y cerrando: instalación y motorización completas.", cat: "automatizacion", cardLabel: "Automatización · Video", location: "Formosa", tags: ["Automatización", "Corredizo", "Video"], thumb: "/assets/img/v-automatizacion.webp", video: "/assets/video/automatizacion.mp4", span: "s-tall" },
  { slug: "frente-rejas-verticales", title: "Frente con rejas verticales", description: "Frente domiciliario moderno con rejas y barrotes verticales en negro, estética industrial premium.", cat: "frentes", cardLabel: "Frente moderno", location: "Formosa", tags: ["Frente", "Rejas verticales", "Moderno"], thumb: "/assets/img/p10-frente-rejas-vert.webp", span: "s-reg" },
  { slug: "montacargas-800kg", title: "Montacargas hasta 800 kg", description: "Montacargas metálico con capacidad de hasta 800 kg en funcionamiento, fabricación propia.", cat: "estructuras", cardLabel: "Estructura · Video", location: "Formosa", tags: ["Montacargas", "800 kg", "Estructura", "Video"], thumb: "/assets/img/v-montacargas.webp", video: "/assets/video/v-montacargas.mp4", span: "s-reg" },
  { slug: "porton-puerta-peatonal", title: "Portón con puerta peatonal integrada", description: "Frente con portón vehicular y puerta peatonal integrada en chapa, con detalles en acero.", cat: "frentes", cardLabel: "Frente · Portón", location: "Ciudad de Formosa", tags: ["Portón", "Puerta peatonal", "Chapa", "Acero"], thumb: "/assets/img/p04-porton-peatonal.webp", span: "s-reg" },
  { slug: "porton-levadizo-tubos", title: "Portón levadizo de tubos", description: "Portón levadizo de tubos verticales, robusto y de líneas limpias para acceso vehicular.", cat: "portones", cardLabel: "Portón levadizo", location: "Formosa", tags: ["Levadizo", "Tubos", "Acceso vehicular"], thumb: "/assets/img/p03-porton-tubos-vert.webp", span: "s-reg" },
  { slug: "porton-corredizo-doble-hoja", title: "Portón corredizo doble hoja", description: "Frente con portón corredizo de doble hoja en chapa, terminación grafito y diseño contemporáneo.", cat: "frentes", cardLabel: "Frente · Corredizo doble hoja", location: "Formosa", tags: ["Corredizo", "Doble hoja", "Frente", "Grafito"], thumb: "/assets/img/p02-frente-tubos.webp", span: "s-reg" },
  { slug: "porton-levadizo-grafito", title: "Portón levadizo grafito", description: "Portón levadizo en chapa con líneas horizontales y terminación grafito, fabricado a medida.", cat: "portones", cardLabel: "Portón levadizo", location: "Taller propio", tags: ["Levadizo", "Grafito", "Chapa", "A medida"], thumb: "/assets/img/p08-porton-gris.webp", span: "s-half" },
  { slug: "hoja-porton-levadizo", title: "Hoja de portón levadizo", description: "Detalle de la hoja de un portón levadizo con cerramiento traslúcido y refuerzos metálicos.", cat: "portones", cardLabel: "Portón levadizo · detalle", location: "Formosa", tags: ["Levadizo", "Hoja", "Cerramiento", "Detalle"], thumb: "/assets/img/p09-cerramiento.webp", span: "s-half" },
  { slug: "baranda-corte-laser", title: "Baranda con corte láser", description: "Baranda divisoria con paneles de corte láser y diseño orgánico, en acero pintado negro.", cat: "herreria", cardLabel: "Herrería · Diseño", location: "Formosa", tags: ["Baranda", "Corte láser", "Diseño", "Interior"], thumb: "/assets/img/p07-baranda-laser.webp", span: "s-reg", featured: true },
  { slug: "terminacion-premium", title: "Terminación premium", description: "Detalle de la terminación premium de un portón: pintura y acabado de alta calidad.", cat: "portones", cardLabel: "Terminación · Video", location: "Formosa", tags: ["Terminación", "Pintura", "Detalle", "Video"], thumb: "/assets/img/v-detalle.webp", video: "/assets/video/detalle.mp4", span: "s-reg", featured: true },
  { slug: "porton-levadizo-frente-video", title: "Portón levadizo en frente", description: "Portón levadizo de tablillas en un frente moderno, vista del acceso terminado y funcionando.", cat: "frentes", cardLabel: "Frente · Video", location: "Formosa", tags: ["Levadizo", "Frente", "Tablillas", "Video"], thumb: "/assets/img/v-reel-frente.webp", video: "/assets/video/reel-frente.mp4", span: "s-tall" },
  { slug: "motorizacion-ppa", title: "Motorización PPA", description: "Instalación de motor PPA con cremallera para la automatización de un portón corredizo.", cat: "automatizacion", cardLabel: "Automatización", location: "Formosa", tags: ["PPA", "Motor", "Cremallera", "Corredizo"], thumb: "/assets/img/p05-automatizacion-motor.webp", span: "s-reg" },
  { slug: "cubierta-chapa-teja", title: "Cubierta de chapa teja", description: "Cubierta metálica con chapa tipo teja sobre estructura, terminación prolija y resistente.", cat: "estructuras", cardLabel: "Estructura · Techo", location: "Formosa", tags: ["Cubierta", "Chapa teja", "Estructura", "Techo"], thumb: "/assets/img/p01-cubierta-teja.webp", span: "s-reg" },
  { slug: "montacargas-metalico", title: "Montacargas metálico", description: "Montacargas metálico con cabina enmallada y guías, fabricado e instalado a medida.", cat: "estructuras", cardLabel: "Estructura · Montacargas", location: "Formosa", tags: ["Montacargas", "Estructura", "Cabina", "A medida"], thumb: "/assets/img/p11-montacargas.webp", span: "s-tall" },
  { slug: "reja-diseno-moderno", title: "Reja de diseño moderno", description: "Reja de ventana con diseño de líneas modernas en hierro: seguridad y estética.", cat: "herreria", cardLabel: "Herrería · Reja", location: "Formosa", tags: ["Reja", "Ventana", "Diseño", "Seguridad"], thumb: "/assets/img/p12-reja-diseno.webp", span: "s-reg" },
  { slug: "reja-moderna-horizontal", title: "Reja moderna horizontal", description: "Reja de ventana con planchuelas horizontales, terminación negra y montaje prolijo.", cat: "herreria", cardLabel: "Herrería · Reja", location: "Formosa", tags: ["Reja", "Horizontal", "Planchuela", "Ventana"], thumb: "/assets/img/p13-reja-horizontal.webp", span: "s-reg" },
  { slug: "postigones-tablillas", title: "Postigones de tablillas", description: "Postigones de tablillas metálicas para ventanas: ventilación, luz y seguridad.", cat: "herreria", cardLabel: "Herrería · Postigón", location: "Formosa", tags: ["Postigón", "Tablillas", "Ventana", "Seguridad"], thumb: "/assets/img/p14-postigones.webp", span: "s-half" },
  { slug: "parrillero-tapa-levadiza", title: "Parrillero con tapa levadiza", description: "Parrillero a medida con tapa levadiza: más calor constante y menos humo.", cat: "herreria", cardLabel: "Quincho · Video", location: "Formosa", tags: ["Parrillero", "Quincho", "Tapa levadiza", "A medida"], thumb: "/assets/img/v-reel-parrilla.webp", video: "/assets/video/reel-parrilla.mp4", span: "s-half" },
  { slug: "motor-ppa-brushless", title: "Motor PPA Brushless instalado", description: "Automatización con motor PPA Brushless: tecnología silenciosa y de alto rendimiento.", cat: "automatizacion", cardLabel: "Automatización · PPA", location: "Formosa", tags: ["PPA", "Brushless", "Motor", "Automatización"], thumb: "/assets/img/p15-motor-brushless.webp", span: "s-reg" },
  { slug: "postigon-corredizo", title: "Postigón corredizo de tablillas", description: "Postigón corredizo de tablillas para cerramiento de ventana: funcional y moderno.", cat: "herreria", cardLabel: "Herrería · Postigón", location: "Formosa", tags: ["Postigón", "Corredizo", "Tablillas", "Cerramiento"], thumb: "/assets/img/p16-postigon-corredizo.webp", span: "s-reg" },
  { slug: "automatizacion-8-portones", title: "Automatización de 8 portones", description: "Proyecto de automatización de 8 portones en un mismo edificio: accesos vehiculares.", cat: "automatizacion", cardLabel: "Automatización · Video", location: "Formosa", tags: ["Automatización", "Proyecto", "Portones", "Video"], thumb: "/assets/img/v-8portones.webp", video: "/assets/video/v-8portones.mp4", span: "s-reg" },
  { slug: "fabricacion-taller", title: "Fabricación en taller", description: "Proceso de soldadura y fabricación en taller propio: control de calidad en cada pieza.", cat: "herreria", cardLabel: "Taller · Video", location: "Formosa", tags: ["Fabricación", "Soldadura", "Taller", "Video"], thumb: "/assets/img/v-fabricacion.webp", video: "/assets/video/v-fabricacion.mp4", span: "s-reg" },
];

type PR = { slug: string; name: string; description: string; category: string; brand?: string; badge?: string; iconKey?: string; thumb?: string };
const PRODUCTS: PR[] = [
  { slug: "motor-dzrio-500", name: "Motor corredizo DZ Río 500 kg", description: "Motor eléctrico para portón corredizo de hasta 500 kg.", category: "Motores", brand: "DZ Río", badge: "Disponible", thumb: "/assets/img/prod-motor-dzrio.webp" },
  { slug: "motor-ppa-500", name: "Motor corredizo PPA reforzado 500 kg", description: "Motor corredizo eléctrico pesado y reforzado, hasta 500 kg.", category: "Motores", brand: "PPA", badge: "Disponible", thumb: "/assets/img/prod-motor-ppa.webp" },
  { slug: "motor-celtron-800", name: "Motor levadizo Celtron 800 kg", description: "Motor para portón levadizo, capacidad de hasta 800 kg.", category: "Motores", brand: "Celtron", badge: "Disponible", thumb: "/assets/img/prod-motor-celtron.webp" },
  { slug: "camaras-seguridad", name: "Cámaras de seguridad", description: "Venta e instalación de cámaras para tu hogar o comercio.", category: "Seguridad", iconKey: "cam" },
  { slug: "controles-remotos", name: "Controles y remotos", description: "Controles, receptores y duplicados para tu portón automatizado.", category: "Accesorios", iconKey: "remote" },
  { slug: "fotocelulas-sensores", name: "Fotocélulas y sensores", description: "Seguridad anti-aplastamiento y detección de obstáculos.", category: "Accesorios", iconKey: "sensor" },
  { slug: "accesorios-varios", name: "Accesorios varios", description: "Cremalleras, guías, cerraduras eléctricas y todo lo necesario.", category: "Accesorios", iconKey: "acc" },
];


export async function runSeed(prisma: PrismaClient) {
  const email = process.env.ADMIN_EMAIL || "admin@aguirreautomatizaciones.com.ar";
  const pass = process.env.ADMIN_PASSWORD || "aguirre1234";
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Administrador", passwordHash: await bcrypt.hash(pass, 10), role: "ADMIN" },
  });
  console.log("Admin:", email);

  const catMap: Record<string, string> = {};
  for (const [slug, name] of CATS) {
    const c = await prisma.category.upsert({ where: { slug }, update: { name }, create: { slug, name } });
    catMap[slug] = c.id;
  }

  let order = 0;
  for (const p of PROJECTS) {
    const proj = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug, title: p.title, description: p.description,
        categoryId: catMap[p.cat] || null, cardLabel: p.cardLabel, location: p.location,
        tags: p.tags, thumbnail: p.thumb, span: p.span, featured: !!p.featured,
        order: order++, status: "PUBLISHED",
      },
    });
    if (p.video) {
      await prisma.media.deleteMany({ where: { projectId: proj.id, type: "VIDEO" } });
      await prisma.media.create({ data: { projectId: proj.id, type: "VIDEO", url: p.video, poster: p.thumb, alt: p.title, order: 0 } });
    }
  }

  let po = 0;
  for (const pr of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: pr.slug },
      update: {},
      create: { slug: pr.slug, name: pr.name, description: pr.description, category: pr.category, brand: pr.brand, badge: pr.badge, iconKey: pr.iconKey, thumbnail: pr.thumb, order: po++ },
    });
  }
  console.log(`Seed OK: ${PROJECTS.length} proyectos, ${PRODUCTS.length} productos`);

}
