"use client";
import { useState } from "react";
import { createInquiry } from "@/app/actions/inquiries";
import { waLink } from "@/lib/whatsapp";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  async function action(formData: FormData) {
    await createInquiry(formData);
    const msg = `Hola Aguirre Automatizaciones! Quiero un presupuesto.\n\nNombre: ${formData.get("name")}\nTel: ${formData.get("phone")}\nServicio: ${formData.get("servicio")}\nDetalle: ${formData.get("message") || "-"}`;
    window.open(waLink(msg), "_blank");
    setSent(true);
  }
  return (
    <form action={action}>
      <div className="field"><label>Nombre y apellido</label><input type="text" name="name" placeholder="Tu nombre" required /></div>
      <div className="field"><label>WhatsApp / Teléfono</label><input type="tel" name="phone" placeholder="370 ..." required /></div>
      <div className="field"><label>¿Qué necesitás?</label>
        <select name="servicio">
          <option>Automatización de portón</option><option>Frente / portón nuevo</option>
          <option>Reja o baranda</option><option>Estructura metálica</option>
          <option>Parrilla / quincho</option><option>Cámaras / seguridad</option><option>Otro</option>
        </select>
      </div>
      <div className="field"><label>Detalle del proyecto</label><textarea name="message" placeholder="Contanos medidas, ubicación o lo que tengas en mente..."></textarea></div>
      <button type="submit" className="btn btn-primary">Enviar por WhatsApp
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
      <p className="form-note">{sent ? "¡Gracias! Tu consulta quedó registrada y se abrió WhatsApp." : "Se abre WhatsApp con tu consulta y queda registrada en el panel."}</p>
    </form>
  );
}
