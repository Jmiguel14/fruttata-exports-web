"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export function LanguageSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-border px-1 py-1"
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((item) => {
        const active = item === locale;

        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            hrefLang={item}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ${
              active
                ? "bg-plum text-white"
                : "text-muted hover:text-plum"
            }`}
          >
            {labels[item]}
          </Link>
        );
      })}
    </div>
  );
}
