import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { pathnames, routing, type AppPathname } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

const pages = Object.keys(pathnames) as AppPathname[];

function absoluteUrl(locale: (typeof routing.locales)[number], href: AppPathname) {
  return new URL(getPathname({ locale, href }), siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [item, absoluteUrl(item, href)]),
        ),
      },
    })),
  );
}
