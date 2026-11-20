"use client";

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center"
          onClick={() => setIsMenuOpen(false)}
          aria-label={t("homeLabel")}
        >
          <Image
            src="/brand/logo-transparent.png"
            alt="Fruttata Exports"
            width={120}
            height={134}
            className="h-14 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t("main")}>
          {mainNavigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-plum/10 text-plum"
                    : "text-foreground hover:bg-surface hover:text-plum"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-plum px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-plum-dark"
          >
            {t("quote")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-border p-2 text-foreground md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">{t("main")}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
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
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    active
                      ? "bg-plum/10 text-plum"
                      : "text-foreground hover:bg-surface"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center justify-between gap-3">
              <LanguageSwitcher />
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full bg-plum px-4 py-2 text-center text-sm font-semibold text-white hover:bg-plum-dark"
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
