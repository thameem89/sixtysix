# SIXTY SIX — Men’s Grooming Lounge

A photography-led, two-page website for the January 2027 Ajman launch. This revision rebrands the existing architecture around premium men’s grooming and follows the latest brief and studies CHALK’s photographic ambition while using original layouts, the supplied SIXTY SIX identity and independently licensed images. No GitHub push or production deployment was performed.

## Local preview

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. For a local production preview: `npm run build`, then `npm run start`.

## What changed

- Near full-screen campaign hero with responsive portrait crops, overlay navigation and restrained entrance motion.
- Architectural introduction with a layered detail image, six-category asymmetric service composition, full-width grooming campaign and a dark, three-photograph studio narrative.
- Nine-image editorial gallery with filtering, next/previous, arrow keys, Escape-to-close and touch-swipe handlers. Mobile uses a horizontal, intentionally sized gallery.
- Photo-led launch campaign, priority access form, six-question native FAQ accordion, location and oversized footer wordmark.
- Services page with its own photographic hero, sticky category navigation and six alternating image/menu sections. The 30 illustrative services show “Price on request”; no price list or timings have been invented.
- Service dialogs include relevant photography. Appointment and priority enquiries support one to eight selected services, optional messages, consent, UAE mobile validation and explicit loading/success/error feedback.
- Staff and professional product sections remain data-driven and hidden until official profiles/brands are supplied. Real transformations are ready for side-by-side presentation, without fabricated results. Testimonials remain disabled.
- Two primary routes only: `/` and `/services`. Privacy and Terms remain compact, accessible dialogs. API, robots and sitemap are supporting endpoints.

## Art direction and imagery

The research and visual system are documented in [docs/ART_DIRECTION.md](docs/ART_DIRECTION.md).

`src/data/siteImages.ts` is the image manifest entry point. It combines:

- 28 new Pexels photographs, with source pages, photographer credits, license references, alt text, dimensions, crop positioning and loading metadata in `src/data/image-manifest.json`.
- 2 retained, locally optimized Unsplash grooming photographs.
- 2 supplied brand assets: the logo and launch poster, optimized as WebP. Original PNGs are retained.

The 30 photographic assets live locally in `public/images/grooming/` (new images) and `public/images/editorial/` (retained grooming images); no image is hotlinked from CHALK or a stock provider at runtime. Stock photography is identified as an editorial preview, not actual employees, premises, clients or results. Images have stable containers, responsive sizes, lazy loading below the fold, Next.js optimization and a branded fallback for missing secondary images. Primary hero images load eagerly. Fonts are hosted locally, with license files included.

## Configuration

| Change                                                                             | Location                                                 |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Name, tagline, logo, phone, WhatsApp, email, Instagram                             | `src/data/salon.ts`                                      |
| Address, Maps URL, hours, parking                                                  | `src/data/salon.ts`                                      |
| Opening month, exact launch date and booking/priority modes                        | `src/data/salon.ts`                                      |
| Category visibility/order and featured categories                                  | `src/data/services.ts`                                   |
| Service names, descriptions, confirmed prices/durations, preparation and aftercare | `src/data/services.ts`                                   |
| Image metadata, sources and crop positions                                         | `src/data/siteImages.ts`, `src/data/image-manifest.json` |
| Team profiles, verified brands and gallery                                         | `src/data/gallery.ts`                                    |
| Authentic before/after results and stylist credits                                 | `src/data/transformations.ts`                            |
| FAQ answers                                                                        | `src/data/faq.ts`                                        |
| Editorial section copy and compositions                                            | `src/components/HomeSections.tsx`                        |
| Enquiry endpoint and public domain                                                 | `.env.local`, based on `.env.example`                    |

`launchDate` is intentionally empty: only **January 2027** is confirmed. There is no visible countdown until a valid exact opening date is supplied. Use an ISO timestamp with the UAE `+04:00` offset when the day is confirmed. The countdown hides after that timestamp. Set `bookingEnabled: true` to activate normal appointment-request labels and hide the pre-launch campaign. There is no real-time appointment calendar or automatic booking confirmation. Preferred date/time fields are hidden until an exact opening date is supplied or booking mode is enabled.

