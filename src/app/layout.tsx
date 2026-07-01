import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Reveals from "@/components/Reveals";

const inter = Inter({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aguirreautomatizaciones.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Aguirre Automatizaciones | Portones automáticos, frentes y herrería en Formosa", template: "%s | Aguirre Automatizaciones" },
  description: "Diseño, fabricación e instalación de portones automáticos, frentes modernos, rejas y estructuras metálicas en Formosa. Más de 10 años de experiencia. Presupuesto sin cargo.",
  keywords: ["automatización de portones Formosa","herrería en Formosa","portones automáticos Formosa","frentes modernos Formosa","rejas Formosa","estructuras metálicas Formosa"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "es_AR", siteName: "Aguirre Automatizaciones", images: ["/assets/img/hero-poster.webp"] },
  icons: { icon: "/assets/img/favicon.png", apple: "/assets/img/apple-touch-icon.png" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body className={inter.className}>{children}<Reveals /></body>
    </html>
  );
}
