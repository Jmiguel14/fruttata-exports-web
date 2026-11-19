import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

const commitments = [
  {
    title: "Calidad",
    description: "Selección cuidadosa de nuestros productos.",
  },
  {
    title: "Confiabilidad",
    description: "Relaciones comerciales transparentes y responsables.",
  },
  {
    title: "Origen ecuatoriano",
    description: "Productos provenientes de la riqueza agrícola del Ecuador.",
  },
  {
    title: "Sostenibilidad",
    description:
      "Compromiso con los productores, las comunidades y el medioambiente.",
  },
] as const;

export default function HomePage() {
  return (
    <PageShell
      title="Bienvenidos a Fruttata Exports"
      description="Llevamos la riqueza agrícola del Ecuador a los mercados internacionales. Somos una empresa ecuatoriana especializada en la exportación de frutas tropicales y exóticas de alta calidad."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {commitments.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-border bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-plum">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/productos"
          className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-plum-dark"
        >
          Ver productos
        </Link>
        <Link
          href="/contacto"
          className="rounded-full border border-olive px-5 py-2.5 text-sm font-semibold text-olive transition-colors hover:bg-olive hover:text-white"
        >
          Solicitar cotización
        </Link>
      </div>
    </PageShell>
  );
}
