import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { routing, type Locale } from "@/i18n/routing";
import { brand } from "@/lib/brand";
import { isContactFormEnabled } from "@/lib/features";
import { createPageMetadata } from "@/lib/metadata";
import { products } from "@/lib/products";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return createPageMetadata(locale, "/contact", {
    title: t("contactTitle"),
    description: t("contactDescription"),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const t = await getTranslations("Contact");
  const form = await getTranslations("Form");
  const formEnabled = isContactFormEnabled();

  const productOptions = products.map((product) => ({
    id: product.id,
    name: product.name[locale as Locale],
  }));

  const infoCard = (
    <div className="h-full rounded-2xl border border-border bg-white p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-plum">{t("infoTitle")}</h2>
      <p className="mt-3 mb-6 text-sm font-medium text-foreground">
        {brand.legalName}
      </p>
      <ContactDetails showLabels />
    </div>
  );

  return (
    <PageShell title={t("title")} description={t("description")}>
      <p className="max-w-3xl text-base leading-7 text-muted">{t("body")}</p>

      {formEnabled ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h2 className="mb-5 text-lg font-semibold text-plum">
                {form("title")}
              </h2>
              <Suspense
                fallback={
                  <div className="h-96 animate-pulse rounded-xl bg-surface" />
                }
              >
                <ContactForm productOptions={productOptions} />
              </Suspense>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-2" delay={120}>
            {infoCard}
          </Reveal>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Reveal className="h-full">
            <WhatsAppCta />
          </Reveal>
          <Reveal className="h-full" delay={120}>
            {infoCard}
          </Reveal>
        </div>
      )}
    </PageShell>
  );
}
