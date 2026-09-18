# Homepage Gate Report

## Replica source → static prototype

| Width | Iterations | Structural/visual result | Pixel result | Height delta |
|---|---:|---|---:|---:|
| 1440 | 3 (cap reached) | Advisory flags remain | 36.61% | 0px |
| 360 | 2 (iteration 2 unchanged) | Advisory flags remain | 49.91% | 230px |

The source DOM exposes modal, analytics, ad, and client-hydrated content to the
generic structural probes, producing known non-page findings. Real residuals
remain in chrome detail, omitted personalized/dynamic rails, footer depth, card
geometry, and mobile stacking. Gate evidence is stored under
`stardust/replica/gates/index-{1440,360}/`.

## Static prototype → local EDS

- `qa-gate.mjs`: PASS, 32 checks, 0 failures, 11 max-width advisories. The
  1392px width is intentional and matches the captured Walgreens container.
- `davids-model-lint.mjs`: PASS, 0 red findings; one justified advisory for
  the bespoke campaign banner.
- Experience Workspace probe: 99/99 authored texts remain editable; 0 dead,
  0 duplicated. Category labels have edit-mode height drift that does not
  affect published rendering.
- `npm run lint`: PASS.

The local `content-diff` run against the harness selected fragment chrome as
its first `main` because local fragment fixtures are full body documents; its
11 structural findings are a harness limitation, not a delivered-content
result. QA-gate independently verified all ten main sections and blocks.

## Delivery blockers

- DA is intentionally deferred; no preview/live URL exists, so published
  `.plain.html`, computed-style, CLS, and final deployed pixel gates cannot run.
- The source-fidelity pixel gate remains above its <=10% pass bar at both
  breakpoints after the bounded iteration loop. Deployment must not be treated
  as complete until those residuals are accepted or reduced.
- Editorial assets are still source-hosted temporary references.
- Commerce, inventory, coupons, cart, account, pharmacy, search, consent, and
  analytics require owner-approved APIs/configuration.
