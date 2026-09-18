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
Tiempos Headline files were obtained from the authorized source presentation
for local fidelity use. Production reuse requires normal font licensing and
provenance review.

## Delivery status

This remediation is local-only. No commit, push, DA upload, preview request, or
publish was performed. The existing deployed preview was used only as the
requested baseline and cannot contain these unpushed fixes.

- local QA: 34 checks passed, 0 failed
- Experience Workspace: 123/123 authored texts editable
- final normalized pixel difference: 7.13% at 1440; 9.10% at 360
- final height delta: 6px at 1440; -8px at 360

Both pixel and height bars pass. Raw structural comparison still reports 23 red
findings per width, so deployment is not claimed.
