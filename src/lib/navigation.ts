import type { AppPathname } from "@/i18n/routing";

export const mainNavigation: {
  key: "home" | "products" | "about" | "contact";
  href: AppPathname;
}[] = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];
