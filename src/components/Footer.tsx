export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <a href="/" className="brand" style={{ fontSize: "1.3rem" }}>
              <span className="mark"><img src="/assets/img/logo-icon-chip.webp" alt="Logo Herrería Aguirre" /></span>
              <span>AGUIRRE<small>Automatizaciones</small></span>
            </a>
            <p style={{ color: "var(--muted)", maxWidth: 300, marginTop: 18, fontSize: ".92rem" }}>
              Herrería, automatización y soluciones en metal para Formosa. Diseño, fabricación e instalación.
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h5>Navegación</h5>
              <a href="/">Inicio</a><a href="/proyectos">Proyectos</a><a href="/#servicios">Servicios</a><a href="/#productos">Productos</a><a href="/#contacto">Contacto</a>
            </div>
            <div className="foot-col">
              <h5>Contacto</h5>
              <a href="https://wa.me/543704014443" target="_blank" rel="noopener">WhatsApp 370 401-4443</a>
              <a href="tel:+543704014443">Llamar: 370 401-4443</a>
              <a href="https://instagram.com/herreriaaguirre" target="_blank" rel="noopener">@herreriaaguirre</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Aguirre Automatizaciones. Todos los derechos reservados.</span>
          <span>Formosa · Argentina · Presupuesto sin cargo</span>
        </div>
      </div>
    </footer>
  );
}
