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

Structural remediation commit `726f5ee` is pushed to `origin/main`.
`content/index.html` was uploaded to DA and previewed without publishing.
The authenticated DA source contains the corrected primary `Clip` CTA, and
the preview root and `/index.plain.html` return 200 with no `about:error`.
Commit `b267b8f` restores the authored section variants through DA-native
section metadata. The deployed Beauty Savings Event section now resolves to
`deep` with the expected `#62002e` background at desktop and mobile.
Commit `6b0b94b` turns Beauty deals you’ll love into an accessible coupon
carousel with responsive page movement, card snapping, and boundary-aware
previous/next controls.

- local QA: 34 checks passed, 0 failed
- Experience Workspace: 123/123 authored texts editable
- final normalized pixel difference: 6.87% at 1440; 8.91% at 360
- final height delta: 6px at 1440; -2px at 360
- deployed normalized structural findings: 0 red at 1440; 0 red at 360

Pixel, height, and structural bars pass. Production publishing remains
deferred for editorial asset and font provenance review.
