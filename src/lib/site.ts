function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;

  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (vercelDomain) {
    return `https://${vercelDomain}`;
  }

  return "https://fruttataglobal.com";
}

export const siteUrl = resolveSiteUrl();
