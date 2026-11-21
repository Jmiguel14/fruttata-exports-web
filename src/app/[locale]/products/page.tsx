import { Check } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { products } from "@/lib/products";

const specKeys = [
  "specOrigin",
  "specGrades",
  "specWeight",
  "specQuality",
  "specShelfLife",
  "specSeason",
  "specPackaging",
] as const;

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return createPageMetadata(locale, "/products", {
    title: t("productsTitle"),
    description: t("productsDescription"),
  });
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const t = await getTranslations("Products");
  const nav = await getTranslations("Nav");
  const currentLocale = locale as Locale;

  return (
    <PageShell title={t("title")} description={t("description")}>
      <h2 className="text-xl font-semibold text-plum">{t("portfolio")}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.id} className="h-full" delay={(index % 3) * 100}>
            <ProductCard
              product={product}
              locale={currentLocale}
              quoteLabel={nav("quote")}
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-plum">{t("specsTitle")}</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{t("specsIntro")}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {specKeys.map((key) => (
              <li
                key={key}
                className="flex items-start gap-2.5 text-sm leading-6 text-foreground"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-olive-dark"
                />
                {t(key)}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal className="mt-10">
        <section>
          <h2 className="text-xl font-semibold text-plum">{t("specificTitle")}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            {t("specificDescription")}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-olive-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-olive-deep"
          >
            {nav("quote")}
          </Link>
        </section>
      </Reveal>
    </PageShell>
  );
}
