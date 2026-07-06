export function Servicios() {
  return (
    <section className="pad" id="servicios">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Lo que hacemos</span>
          <h2>Soluciones metálicas<br />integrales.</h2>
          <p>Cinco líneas de trabajo bajo un mismo estándar de fabricación y terminación.</p>
        </div>
        <div className="svc-grid">
          <div className="svc reveal"><div className="ico"><svg viewBox="0 0 24 24"><path d="M3 12h18M3 12l4-4M3 12l4 4M21 6v12"/></svg></div><h3>Automatización</h3><ul><li>Portones corredizos</li><li>Portones levadizos</li><li>Motores PPA y SEG</li><li>Reparaciones y service</li></ul></div>
          <div className="svc reveal d1"><div className="ico"><svg viewBox="0 0 24 24"><path d="M3 21V5l9-2 9 2v16M3 21h18M9 21v-6h6v6"/></svg></div><h3>Frentes Modernos</h3><ul><li>Portones completos</li><li>Puertas peatonales</li><li>Cerramientos modernos</li><li>Diseño a medida</li></ul></div>
          <div className="svc reveal d2"><div className="ico"><svg viewBox="0 0 24 24"><path d="M4 3v18M9 3v18M14 3v18M19 3v18M2 7h20M2 17h20"/></svg></div><h3>Herrería General</h3><ul><li>Rejas</li><li>Barandas</li><li>Escaleras</li><li>Estructuras metálicas</li></ul></div>
          <div className="svc reveal"><div className="ico"><svg viewBox="0 0 24 24"><path d="M4 14h16M6 14v6M18 14v6M8 8h8l1 6H7l1-6z"/></svg></div><h3>Quinchos</h3><ul><li>Parrillas</li><li>Parrilleros corredizos</li><li>Muebles metálicos</li><li>Asadores a medida</li></ul></div>
          <div className="svc reveal d1"><div className="ico"><svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4zM9 12l2 2 4-4"/></svg></div><h3>Seguridad</h3><ul><li>Venta de cámaras</li><li>Accesorios de seguridad</li><li>Control de accesos</li><li>Asesoramiento</li></ul></div>
          <div className="svc reveal d2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--accent)", color: "#000", borderColor: "var(--accent)" }}>
            <h3 style={{ color: "#000", fontSize: "1.5rem" }}>¿Tenés un proyecto<br />en mente?</h3>
            <p style={{ margin: "10px 0 22px", fontSize: ".95rem", color: "rgba(0,0,0,.7)" }}>Contanos qué necesitás y te armamos un presupuesto sin cargo.</p>
            <a href="https://wa.me/543704014443?text=Hola%2C%20tengo%20un%20proyecto%20en%20mente" target="_blank" rel="noopener" className="btn" style={{ background: "#000", color: "#fff", alignSelf: "flex-start" }}>Escribir por WhatsApp →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Proceso() {
  const steps = [
    ["01", "Relevamiento", "Visitamos el lugar, tomamos medidas y entendemos exactamente qué necesitás."],
    ["02", "Diseño", "Proyectamos la solución a medida, con materiales y terminaciones definidas."],
    ["03", "Fabricación", "Construimos en taller propio con control de calidad en cada pieza."],
    ["04", "Instalación", "Montaje profesional en obra, prolijo y a término."],
    ["05", "Automatización", "Integramos motores PPA y SEG, accesos y accesorios de seguridad."],
    ["06", "Entrega", "Probamos el funcionamiento, te explicamos el uso y dejamos todo operativo."],
  ];
  return (
    <section className="pad proceso" id="proceso">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Cómo trabajamos</span>
          <h2>Un proceso de<br />ingeniería, paso a paso.</h2>
          <p>Del primer relevamiento a la entrega final, cada etapa está controlada.</p>
        </div>
        <div className="steps">
          {steps.map(([n, t, d], i) => (
            <div className={"step reveal" + (i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : "")} key={n}>
              <div className="n">{n}</div><h3>{t}</h3><p>{d}</p>
            </div>
          ))}
        </div>
        <div className="band reveal">
          <span>Todo empieza con un relevamiento sin cargo. Contanos qué necesitás.</span>
          <a href="https://wa.me/543704014443?text=Hola%2C%20quiero%20coordinar%20un%20relevamiento%20sin%20cargo" target="_blank" rel="noopener" className="btn btn-primary">Empezar por el relevamiento →</a>
        </div>
      </div>
    </section>
  );
}

