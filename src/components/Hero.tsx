export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg"><img src="/assets/img/hero-poster.webp" alt="" aria-hidden="true" /></div>
      <img className="poster" src="/assets/img/hero-poster.webp" alt="Portón de madera WPC automatizado fabricado por Aguirre Automatizaciones en Formosa" id="heroPoster" />
      <video autoPlay muted loop playsInline preload="metadata" poster="/assets/img/hero-poster.webp" id="heroVid">
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-inner">
        <div className="reveal in">
          <span className="eyebrow">Formosa, Argentina · +10 años</span>
          <h1>Aguirre<br /><span className="acc">Automatizaciones</span></h1>
          <p className="sub">Herrería, automatización y soluciones en metal. Diseñamos, fabricamos e instalamos accesos automatizados y frentes modernos de alto nivel.</p>
          <div className="hero-actions">
            <a href="https://wa.me/543704014443?text=Hola%2C%20quiero%20un%20presupuesto%20sin%20cargo" target="_blank" rel="noopener" className="btn btn-primary">Solicitar presupuesto</a>
            <a href="/proyectos" className="btn btn-ghost">Ver proyectos</a>
          </div>
        </div>
      </div>
      <div className="hero-meta reveal in d2">
        <div className="big">10<span style={{ color: "var(--accent)" }}>+</span></div>
        <div className="lbl">Años de experiencia</div>
      </div>
      <div className="scroll-hint"><span>Scroll</span><span className="line"></span></div>
    </section>
  );
}
