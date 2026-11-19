import Link from "next/link";
import { brand } from "@/lib/brand";
import { mainNavigation } from "@/lib/navigation";

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <p className="text-lg font-semibold tracking-wide text-plum">
            {brand.shortName.toUpperCase()}
          </p>
          <p className="max-w-sm text-sm leading-6 text-muted">{brand.tagline}</p>
          <p className="text-sm font-medium text-olive">
            {brand.values.join(" · ")}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-plum">
            Navegación
          </h2>
          <ul className="mt-4 space-y-2">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-plum"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-plum">
            Contacto
          </h2>
          <p className="text-sm leading-6 text-muted">{brand.address}</p>
          <ul className="space-y-1">
            {brand.phones.map((phone) => (
              <li key={phone.label}>
                <a
                  href={phone.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-olive"
                >
                  {phone.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-1">
            {brand.emails.map((email) => (
              <li key={email}>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-muted transition-colors hover:text-olive"
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {COPYRIGHT_YEAR} {brand.legalName}. Todos los derechos
            reservados.
          </p>
          <p>El Carmen, Manabí, Ecuador</p>
        </div>
      </div>
    </footer>
  );
}
