# Homepage Fidelity Gate Report

## Final normalized pass

The final pass uses paired browser contexts, locale `en-US`, lazy-content
settlement, symmetric dynamic-surface normalization, and the shipped pixel
comparator. Normalization now fails when a registered surface is not found on
both sides and logs removed flow, compensation spacers, stable landmarks, and
image edges.

| Iteration | Width | Source | Candidate | Pixel difference | Height delta |
|---|---:|---:|---:|---:|---:|
| Final | 1440 | 4777px | 4771px | **7.13%** | **6px** |
| Final | 360 | 5218px | 5226px | **9.10%** | **-8px** |

Both widths pass the Stardust pixel threshold (at most 10%) and absolute height
tolerance (at most 8px). Evidence:
`stardust/replica/remediation/final-current-1440/` and
`stardust/replica/remediation/final-rerun-iteration-3-360/`.

## Structural and visual probes

- Raw final generic structural probes report 23 red findings at each width.
  Most are role swaps caused by Walgreens visual titles being body nodes while
  EDS retains semantic headings; the live inventory also includes API-owned
  commerce text absent from the static pilot. These are not hidden or claimed
  as passing.
- The normalized stable-content ledger has 0 missing stable modules, order
  mismatches, or unexplained stable CTA omissions.
- The final normalized pixel and height gates pass. The raw generic structural
  probes remain a separate release gate and are not represented as passing.

Evidence:
`stardust/replica/remediation/restarted/structural-{1440,360}.txt`,
`visual-{1440,360}.txt`, and `visual-{1440,360}/`.

## Validation

- `npm run lint`: PASS.
- David's Model: PASS, 0 red, 2 justified promo-banner advisories.
- Local QA: PASS, 34 checks, 0 warnings, 0 failures.
- Experience Workspace: 123/123 authored texts editable, 0 dead, 0 duplicated.
- `scripts/aem.js`: unchanged.
- `.hlxignore`: includes `stardust/`.

## Blockers

- The pixel and height blockers are resolved.
- Raw structural comparison still reports 23 red findings at each width. These
  role/dynamic-content findings must be resolved or registered through a
  supported structural normalization before production publishing.
- Editorial media and heading fonts remain temporary local/source references
  pending the intentionally deferred DA asset workflow and production rights
  review.
- No post-fix deployed metric or DA delivery is claimed; all fixes are local.
