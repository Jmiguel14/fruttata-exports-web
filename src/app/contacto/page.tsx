import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Construyamos oportunidades comerciales juntos. Contáctanos para disponibilidad, especificaciones y cotizaciones.",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Construyamos oportunidades comerciales juntos"
      description="¿Eres importador, distribuidor, mayorista o profesional de la industria alimentaria y buscas frutas tropicales y exóticas de calidad? En Fruttata Exports estaremos encantados de atenderte."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-border bg-surface p-8">
          <h2 className="text-lg font-semibold text-plum">
            Formulario de contacto
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Placeholder de la Fase 1. El formulario con validación y envío de
            correo se implementa en la Fase 4.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8">
          <h2 className="text-lg font-semibold text-plum">
            Información de contacto
          </h2>
          <p className="mt-4 text-sm font-medium text-foreground">
            {brand.legalName}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">{brand.address}</p>

          <div className="mt-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-olive">
              Teléfonos / WhatsApp
            </p>
            {brand.phones.map((phone) => (
              <a
                key={phone.label}
                href={phone.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted transition-colors hover:text-plum"
              >
                {phone.label}
              </a>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-olive">
              Correos electrónicos
            </p>
            {brand.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="block text-sm text-muted transition-colors hover:text-plum"
              >
                {email}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
