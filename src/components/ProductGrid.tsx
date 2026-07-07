// v4
import Link from "next/link";
import { waLink } from "@/lib/whatsapp";

const ICONS: Record<string, React.ReactNode> = {
  seg: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>,
  cam: <svg viewBox="0 0 24 24"><path d="M23 7l-7 5 7 5V7zM1 5h15v14H1z"/></svg>,
  remote: <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.5 4.2A8 8 0 0 1 12 3a9 9 0 0 1 9 9c0 1.6-.4 3-1 4.3"/><path d="M3 12a9 9 0 0 0 9 9 8 8 0 0 0 4.5-1.3"/></svg>,
  sensor: <svg viewBox="0 0 24 24"><path d="M4 12h4M16 12h4M8 12a4 4 0 0 1 8 0M12 4v2M12 18v2"/></svg>,
  acc: <svg viewBox="0 0 24 24"><path d="M12 2l3 5 5 .7-3.6 3.5.8 5L12 18.5 6.8 16.2l.8-5L4 7.7 9 7z"/></svg>,
};
const WA = <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.042v.335zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>;

type P = { slug: string; name: string; description: string; thumbnail: string | null; badge: string | null; iconKey: string | null; brand?: string | null };
export default function ProductGrid({ products }: { products: P[] }) {
  return (
    <div className="prod-grid">
      {products.map((p, i) => {
        const href = waLink(`Hola Aguirre Automatizaciones! Quiero consultar por ${p.name}. ¿Precio y disponibilidad?`);
        return (
          <div className="pcard" key={i}>
            <Link href={`/productos/${p.slug}`} className="pcard-link" aria-label={`Ver ${p.name}`}>
              {p.thumbnail ? (
                <div className="ph"><img src={p.thumbnail} alt={p.name} loading="lazy" decoding="async" />{p.badge && <span className="badge">{p.badge}</span>}</div>
              ) : (
                <div className="pico">{ICONS[p.iconKey || "acc"]}</div>
              )}
            </Link>
            <div className="pb">
              {p.brand && <span className="pbrand">{p.brand}</span>}
              <h3><Link href={`/productos/${p.slug}`}>{p.name}</Link></h3>
              <p>{p.description}</p>
              <a className="pcta" href={href} target="_blank" rel="noopener">{WA}Consultar por WhatsApp</a>
            </div>
          </div>
        );
      })}
    </div>
 