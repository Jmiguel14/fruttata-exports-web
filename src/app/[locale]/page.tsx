import { BadgeCheck, Handshake, Leaf, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";

const commitments = [
  { key: "quality", Icon: BadgeCheck },
  { key: "reliability", Icon: Handshake },
  { key: "origin", Icon: MapPin },
  { key: "sustainability", Icon: Leaf },
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
        {commitments.map(({ key, Icon }, index) => (
          <Reveal key={key} className="h-full" delay={(index % 2) * 100}>
            <article className="flex h-full gap-4 rounded-2xl border border-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-olive/50 hover:shadow-lg">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-olive/15 text-olive-dark">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-plum">
                  {t(`${key}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {t(`${key}Description`)}
                </p>
              </div>
            </article>
          </Reveal>
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
          className="rounded-full border border-olive-dark px-5 py-2.5 text-sm font-semibold text-olive-dark transition-colors hover:bg-olive-dark hover:text-white"
        >
          {nav("quote")}
        </Link>
      </div>
    </PageShell>
  );
}
