import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { routing, type Locale } from "@/i18n/routing";
import { brand } from "@/lib/brand";
import { createPageMetadata } from "@/lib/metadata";

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
  const footer = await getTranslations("Footer");

  return (
    <PageShell title={t("title")} description={t("description")}>
      <p className="max-w-3xl text-base leading-7 text-muted">{t("body")}</p>

      <div className="mt-8 max-w-xl rounded-2xl border border-border bg-white p-8">
        <h2 className="text-lg font-semibold text-plum">{t("infoTitle")}</h2>
        <p className="mt-4 text-sm font-medium text-foreground">
          {brand.legalName}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">{footer("address")}</p>

        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-olive">
            {t("phones")}
          </p>
          {brand.phones.map((phone) => (
            <a
              key={phone.label}
              href={phone.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-muted transition-colors hover:text-plum"
            >
              {phone.label}
            </a>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-olive">
            {t("emails")}
          </p>
          {brand.emails.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="block text-sm text-muted transition-colors hover:text-plum"
            >
              {email}
            </a>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
