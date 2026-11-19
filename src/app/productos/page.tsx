import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Descubre la diversidad y riqueza de las frutas tropicales y exóticas del Ecuador.",
};

export default function ProductsPage() {
  return (
    <PageShell
      title="Nuestros productos"
      description="Descubre la diversidad y riqueza de las frutas tropicales y exóticas del Ecuador. En la siguiente fase montaremos el catálogo completo con las 16 frutas del copy."
    >
      <div className="rounded-2xl border border-dashed border-border bg-surface p-8">
        <p className="text-sm leading-6 text-muted">
          Placeholder de la Fase 1: la grilla de productos, fichas y botón
          &quot;Solicitar cotización&quot; se implementan en la Fase 2.
        </p>
        <Link
          href="/contacto"
          className="mt-6 inline-flex rounded-full bg-olive px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-olive-dark"
        >
          Solicitar cotización
        </Link>
      </div>
    </PageShell>
  );
}
