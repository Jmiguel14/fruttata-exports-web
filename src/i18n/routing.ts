import { defineRouting } from "next-intl/routing";

export const pathnames = {
  "/": "/",
  "/products": {
    es: "/productos",
    en: "/products",
  },
  "/about": {
    es: "/nosotros",
    en: "/about",
  },
  "/contact": {
    es: "/contacto",
    en: "/contact",
  },
} as const;

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  localeDetection: false,
  pathnames,
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof pathnames;
