import { Eye, Target } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
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

  const cards = [
    { key: "mission", Icon: Target },
    { key: "vision", Icon: Eye },
  ] as const;

  return (
    <PageShell title={t("title")} description={t("description")}>
      <p className="max-w-3xl text-base leading-7 text-muted">{t("body")}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {cards.map(({ key, Icon }, index) => (
          <Reveal key={key} className="h-full" delay={index * 120}>
            <article className="h-full rounded-2xl border border-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-olive/50 hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-olive/15 text-olive-dark">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-plum">
                {t(`${key}Title`)}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{t(key)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
