# Homepage Fidelity Gate Report

## Final normalized pass

The final pass uses paired browser contexts, locale `en-US`, lazy-content
settlement, symmetric dynamic-surface normalization, and the shipped pixel
comparator. Normalization now fails when a registered surface is not found on
both sides and logs removed flow, compensation spacers, stable landmarks, and
image edges.

| Iteration | Width | Source | Candidate | Pixel difference | Height delta |
|---|---:|---:|---:|---:|---:|
| Final | 1440 | 4777px | 4771px | **6.87%** | **6px** |
| Final | 360 | 5220px | 5222px | **8.91%** | **-2px** |

Both widths pass the Stardust pixel threshold (at most 10%) and absolute height
tolerance (at most 8px). Evidence:
`stardust/replica/remediation/post-structural-final-{1440,360}/`.

## Structural and visual probes

- Final normalized structural probes report 0 red findings at both widths.
  The shared classifier ignores non-rendered modal/assistive nodes, recognizes
  buttons as CTAs, and classifies visual headings symmetrically by computed
  typography. Every registered dynamic-surface selector must match and its hit
  count is logged.
- The normalized stable-content ledger has 0 missing stable modules, order
  mismatches, or unexplained stable CTA omissions.
- The final normalized pixel, height, and structural gates pass.

Evidence:
`stardust/replica/remediation/final-structural-{1440,360}.txt`.

## Validation

- `npm run lint`: PASS.
- David's Model: PASS, 0 red, 2 justified promo-banner advisories.
- Local QA: PASS, 34 checks, 0 warnings, 0 failures.
- Experience Workspace: 123/123 authored texts editable, 0 dead, 0 duplicated.
- `scripts/aem.js`: unchanged.
- `.hlxignore`: includes `stardust/`.

## Blockers

- The pixel, height, and structural blockers are resolved.
- Editorial media and heading fonts remain temporary local/source references
  pending the intentionally deferred DA asset workflow and production rights
  review.
- Production publishing remains deferred pending that asset/provenance review.
