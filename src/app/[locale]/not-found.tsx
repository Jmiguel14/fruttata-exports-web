import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Link } from "@/i18n/navigation";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFound");

  return (
    <PageShell title={t("title")} description={t("description")}>
      <Link
        href="/"
        className="inline-flex rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-plum-dark"
      >
        {t("backHome")}
      </Link>
    </PageShell>
  );
}
