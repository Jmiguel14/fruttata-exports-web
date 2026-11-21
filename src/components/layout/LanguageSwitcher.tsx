"use client";

import { EC, US } from "country-flag-icons/react/3x2";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const languages: Record<Locale, { label: string; Flag: typeof EC }> = {
  es: { label: "ES", Flag: EC },
  en: { label: "EN", Flag: US },
};

export function LanguageSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/30 p-1"
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((item) => {
        const active = item === locale;
        const { label, Flag } = languages[item];

        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            hrefLang={item}
            aria-current={active ? "page" : undefined}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold tracking-wide transition-colors ${
              active
                ? "bg-white text-olive-deep"
                : "text-white/90 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Flag aria-hidden="true" className="h-3.5 w-5 rounded-[2px]" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
