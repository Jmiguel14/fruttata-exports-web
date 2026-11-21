import { getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { brand } from "@/lib/brand";

export async function WhatsAppCta() {
  const t = await getTranslations("Contact");
  const text = encodeURIComponent(t("whatsappMessage"));

  return (
    <div className="h-full rounded-2xl bg-olive-deep p-6 text-white sm:p-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
        <WhatsAppIcon className="h-6 w-6" />
      </span>
      <h2 className="mt-4 text-lg font-semibold">{t("whatsappTitle")}</h2>
      <p className="mt-2 text-sm leading-6 text-white/85">
        {t("whatsappDescription")}
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {brand.phones.map((phone) => (
          <a
            key={phone.label}
            href={`${phone.href}?text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-olive-deep transition-colors hover:bg-surface"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {phone.label}
          </a>
        ))}
      </div>
    </div>
  );
}
