"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { mainNavigation } from "@/lib/navigation";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-olive-dark text-white shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center rounded-2xl bg-white px-3 py-1.5"
          onClick={() => setIsMenuOpen(false)}
          aria-label={t("homeLabel")}
        >
          <Image
            src="/brand/logo-transparent.png"
            alt="Fruttata Exports"
            width={120}
            height={134}
            className="h-16 w-auto md:h-[4.5rem]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label={t("main")}>
          {mainNavigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-white px-5 py-2.5 text-base font-semibold text-plum transition-colors hover:bg-surface"
          >
            {t("quote")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/30 p-2.5 text-white transition-colors hover:bg-white/10 xl:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="h-6 w-6" />
          ) : (
            <Menu aria-hidden="true" className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-white/15 bg-olive-dark xl:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6"
            aria-label={t("main")}
          >
            {mainNavigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-4 py-3 text-base font-medium ${
                    active
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <LanguageSwitcher />
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full bg-white px-5 py-2.5 text-center text-base font-semibold text-plum hover:bg-surface"
              >
                {t("quote")}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
