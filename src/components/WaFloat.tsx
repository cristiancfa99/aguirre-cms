const WA = (
  <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.042v.335zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
);
const CAM = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={1.9}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
);

export default function WaFloat() {
  const fotoMsg = "Hola. Quiero enviar una fotografía de mi frente para solicitar un presupuesto.";
  return (
    <div className="wa-stack">
      <a className="foto-float" href={`https://wa.me/543704014443?text=${encodeURIComponent(fotoMsg)}`} target="_blank" rel="noopener" aria-label="Enviar foto para presupuesto">
        <span className="ic">{CAM}</span>
        <span className="lbl">Enviar foto para presupuesto</span>
      </a>
      <a className="wa-float" href="https://wa.me/543704014443?text=Hola%20Aguirre%20Automatizaciones%2C%20quiero%20un%20presupuesto" target="_blank" rel="noopener" aria-label="WhatsApp">
        <span className="wa-pulse"></span>
        <span className="ic">{WA}</span>
        <span className="lbl">Pedí tu presupuesto</span>
      </a>
    </div>
  );
}
