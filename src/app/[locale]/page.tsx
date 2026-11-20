import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";

const commitmentKeys = [
  "quality",
  "reliability",
  "origin",
  "sustainability",
] as const;

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return createPageMetadata(locale, "/", {
    title: t("homeTitle"),
    description: t("homeDescription"),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const t = await getTranslations("Home");
  const nav = await getTranslations("Nav");

  return (
    <PageShell title={t("title")} description={t("description")}>
      <h2 className="text-xl font-semibold text-plum">{t("commitmentsTitle")}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {commitmentKeys.map((key) => (
          <article
            key={key}
            className="rounded-2xl border border-border bg-white p-6"
          >
            <h3 className="text-lg font-semibold text-plum">
              {t(`${key}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {t(`${key}Description`)}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/products"
          className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-plum-dark"
        >
          {t("viewProducts")}
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-olive px-5 py-2.5 text-sm font-semibold text-olive transition-colors hover:bg-olive hover:text-white"
        >
          {nav("quote")}
        </Link>
      </div>
    </PageShell>
  );
}
