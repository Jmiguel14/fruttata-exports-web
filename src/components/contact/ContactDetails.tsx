import { Mail, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { brand } from "@/lib/brand";

type ContactDetailsProps = {
  tone?: "light" | "dark";
  showLabels?: boolean;
};

const tones = {
  light: {
    text: "text-muted hover:text-plum",
    staticText: "text-muted",
    icon: "text-olive",
    label: "text-olive-dark",
  },
  dark: {
    text: "text-white/85 hover:text-white",
    staticText: "text-white/85",
    icon: "text-olive-light",
    label: "text-white",
  },
} as const;

export async function ContactDetails({
  tone = "light",
  showLabels = false,
}: ContactDetailsProps) {
  const footer = await getTranslations("Footer");
  const contact = await getTranslations("Contact");
  const styles = tones[tone];
  const itemClass = `flex items-center gap-3 text-sm leading-6 transition-colors ${styles.text}`;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {showLabels ? (
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${styles.label}`}
          >
            {contact("addressLabel")}
          </p>
        ) : null}
        <p
          className={`flex items-start gap-3 text-sm leading-6 ${styles.staticText}`}
        >
          <MapPin
            aria-hidden="true"
            className={`mt-0.5 h-4 w-4 shrink-0 ${styles.icon}`}
          />
          {footer("address")}
        </p>
      </div>

      <div className="space-y-2">
        {showLabels ? (
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${styles.label}`}
          >
            {contact("phones")}
          </p>
        ) : null}
        <ul className="space-y-2">
          {brand.phones.map((phone) => (
            <li key={phone.label}>
              <a
                href={phone.href}
                target="_blank"
                rel="noopener noreferrer"
                className={itemClass}
              >
                <WhatsAppIcon className={`h-4 w-4 shrink-0 ${styles.icon}`} />
                {phone.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        {showLabels ? (
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${styles.label}`}
          >
            {contact("emails")}
          </p>
        ) : null}
        <ul className="space-y-2">
          {brand.emails.map((email) => (
            <li key={email}>
              <a href={`mailto:${email}`} className={itemClass}>
                <Mail
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 ${styles.icon}`}
                />
                {email}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
