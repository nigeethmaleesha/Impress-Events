# Impress Events — Nuage-inspired demo approval guide

**Demo date:** 27 October 2026  
**Current release:** Next.js visual/concept demonstration only; not a live Shopify store.

## Preview flow for the client

1. Open `/` to see the new editorial photographic hero, cleaner typography, category thumbnails and alternating Linens / Furniture / Tabletop showcase, followed by real-event inspiration and quote CTA.
2. Open `/categories` (the page corresponding most closely to the shared Nuage reference `/categories`) and review four image-and-category sections: Linens, Furniture, Tabletop & Accessories, and Finishing Touches.
3. Pick any category and review the filtered rental catalogue; use search, sorting, category filters and pagination.
4. Open an individual SKU, select a size, choose a quantity, and add it to the quote bag.
5. Submit the demo quotation request through the existing form (requires correctly configured email environment for actual mail delivery).
6. Test at desktop, tablet and mobile widths; please confirm font direction, image cropping, category structure and product display format.

## Product data and assumptions

- All **257 original product records** are retained, using **13 inventory categories**.
- The category presentation is grouped into larger visitor-friendly sections, rather than introducing false inventory categories.
- Existing supplied product titles, materials, variants, source SKUs and descriptions are preserved unless subsequently edited through the master file.
- The current project does **not** contain verified SKU-to-photo mappings. A small set of existing Impress event photographs appear as **STYLING REFERENCE** imagery only. Replace with actual product photos before launch.
- There are no approved product prices in the source data. Public site says **Price on request**; no fabricated rental prices are presented.
- No date-based inventory reservation, checkout/payment or Shopify Admin is available in this demo. These belong to the final implementation phase.
- A handful of provisional or missing SKUs are flagged in the master CSV's `approval_notes` field. Confirm against the client stock sheet before production import.
- Text and navigation take **inspiration** from Nuage's publicly observable layout and category browsing approach, but assets and branding belong to Impress; no Nuage brand materials have been copied.
- Reference's exact paid font files, exact pixel specifications and responsive implementation are not accessible in this offline build environment. The demo uses **DM Sans + Jost fallback** as a close, commercially usable typography direction; typography requires client sign-off.

## Master catalogue demo workflow

`docs/master-catalogue-demo.csv` contains a full editable master export of the 257 products.
The columns `internal_rental_price_aud` and `stock_quantity` are intentionally empty until confirmed; notes record assumptions and outstanding data.

From the project root:

```bash
node scripts/sync-master-catalogue.mjs --check
node scripts/sync-master-catalogue.mjs
npm run build
```

Editing name, material, variants, description or category in the CSV and regenerating the JSON changes public product data **after redeployment**. The sync tool checks IDs, SKU uniqueness, categories, variant formats, price and stock formats and protects the public JSON from including private prices and internal stock quantities. Use CSV quote escaping and leave `id` stable. To add or delete SKUs, complete an explicit inventory migration rather than bypassing the tool.

This is a **demo master-data mechanism**, not a browser admin panel or automatic synchronization. For the production website, use **Shopify's product admin and bulk CSV import** as the editable central source of truth.

## Approval questions to confirm

1. Final navigation, hierarchy and visuals: yes/no.
2. Exact fonts: approve demo DM Sans interpretation or provide a font license/brand guide.
3. Category grouping and product listing grid: yes/no.
4. Pricing: publicly visible vs hidden on quotation only.
5. Event photos and official SKU imagery: please provide verified image-to-SKU folder mapping.
6. Rental dates, quantities, delivery zones and any additional quotation fields.
7. Final Shopify store credentials, email delivery, theme, app scope and hosting decisions.

## Deployment and data protection

- Do not include real `.env` or `.git` directory in any client handover ZIP; add the relevant mail settings from `.env.example` into Vercel's Environment Variables privately.
- `npm run dev` starts local demo, `npm run build` creates a production build once dependencies are installed.
- The form requires real provider configuration to send messages; otherwise expect configured failure behavior. No success is falsely simulated.
