# Deliorman Danışmanlık — Company Website

Multilingual marketing website for **Deliorman Danışmanlık**, a consulting firm in Ankara that has handled Bulgarian visa, passport and citizenship procedures since 2009.

**Live:** https://deliormandanismanlik.com

| Desktop | Mobile |
|---|---|
| ![Desktop](docs/screenshot-desktop.png) | ![Mobile](docs/screenshot-mobile.png) |

## Features
- **Three languages** — Turkish, English and Bulgarian with a runtime language switcher (`vue-i18n`)
- **Contact form** with client-side validation (`vee-validate`) and a required KVKK (Turkish GDPR) consent, delivered by email through **Web3Forms** (`VITE_WEB3FORMS_KEY` in `.env`)
- **Privacy notice** dialog (KVKK) and localized validation messages
- **WhatsApp** floating contact button and location sharing
- **Google Maps** embed with one-click directions
- Responsive layout built with **Vuetify 3**; services, process and team sections are data-driven from the translation files
- **SEO** — meta / Open Graph / Twitter tags, canonical URL, schema.org business data, and `sitemap.xml` / `robots.txt` generated at build time from `VITE_SITE_URL`

## Tech stack
Vue 3 (`<script setup>`) · Vite · Vuetify 3 · vue-i18n · vee-validate · Sass · Cloudflare Workers static assets (hosting) · Web3Forms (contact form)

## Project structure
```
src/
  App.vue                 # page layout: hero, process, services, about, team, contact, location, footer
  components/sections/    # TeamSection, LocationSection
  i18n/{tr,en,bg}/        # translation files (all page content lives here)
  plugins/                # i18n and validation setup
public/                   # logo
.env                      # VITE_SITE_URL: live site address used for canonical, Open Graph, sitemap.xml and robots.txt
```

## Run locally
```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # production build in dist/
```

## Deploy (Cloudflare)
Connect the GitHub repo in Cloudflare → Workers & Pages → Create → Import a repository. Build command `pnpm build`, deploy command `npx wrangler deploy` (settings in `wrangler.jsonc`, headers in `public/_headers`).

## Author
Designed and built by **Nazlı Ece Deliormanlı**.
