# V5 Market Architecture

`src/data/markets.ts` controls market identity, routes, state/region wording, and contact availability.

- `az` = EVER / East Valley Electronic Recycle
- `tx` = EPER / El Paso Electronic Recycle

Pages use the `[market]` route segment. Shared components receive the market key so future changes do not require maintaining two separate copies of the website.

## Important rule
Never add a phone, email, address, hours, certification, pickup price, or data-destruction promise to a market just because the other market has it. Confirm the local operational fact first.

## Expansion
A future market can be added by:
1. adding a market config,
2. adding service-area city records,
3. adding market resources,
4. supplying confirmed contact/operating facts.

The shared service and page templates can then generate the new market experience without cloning the entire codebase.
