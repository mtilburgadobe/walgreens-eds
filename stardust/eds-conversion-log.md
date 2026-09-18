# EDS Conversion Log

## Decisions

- Homepage-only bounded replica; no sibling fan-out.
- Blocks: `promo-banner` (template-like lead), `promo-cards` (repeating campaign
  cards with `three`/`photo` variants), `product-rail`, and `category-grid`.
- The two `promo-banner` David's Model advisories are justified: they are
  bespoke image-overlay campaign compositions whose media, scrim, copy, and CTA
  cannot be represented by unstyled default content.
- Section headings remain default content; repeated units are block rows.
- Header and footer use authored `/nav` and `/footer` fragments.
- All block decorators query content defensively and tolerate missing cells/media.
- `scripts/aem.js` remains untouched.

## Asset disposition

The capture contains only favicon and screenshot binaries. Editorial image URLs
therefore remain fully qualified Walgreens/CDN references for this local pilot.
Production requires DA media upload and delivered `.plain.html` verification.

## Delivery status

Code was pushed to `mtilburgadobe/walgreens-eds` and `index`, `nav`, and
`footer` were uploaded to DA and previewed on the `main` code branch.

Delivered preview verification:

- canonical URL: `https://main--walgreens-eds--mtilburgadobe.aem.page/`
- local/rendered QA: 32 checks passed, 0 failed
- Experience Workspace: 99/99 authored texts editable
- editorial images: 44, with zero `about:error` ingestion failures
- AI readability: 100%

Production publish was intentionally withheld because the replica
source-fidelity pixel gate remains above its 10% pass bar.
