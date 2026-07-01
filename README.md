# Aguirre Automatizaciones — CMS (V2, Fase 1 + 2)

Plataforma administrable: sitio público (mismo diseño) + panel admin con login y CRUD
de **proyectos** y **productos**, base de datos PostgreSQL (Prisma) y captura de
**consultas/CRM** (formulario y “Usar como referencia”).

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind · Prisma · PostgreSQL · Auth.js (v5) · Zod.

## Qué incluye esta entrega (Fase 1 + 2)
- Home y /proyectos migrados a Next.js leyendo de la base (diseño idéntico).
- Página individual por proyecto: `/proyectos/[slug]` (SEO por proyecto + breadcrumbs).
- Panel `/admin` con login seguro: Dashboard, CRUD de Proyectos (crear/editar/duplicar/
  archivar/eliminar), CRUD de Productos y bandeja de **Consultas (CRM)** con estados.
- “Usar como referencia” abre WhatsApp **y registra la consulta** en el CRM.
- SEO: metadata dinámica, canonical, OpenGraph, sitemap dinámico recomendado (Fase 6).

> Fases siguientes (no incluidas aún): subida de imágenes con Cloudinary, IA de
> autocompletado, blog, analítica, backups. La arquitectura ya está preparada.

---

## 1) Requisitos
- Node.js 18.18+ (recomendado 20+).
- Una base de datos PostgreSQL. Gratis y rápida: **Neon** (neon.tech) o **Vercel Postgres**.

## 2) Configurar variables
Copiá `.env.example` a `.env` y completá:
```
DATABASE_URL="postgresql://...."     # de Neon/Vercel Postgres
AUTH_SECRET="..."                    # generar con: npx auth secret
NEXT_PUBLIC_WHATSAPP="543704014443"
NEXT_PUBLIC_SITE_URL="https://www.aguirreautomatizaciones.com.ar"
# Opcional para crear el admin del seed:
ADMIN_EMAIL="admin@aguirreautomatizaciones.com.ar"
ADMIN_PASSWORD="cambia-esta-clave"
```

## 3) Instalar y preparar la base (local)
```
npm install
npx prisma db push      # crea las tablas
npm run db:seed         # carga categorías, 26 proyectos, 7 productos y el usuario admin
npm run dev             # http://localhost:3000
```
Panel: http://localhost:3000/admin  (entrar con ADMIN_EMAIL / ADMIN_PASSWORD).

## 4) Desplegar en Vercel (con tu repo de GitHub)
1. Subí este proyecto a un repositorio de GitHub (puede ser el mismo, reemplazando el
   contenido, o uno nuevo).
2. En Vercel: **Add New → Project → Import** ese repositorio.
3. En **Environment Variables** cargá las mismas del `.env` (DATABASE_URL, AUTH_SECRET,
   NEXT_PUBLIC_WHATSAPP, NEXT_PUBLIC_SITE_URL).
4. Deploy. Vercel detecta Next.js y compila solo.
5. La primera vez, ejecutá las migraciones y el seed contra la base de producción:
   - Con la `DATABASE_URL` de producción en tu `.env` local corré:
     `npx prisma db push && npm run db:seed`
   - (o configurá un comando de build que incluya `prisma migrate deploy`).
6. Apuntá tu dominio `aguirreautomatizaciones.com.ar` al proyecto en Settings → Domains.

## 5) Cómo administrar (sin tocar código)
- Entrá a `/admin`.
- **Proyectos**: crear/editar/duplicar/archivar/eliminar. El slug se autogenera; podés
  marcar “Destacado” para que aparezca en la Home (mostrá pocos, ideal 4–6).
- **Productos**: cargar motores/cámaras/accesorios (con foto o ícono) y su botón WhatsApp.
- **Consultas (CRM)**: ves cada consulta del formulario y cada “Usar como referencia”,
  con su estado (Pendiente → Contactado → Presupuestado → Aprobado → Finalizado).

## Notas
- Las fotos/videos actuales están en `public/assets/` (las mismas del sitio anterior).
  En la Fase 3 se reemplaza por subida a Cloudinary desde el panel.
- Seguridad: cambiá `ADMIN_PASSWORD` y generá un `AUTH_SECRET` propio.
- Estructura limpia y modular (`src/app`, `src/components`, `src/lib`, `prisma/`).
