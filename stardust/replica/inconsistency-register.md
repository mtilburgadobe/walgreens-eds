# Inconsistency Register

The migration has no intentional redesign. Comparison-only normalization is
applied identically to source and candidate.

| Surface | Normalization | Reason |
|---|---|---|
| GAM advertising | Hide `#hp-gam-banner`; block ad-network requests | Auction output changes creative and height per session. |
| Feedback/surveys | Hide Kampyle/Medallia/survey controls and block requests | Fixed research UI is not homepage content. |
| Consent/modals | Dismiss supported controls, then hide inert remnants | Prevent transient overlays entering inventories. |
| Personalized offers | Hide the named source container and matching local section | Account/coupon targeting is API-owned and session-dependent. |
| Beauty coupon carousel | Hide on both widths and both sides | The live carousel alternated between absent and populated mobile states during the same run. The authorable pilot block remains in code. |
| Halloween commerce carousel | Hide on both widths and both sides | Product inventory, pricing, promotions, and purchase controls are API-owned and differed from the authorable fallback. |
| Deals of the Week carousel | Hide on both widths and both sides; retain the measured candidate outer-flow spacer (49px desktop, 20px mobile) | Store-specific prices and availability are API-owned; the static pilot cannot reproduce a settled commerce response. The spacer preserves the equivalent source section boundary rather than masking stable content. |
| Detached beauty label duplicate | Hide source `#text-8377255dfe` during structural comparison | Walgreens emits a second white-on-white “Beauty deals you’ll love” label after the commerce tree. It is not visible in the settled source screenshot and has no candidate visual surface. |
| Motion | Disable animation and transitions after settlement | Prevent carousel/creative phase differences. |

Location, account, and cart remain in neutral signed-out/header states. No
opaque anti-bot, challenge, telemetry, or captured endpoint value is treated as
an integration.
