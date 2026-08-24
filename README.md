# Jeweley_Web

Jewellery storefront built with Next.js 15 and React 19, deployed to
**Cloudflare Pages** via `@cloudflare/next-on-pages` — server rendering runs on
Workers at the edge rather than a Node origin.

Scope is deliberately small: a catalogue, a cart, and a checkout that handles
both outcomes.

## Structure

```
src/app/
├── HomePage.tsx           landing with carousels (Swiper + react-slick)
├── category/[slug]/       catalogue by category
├── cart/
├── checkout/
│   ├── success/           gateway returned OK
│   └── fail/              gateway returned an error — an actual page, not a toast
└── contact/
```

Checkout success and failure are separate routes with their own client
components. A payment that fails needs somewhere to land that explains what
happened and what to do next; collapsing it into a redirect back to the cart
loses the reason.

`next-seo` handles per-page metadata, which matters more here than in an app —
jewellery buyers arrive from search.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind · Swiper · Axios ·
Cloudflare Pages

## Running it

```bash
npm install && npm run dev
```
