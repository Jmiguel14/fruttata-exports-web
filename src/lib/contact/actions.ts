"use server";

import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { sendContactEmail } from "@/lib/contact/email";
import {
  readContactValues,
  validateContactValues,
} from "@/lib/contact/schema";
import type { ContactFormState } from "@/lib/contact/types";
import { isContactFormEnabled } from "@/lib/features";

const MIN_FILL_TIME_MS = 2000;

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = readContactValues(formData);

  if (!isContactFormEnabled()) {
    return { status: "error", fieldErrors: {}, values, formError: "disabled" };
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success.
  const honeypot = formData.get("website");

  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success", fieldErrors: {}, values };
  }

  // Time trap: bots submit instantly. The timestamp is set by the browser.
  const startedAt = Number(formData.get("startedAt"));

  if (startedAt && Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { status: "success", fieldErrors: {}, values };
  }

  const validation = validateContactValues(values);

  if (!validation.success) {
    return { status: "error", fieldErrors: validation.fieldErrors, values };
  }

  const submittedLocale = formData.get("locale");
  const locale: Locale = hasLocale(routing.locales, submittedLocale)
    ? submittedLocale
    : routing.defaultLocale;

  try {
    await sendContactEmail(validation.values, locale);
  } catch (error) {
    console.error("Contact form email failed", error);

    return {
      status: "error",
      fieldErrors: {},
      values,
      formError: "send_failed",
    };
  }

  return { status: "success", fieldErrors: {}, values };
}
