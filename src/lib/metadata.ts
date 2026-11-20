import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

type MetadataCopy = {
  title: string;
  description: string;
  absoluteTitle?: boolean;
};

export async function createPageMetadata(
  locale: Locale,
  href: AppPathname,
  copy: MetadataCopy,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const canonicalPath = getPathname({ locale, href });
  const canonical = new URL(canonicalPath, siteUrl).toString();
  const languages = Object.fromEntries(
    routing.locales.map((item) => [
      item,
      new URL(getPathname({ locale: item, href }), siteUrl).toString(),
    ]),
  );

  return {
    title: copy.absoluteTitle ? { absolute: copy.title } : copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": new URL(
          getPathname({ locale: routing.defaultLocale, href }),
          siteUrl,
        ).toString(),
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonical,
      siteName: t("siteName"),
      locale: locale === "es" ? "es_EC" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_EC"],
    },
  };
}
