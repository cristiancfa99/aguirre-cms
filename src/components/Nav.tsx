"use client";
// v4
import { useEffect, useState } from "react";
import SearchButton from "./SearchButton";

export default function Nav({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(!home);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!home) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, [home]);
  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "")} id="nav">
        <div className="bar">
          <a href="/" className="brand">
            <span className="mark"><img src="/assets/img/logo-icon-chip.webp" alt="Logo Herrería Aguirre" /></span>
            <span>AGUIRRE<small>Automatizaciones</small></span>
          </a>
          <nav className="nav-links">
            {home ? (
              <>
                <a href="/proyectos">Proyectos</a>
                <a href="#servicios">Servicios</a>
                <a href="#productos">Productos</a>
                <a href="#proceso">Proceso</a>
                <a href="#nosotros">Nosotros</a>
                <a href="#contacto">Contacto</a>
              </>
            ) : (
              <>
                <a href="/">Inicio</a>
                <a href="/proyectos" className="active">Proyectos</a>
                <a href="/#servicios">Servicios</a>
                <a href="/#productos">Productos</a>
                <a href="/#contacto">Contacto</a>
              </>
            )}
          </nav>
          <div className="nav-cta">
            <SearchButton />
            <a href="https://instagram.com/herreriaaguirre" target="_blank" rel="noopener" className="btn btn-ghost">Instagram</a>
            <a href="https://wa.me/543704014443?text=Hola%20Aguirre%20Automatizaciones%2C%20quiero%20solicitar%20un%20presupuesto" target="_blank" rel="noopener" className="btn btn-primary">Solicitar presupuesto</a>
            <button className="burger" aria-label="Menú" onClick={() => setOpen(v => !v)}><span></span><span></span><span></span></button>
          </div>
        </div>
      </header>
      <div className={"mnav" + (open ? " open" : "")} onClick={() => setOpen(false)}>
        <a href="/proyectos">Proyectos</a>
        <a href={home ? "#servicios" : "/#servicios"}>Servicios</a>
        <a href={home ? "#productos" : "/#productos"}>Productos</a>
        <a href={home ? "#contacto" : "/#contacto"}>Contacto</a>
        <a href="https://wa.me/543704014443" target="_blank" rel="noopener" className="btn btn-primary">Solicitar presupuesto</a>
      </div>
    </>
  );
}
