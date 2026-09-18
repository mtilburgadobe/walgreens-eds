# Dynamic Features Plan

## Static, authorable in this DA-deferred pilot

- Campaign banner copy, imagery, and CTA.
- Health, beauty, wellness, photo, weekly-deal, offer, explore, and category rows.
- Navigation/footer labels and destinations.
- Static fallback address and promotion labels.

## Integration phases

1. **Commerce discovery:** define supported catalog, pricing, inventory, and
   fulfillment contracts; retain authored fallback rows during fetch failures.
2. **Membership and cart:** integrate only through approved Walgreens identity,
   offers, and cart APIs with security/privacy review.
3. **Pharmacy:** keep outbound links until regulated product owners approve a
   separate integration; never collect prescription or health data in this pilot.
4. **Search:** connect the search control only when a results experience and
   endpoint contract are available.
5. **Analytics/privacy:** production owners select consent and tag governance;
   captured vendor calls are not replayed.

No integration is enabled by this change. DA delivery, API credentials, and
production configuration remain blockers.
