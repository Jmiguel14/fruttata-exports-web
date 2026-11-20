# Fruttata Exports Web

Informative corporate website for Fruttata Exports S.A.S., built with Next.js, TypeScript, Tailwind CSS, and next-intl.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- next-intl
- Deploy target: Vercel

## Routes

Internal folders stay in English. Public URLs are localized.

| Internal path | Spanish | English |
| --- | --- | --- |
| `/` | `/es` | `/en` |
| `/products` | `/es/productos` | `/en/products` |
| `/about` | `/es/nosotros` | `/en/about` |
| `/contact` | `/es/contacto` | `/en/contact` |

`/` redirects to `/es`.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Upcoming

- Contact form behind `CONTACT_FORM_ENABLED`, sent with Resend
- Favicon, Open Graph image, and Vercel deploy
