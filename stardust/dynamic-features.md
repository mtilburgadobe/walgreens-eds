# Dynamic Features Inventory

| Surface | Class | Pilot disposition | Runtime owner / boundary |
|---|---|---|---|
| Search input and results | S | hand-off | Walgreens search service; pilot renders the authorable shell only |
| Selected store / geolocation | L | hand-off | Store locator and location APIs; captured address is static fallback |
| Product availability, price and fulfillment | D | hand-off | Commerce/catalog/inventory APIs; authored cards are non-transactional fallback |
| Coupon recommendations and clipping | D | hand-off | Offers service plus authenticated membership; pilot links to Walgreens |
| Cart item count and cart | D | hand-off | Cart service and session; pilot links to Walgreens cart |
| Account and myWalgreens state | A | hand-off | Walgreens identity/account platform |
| Prescription management and pharmacy services | R | hand-off | Regulated pharmacy systems; no PII or prescription data handled by pilot |
| OneTrust consent | T | decided-out | Must be configured by production privacy owner, not copied from capture |
| Analytics, ads, experimentation and surveys | T | decided-out | Production tag-governance decision; no captured tags are replayed |
| Header/footer promotional targeting | D | static-interim | Authored fallback content in the pilot; future personalization API optional |

## Explicit exclusions

The opaque POST paths captured under Walgreens anti-bot/telemetry systems,
including randomized paths and Dynatrace handlers, are evidence only. They are
not documented or exposed as candidate integrations.
