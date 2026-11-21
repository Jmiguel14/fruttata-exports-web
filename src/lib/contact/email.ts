import { Resend } from "resend";
import type { Locale } from "@/i18n/routing";
import { products } from "@/lib/products";
import type { ContactFormValues } from "@/lib/contact/types";

const productNames = new Map(
  products.map((product) => [product.id, product.name.es]),
);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function splitEmails(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

/**
 * Sends the contact inquiry to the sales team through Resend.
 * The email is always written in Spanish for the team; the visitor language
 * is included as a line. Throws if configuration or delivery fails.
 */
export async function sendContactEmail(
  values: ContactFormValues,
  locale: Locale,
) {
  const resend = new Resend(requireEnv("RESEND_API_KEY"));
  const from = requireEnv("RESEND_FROM_EMAIL");
  const to = splitEmails(requireEnv("CONTACT_TO_EMAIL"));
  const cc = splitEmails(process.env.CONTACT_CC_EMAIL);

  const selectedProducts = values.products.length
    ? values.products.map((id) => productNames.get(id) ?? id).join(", ")
    : "No especificado";

  const rows: [string, string][] = [
    ["Nombre completo", values.fullName],
    ["Empresa", values.company],
    ["País", values.country],
    ["Correo electrónico", values.email],
    ["Teléfono / WhatsApp", values.phone],
    ["Productos de interés", selectedProducts],
    ["Volumen estimado de compra", values.volume || "No especificado"],
    ["Idioma del visitante", locale === "es" ? "Español" : "Inglés"],
  ];

  const text = [
    "Nueva consulta desde el sitio web",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Mensaje:",
    values.message,
  ].join("\n");

  const html = `
    <h2>Nueva consulta desde el sitio web</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3>Mensaje</h3>
    <p style="white-space:pre-wrap">${escapeHtml(values.message)}</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to,
    cc: cc.length ? cc : undefined,
    replyTo: values.email,
    subject: `Nueva consulta web: ${singleLine(values.company)} (${singleLine(values.country)})`,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
