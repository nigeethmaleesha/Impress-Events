# Impress Events — Reference-aligned UI rebuild (5 Nov 2026)

This update uses the client's supplied Impress assets and catalogue, while aligning the visible layout and navigation interaction with the supplied Nuage reference screenshots. It does not copy the third-party Nuage logo, original imagery, or backend.

## Changed

- `src/components/SiteChrome.tsx`: centered-brand header; transparent-over-hero state; responsive search; quotation bag link/count; layered left navigation with grouped product category flyouts; pale-blue multi-column editorial footer and image strip.
- `src/components/HomeHero.tsx`: full-screen changing photography and heading; centered original Impress logo; anchored six-tab nav; hovering/focusing a tab opens a matching image + category-links mega panel.
- `src/app/page.tsx`: screenshot-style home content progression: browse product cards with simple carousel; collection banner; design inspiration split; real events carousel; furnished event image hero; featured stories; trade CTA.
- `src/app/layout.tsx`: imports the new last-loaded style layer.
- `src/app/impress-reference-2026.css` (new): desktop / tablet / mobile layout and interactions, including responsive drawer and hover panel, with reduced-motion support.

## Preserved

- Existing `/categories` three-family page, rentals search/filters, product details, product records, PDF/documentation assets and photos, quotation context and backend endpoint, contact form, FAQ, About and Lookbook routes.
- Existing Impress branded logo and images; no new fictional products or backend services.

## Important differences / verification limits

- The reference Nuage brand, some specific photography and proprietary typefaces are not present in the uploaded Impress files. This build uses Impress's own brand/photography and open display fonts, so it cannot honestly be called a measured 100% pixel match.
- The reference's account or AI designer feature is not provided in the Impress codebase. The AI-style icon routes to the existing Inspiration page; it does not claim to provide new AI functionality.
- The uploaded package did not include usable `node_modules`. Installing dependencies in the current isolated environment did not finish; TSX files were syntax-transpiled successfully, but full `tsc` and `next build` could not be confirmed here.
- Other internal pages retain their pre-existing functional layouts; the supplied screenshots primarily cover homepage navigation and homepage sections.

## Local run / QA (Windows 11)

From the project root, run:

```powershell
npm ci
npm run typecheck
npm run dev
```

Check `http://localhost:3000`: hero, hover tabs, photos, carousels, header/logo on scroll, menu drawer (including category submenu and back button), search and quotation. Then check `/categories`, `/rentals`, `/quote`, `/contact` and mobile viewport. Before production, run `npm run build`.

No `.env`, `.git`, `node_modules`, or build-cache files are bundled. Restore your **own existing environment variables** locally as before, especially for contact email and quotation APIs.