export function Nosotros() {
  const items = [
    ["Más de 10 años de experiencia", "Trayectoria comprobable en proyectos reales de la ciudad y la zona."],
    ["Presupuesto sin cargo", "Te asesoramos y cotizamos sin compromiso, antes de decidir."],
    ["Fabricación propia", "Controlamos calidad y plazos porque construimos en nuestro taller."],
    ["Instalación profesional", "Montaje prolijo y automatización integrada que funciona desde el día uno."],
    ["Atención personalizada", "Trato directo con quien fabrica e instala tu proyecto."],
  ];
  return (
    <section className="pad" id="nosotros">
      <div className="wrap">
        <div className="diff">
          <div className="media-col reveal"><img src="/assets/img/p06-frente-corredizo.webp" alt="Frente moderno con portón levadizo en Formosa" loading="lazy" /></div>
          <div>
            <div className="section-head reveal" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Por qué Aguirre</span>
              <h2 style={{ fontSize: "clamp(1.9rem,4.4vw,3rem)" }}>No es herrería.<br />Es ingeniería en metal.</h2>
              <p>Más de una década resolviendo accesos, frentes y estructuras en Formosa, con fabricación propia y atención directa.</p>
            </div>
            <div className="diff-list">
              {items.map(([h, d], i) => (
                <div className={"diff-item reveal" + (i ? " d" + i : "")} key={i}>
                  <div className="ck"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></div>
                  <div><h4>{h}</h4><p>{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="stat reveal"><div className="v">10<span>+</span></div><div className="l">Años de experiencia</div></div>
          <div className="stat reveal d1"><div className="v">100<span>%</span></div><div className="l">Fabricación propia</div></div>
          <div className="stat reveal d2"><div className="v">+250</div><div className="l">Proyectos realizados</div></div>
          <div className="stat reveal d3"><div className="v">$0</div><div className="l">Costo de presupuesto</div></div>
        </div>
      </div>
    </section>
  );
}

type T = { id: string; client: string; neighborhood: string | null; work: string | null; message: string; rating: number };
export function Testimonios({ items }: { items: T[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="pad" id="testimonios" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Lo que dicen</span>
          <h2>Clientes que ya<br />confiaron en nosotros.</h2>
          <p>Trabajos entregados en Formosa y la zona. La mejor referencia es un cliente conforme.</p>
        </div>
        <div className="tmn-grid">
          {items.map((t, i) => (
            <figure className={"tmn reveal" + (i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : "")} key={t.id}>
              <div className="tmn-stars" aria-label={`${t.rating} de 5`}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <svg key={k} viewBox="0 0 24 24" className={k < t.rating ? "on" : ""}><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
                ))}
              </div>
              <blockquote>{t.message}</blockquote>
              <figcaption>
                <span className="tmn-name">{t.client}</span>
                <span className="tmn-meta">{[t.work, t.neighborhood].filter(Boolean).join(" · ")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contacto({ form }: { form: React.ReactNode }) {
  return (
    <section className="pad" id="contacto" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="wrap">
        <div className="contact">
          <div className="info">
            <div className="reveal">
              <span className="eyebrow">Contacto</span>
              <h2>Pedí tu presupuesto<br />sin cargo.</h2>
              <p className="lead">Contanos qué necesitás. Respondemos rápido por WhatsApp y coordinamos una visita.</p>
            </div>
            <div className="cinfo reveal d1">
              <a href="https://wa.me/543704014443" target="_blank" rel="noopener"><span className="ic"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span><span className="k">WhatsApp</span><br /><span className="val">370 401-4443</span></span></a>
              <a href="tel:+543704014443"><span className="ic"><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></svg></span><span><span className="k">Llamar</span><br /><span className="val">370 401-4443</span></span></a>
              <a href="https://instagram.com/herreriaaguirre" target="_blank" rel="noopener"><span className="ic"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg></span><span><span className="k">Instagram</span><br /><span className="val">@herreriaaguirre</span></span></a>
            </div>
            <div className="map-wrap reveal d2"><iframe loading="lazy" title="Ubicación Formosa" src="https://www.google.com/maps?q=Formosa,+Argentina&output=embed"></iframe></div>
          </div>
          <div className="reveal d1">{form}</div>
        </div>
      </div>
    </section>
  );
}
