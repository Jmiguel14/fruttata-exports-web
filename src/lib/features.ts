/**
 * Feature flag for the contact form. Server-side only, set in the environment.
 * Only the exact string "true" enables it; anything else keeps it off.
 */
export function isContactFormEnabled() {
  return process.env.CONTACT_FORM_ENABLED === "true";
}
