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

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Aguirre Automatizaciones",
  description: "Herrería, automatización de portones, frentes modernos y estructuras metálicas en Formosa.",
  image: `${SITE}/assets/img/hero-poster.webp`,
  url: SITE,
  telephone: "+543704014443",
  priceRange: "$$",
  areaServed: { "@type": "City", name: "Formosa" },
  address: { "@type": "PostalAddress", addressLocality: "Formosa", addressRegion: "Formosa", addressCountry: "AR" },
  sameAs: ["https://instagram.com/herreriaaguirre"],
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    opens: "08:00", closes: "18:00"
  }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body className={inter.className}>
        {children}
        <Reveals />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </body>
    </html>
  );
}
