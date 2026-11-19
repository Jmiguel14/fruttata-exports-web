import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Fruttata Exports es una empresa ecuatoriana dedicada a la exportación de frutas tropicales y exóticas.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="¿Quiénes somos?"
      description="Fruttata Exports es una empresa ecuatoriana dedicada a la exportación de frutas tropicales y exóticas hacia los mercados internacionales."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-plum">Nuestra misión</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Conectar la excelencia agrícola ecuatoriana con los mercados
            internacionales mediante la exportación de frutas tropicales y
            exóticas de alta calidad, promoviendo el abastecimiento responsable,
            cadenas de suministro confiables y relaciones comerciales
            sostenibles con productores y clientes.
          </p>
        </article>
        <article className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-plum">Nuestra visión</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Consolidarnos como una empresa ecuatoriana reconocida en los
            mercados internacionales por la exportación de frutas tropicales y
            exóticas, distinguiéndonos por la calidad de nuestros productos, la
            confiabilidad comercial, la innovación y nuestro compromiso con el
            desarrollo sostenible.
          </p>
        </article>
      </div>
    </PageShell>
  );
}
