"use client";
import { trackReference } from "@/app/actions/inquiries";
import { waLink, referenceMessage } from "@/lib/whatsapp";
export default function ReferenceButton({ id, title, slug }: { id: string; title: string; slug: string }) {
  return (
    <button className="lb-ref" type="button" onClick={() => { trackReference(id); window.open(waLink(referenceMessage(title, slug)), "_blank"); }}>
      <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z"/></svg>
      Usar como referencia
    </button>
  );
}
