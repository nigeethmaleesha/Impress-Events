# Impress Events — Categories reference rebuild

## Implemented (3 November 2026)

- Replaced `/categories` four editorial split sections with the reference page's three image-led category groups: **Linens**, **Furniture**, and **Tabletop & Accessories**.
- Retained the **original Impress Events logo, owned photographs, actual catalogue category labels, product data, and live product routes**.
- Added real multi-category `family=linens|furniture|tabletop` filters for the three **Shop** destinations, so each Shop action shows the complete family instead of a single product type.
- Replaced the sitewide desktop-nav / announcement-strip shell with a restrained white centred-logo header, always-accessible expandable navigation, functional search drawer and existing quotation-bag shortcut.
- Matched the reference's minimal typography hierarchy, thin border lines, whitespace, category links, hover states and responsive navigation.
- Updated the footer to a light editorial link-column layout; preserved the site's actual destination routes.
- Kept the existing catalogue filters, product detail gallery, contact form, FAQs and quotation endpoints, without changing business logic.

## Technical notes

- Source design reference: https://nuagedesigns.com/categories (checked 3 November 2026).
- The linked reference is a third-party live website. This implementation reproduces its observed **three-category structure and editorial styling**, not its proprietary code, exact licensed typeface or original brand assets.
- Source lists some categories Impress does **not** stock. Those have deliberately *not* been fabricated. All visible Impress category links resolve to its existing product filters.
- The source website's account system, commerce backend, email-list registration and shipping-state availability do not exist in the uploaded Impress project; none were falsely represented as working.
- No .env credentials or Git history are included in the packaged deliverable.
- This sandbox had no access to all required npm registry tarballs, so `npm ci`, an actual Next.js build and a cross-browser screenshot comparison could not be completed here. Run the steps below in your normal Windows/Node environment to verify the integration.

## Run

```bash
npm ci
npm run typecheck
npm run build
npm run dev
```

Open `http://localhost:3000/categories`. Check category links, menu, search, quotation bag and mobile breakpoint.

## Edited files

- `src/app/categories/page.tsx`
- `src/components/SiteChrome.tsx`
- `src/components/CatalogueClient.tsx`
- `src/app/rentals/page.tsx`
- `src/lib/catalogue.ts`
- `src/app/layout.tsx`
- `src/app/nuage-reference.css` (new)
- `NUAGE-REFERENCE-REBUILD.md` (new)
