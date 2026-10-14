# SIXTY SIX — Men’s Grooming Lounge rebrand

The existing two-page Next.js site now presents premium men’s grooming in Ajman, opening January 2027. Routes, components, API, validation, launch configuration, gallery/lightbox, mobile navigation and image optimization were preserved.

The hero reads “The art of grooming.” with “Precision. Style. Character.” The introduction, six featured categories, campaign, experience, launch, footer, metadata, structured data, gallery captions, alt text, enquiry options and WhatsApp template now follow the men’s identity. The warm stone, charcoal, espresso, bronze and ivory palette retains the original editorial compositions.

28 licensed replacement assets cover men’s portraits, haircutting, beard detailing, classic shaving, towels, scalp care, male facials, interiors and professional tools. Two existing grooming photos and supplied brand assets are retained. Stock photographs remain clearly identified as illustrative. Previous beauty photos were moved outside public into the ignored `.rebrand-backup/` folder.

[Replacement inventory](IMAGE_INVENTORY.md) · [Full catalogue](SERVICE_CATALOGUE.md)

## Before and after

| Page | Before desktop | After desktop | Before mobile | After mobile |
|---|---|---|---|---|
| Home | [Before](../previews/before/home-desktop-full.jpg) | [After](../previews/after/home-desktop.jpg) | [Before](../previews/before/home-mobile-full.jpg) | [After](../previews/after/home-mobile.jpg) |
| Services | [Before](../previews/before/services-desktop-full.jpg) | [After](../previews/after/services-desktop.jpg) | [Before](../previews/before/services-mobile-full.jpg) | [After](../previews/after/services-mobile.jpg) |

## Verification

- TypeScript, ESLint and optimized production build passed.
- 13 unit/image tests passed, including the added unpublished additional grooming check.
- All 8 API integration tests passed with the normal unconfigured backend and separately with a local-only mock webhook exercising successful forwarding.
- Both pages checked at 390, 430, 768, 1024 and 1440px: no document-level horizontal overflow. Reviewed portrait crops, readable headings and responsive navigation.
- Gallery Craft filter, lightbox next image and Escape dismissal passed.
- Mobile menu routed to services; beard category anchor and Beard Trim details passed. Requesting that service preselected Beard Trim in the appointment form. Preferred barber terminology and missing-field/consent validation passed.
- Priority form accepted two categories and showed the explicit unsent/unsaved error for the unconfigured live backend, without a false success message.
- Checked loaded images; no broken loaded image elements. All 28 replacement WebPs decode with matching declared dimensions.
- Customer-facing source audit found no beauty, bridal, makeup, lashes or women’s salon remnants. The internal `specialist` API property is retained for compatibility and shown as preferred barber.

## Client inputs required

Confirm the final service menu, additional grooming availability, prices and durations; exact opening day and hours; real barber profiles and approved interior/client photographs; contact number, WhatsApp, email, Instagram and exact map pin; production domain; and the server-side enquiry webhook destination/credentials. The 30 visible services are explicitly illustrative, all prices remain on request, four additional services stay unpublished, team profiles stay hidden, and no precise opening date is invented.

The supplied logo/poster still contain the original studio wording. Those artwork files were preserved as supplied; a revised official lockup can replace them when provided.

## Local preview

Run `npm install` if dependencies are absent, then `npm run dev`. Open http://127.0.0.1:3000/ and http://127.0.0.1:3000/services. The existing local development server is left running. No changes were pushed or deployed.
