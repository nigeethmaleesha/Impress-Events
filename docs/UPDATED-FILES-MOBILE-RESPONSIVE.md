# Impress Events responsive update — file breakdown

## Changed / updated source files

1. `src/components/CatalogueClient.tsx` — responsive filter drawer, on-page sort menu, results action, keyboard support, focused controls, scroll locking.
2. `src/components/SiteChrome.tsx` — reliable mobile header navigation and search placement.
3. `src/app/globals.css` — responsive updates to all core page layouts and small-screen forms.
4. `src/app/page.tsx` — optimized hero, category and gallery image references.
5. `src/app/about/page.tsx` — optimized image references.
6. `src/app/lookbook/page.tsx` — optimized image references.
7. `src/components/ContactForm.tsx` — optimized image reference.
8. `src/lib/catalogue.ts` — optimized category images.
9. `README.md` — revised responsive usage and deployment notes.
10. `docs/ASSET-NOTES.md` — image optimisation notes.
11. `docs/2026-10-13-file-breakdown.md` — updated asset filenames.

## Added files

- `docs/RESPONSIVE-QA.md` — responsive changes, QA sizes, verification scope.
- `docs/UPDATED-FILES-MOBILE-RESPONSIVE.md` — this file.
- `public/images/ai/*.webp` — nine optimized high-quality AI visual assets.

## Removed obsolete files

- `public/images/ai/*.png` — original very large AI PNGs (replaced by WebP)
- `public/images/*.webp` (old screenshot-crop visuals at top level) — no longer referenced by the website

`public/images/product-placeholder.svg` is intentionally retained. The source spreadsheet does not include verified SKU-specific product photographs.

## Installation / update

**Best option:** replace the entire existing project folder using the new complete ZIP while keeping your real `.env.local` secrets safe outside the replacement folder.

**Existing-project update:** extract the small changed-files ZIP into your project root, overwrite files when prompted, then optionally delete the obsolete images listed above.

Run `npm install` (if node_modules is missing), `npm run dev`, then test on mobile. If deployed, commit/push changes and redeploy the Vercel project. SMTP environment variables remain unchanged.