The original launch poster confirms Helio 2, Al Zahia, Ajman. Detailed arrival information, operating hours and direct contact details are still pending. Empty WhatsApp values never generate a fake destination: the action opens an enquiry instead. Once configured, `whatsappUrl()` encodes service-specific messages. Use an Instagram username without `@`.

For confirmed prices, enter the service’s `price`, optionally `duration` and `from`, and set that service’s `confirmed: true`. Category rows and dialogs share `servicePrice()`. Unconfirmed entries always remain “Price on request”. Review the men’s grooming catalogue against the actual business offering before launch; its categories follow the new brief and are presented as an illustrative collection.

## Real enquiry integration

Copy `.env.example` to `.env.local`, then configure:

- `ENQUIRY_WEBHOOK_URL`: your HTTPS enquiry receiver or CRM endpoint.
- `ENQUIRY_WEBHOOK_TOKEN`: optional server-only Bearer token.
- `NEXT_PUBLIC_SITE_URL`: the final public HTTPS domain without a trailing slash.

The receiver must return 2xx only after accepting the request for durable storage or delivery. This project does not include a database. The API validates and forwards allowlisted fields, including the selected services array, optional message and consent. With no receiver configured, it returns 503 and explicitly states that details were **not sent or saved**. There is no pretend persistence or localStorage queue.

The endpoint includes a honeypot, same-host origin check, payload limit, timeout and per-process request limiting. A multi-instance public deployment should use shared rate limiting and trusted proxy IP handling. Review privacy/terms against the final enquiry provider and applicable business requirements. No external analytics or advertising trackers are installed; a configurable `salon:analytics` event hook is available.

## Verification

- TypeScript: passed.
- ESLint: passed, no lint warnings.
- Unit/data/image tests: **12 passed**, including all 32 manifest assets, UAE numbers, multiple services, unconfirmed pricing and exact-date countdown gating.
- API integration tests: **8 passed** with no backend configured, verifying explicit non-submission, validation, origin checks, honeypot, rate limiting and multi-service structure.
- The same **8 API tests passed** against the production build with an isolated local test webhook, including successful multi-service submissions. The test receiver does not persist personal data.
- Production build: passed without warnings.
- Browser: both pages checked at **390, 430, 768, 1024, 1440 and 1920 px**; document widths matched the viewport and no clipped headings were detected.
- Browser interactions: redesigned mobile navigation, category links, photographic service details, preselected and multiple services, empty/invalid form feedback, honest no-backend message, success via the local test receiver, FAQ, legal dialog, gallery filtering, arrow-key navigation and Escape-to-close.
- Full-page desktop and mobile screenshots of both pages are in `previews/`. They were reviewed for image loading, repeated imagery, layout rhythm, crop quality and spacing.
- Touch-swipe handlers are implemented; a physical-device swipe test was not performed. No Lighthouse or screen-reader score is claimed.
- Previous production-dependency audit: zero vulnerabilities. The development lint dependency tree still has the previously documented unpatched `braces` advisory chain; no forced framework downgrade was made.

Commands: `npm run typecheck`, `npm run lint`, `npm run test`, `npm run test:api`, `npm run build`. Run API tests only with a local website active. The isolated success test uses `node tests/mock-webhook.mjs`, `ENQUIRY_WEBHOOK_URL=http://127.0.0.1:4567 npm run start -- --port 3001`, then `TEST_BASE_URL=http://127.0.0.1:3001 TEST_WEBHOOK_ENABLED=1 npm run test:api`.

## Before launch

Confirm the final offering, pricing, exact opening day, contact details, Instagram, operating hours, public domain and enquiry provider. Add official staff profiles, product brands and studio photography when available. The site has not been published or deployed.
