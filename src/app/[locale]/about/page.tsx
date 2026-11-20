import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { routing, type Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return createPageMetadata(locale, "/about", {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const t = await getTranslations("About");

  return (
    <PageShell title={t("title")} description={t("description")}>
      <p className="max-w-3xl text-base leading-7 text-muted">{t("body")}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-plum">{t("missionTitle")}</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{t("mission")}</p>
        </article>
        <article className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-plum">{t("visionTitle")}</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{t("vision")}</p>
        </article>
      </div>
    </PageShell>
  );
}
