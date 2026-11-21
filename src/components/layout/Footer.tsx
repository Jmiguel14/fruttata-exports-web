import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { Link } from "@/i18n/navigation";
import { brand } from "@/lib/brand";
import { mainNavigation } from "@/lib/navigation";

const COPYRIGHT_YEAR = 2026;

export async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");

  return (
    <footer className="mt-auto bg-olive-deep text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <span className="inline-flex rounded-2xl bg-white px-3 py-1.5">
            <Image
              src="/brand/logo-transparent.png"
              alt={brand.shortName}
              width={120}
              height={134}
              className="h-16 w-auto"
            />
          </span>
          <p className="max-w-sm text-sm leading-6 text-white/85">
            {t("tagline")}
          </p>
          <p className="text-sm font-medium text-olive-light">{t("values")}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t("navigation")}
          </h2>
          <ul className="mt-4 space-y-2">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/85 transition-colors hover:text-white"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {t("contact")}
          </h2>
          <ContactDetails tone="dark" />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-white/75 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {COPYRIGHT_YEAR} {brand.legalName} {t("rights")}
          </p>
          <p>{t("location")}</p>
        </div>
      </div>
    </footer>
  );
}
