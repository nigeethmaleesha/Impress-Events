# Impress Events — Client Review Website

**October 21, 2026 redesign:** A minimal, catalogue-first experience for Impress Luxury Event Rentals. Neutral black and white, warm off-white and very light blush accents. Compact, consistent typography, large real-event photographs, and fewer sections so visitors can focus on the rentals.

## What The Client Will See

- **Home:** an editorial split hero with client-supplied real-event photography, six direct catalogue collections, and a four-scene “In Use” photo gallery.
- **Rental Catalogue:** all the original inventory records, category filters, search, sorting and pagination. Each item retains its original SKU and quote action.
- **Event Lookbook:** large, clickable real-event photographs, zoom viewer, keyboard left/right arrows and direct links to related rental categories.
- **Our Story:** a concise introduction and a shortened version of the owner's vision.
- **Contact, FAQs, Policies, Quotes:** existing functionality is retained. The home page quotation popup still allows enquiries without products selected.
- All primary headings use title case with reduced sizes and a single Arial/Helvetica font family; the previous oversized serif editorial typography has been removed.

## Client-Supplied Photographs

Four photos supplied on October 21 are optimized as WebP under `public/images/real-events/`:

- `pastel-banquet.webp`
- `blush-reception.webp`
- `white-floral-centerpiece.webp`
- `garden-evening.webp`

Their watermark/photographer attribution has been retained where present. The old AI visuals remain in the repository for historical reference **but are not used on the redesigned homepage or lookbook**. The existing category photographs are retained as mood references. A styling photograph **does not guarantee** that a particular SKU is exactly pictured. Individual product photos and confirmed rental pricing still need to come from the client before launch.

## Technology

- Next.js 16, React 19, TypeScript, CSS
- Local JSON inventory, sourced from `docs/original-stock.xlsx`
- Client-side persistent quote cart
- Node.js API routes and Nodemailer for contact and quotation email delivery

## Run Locally

```bash
npm ci
cp .env.example .env.local
# Fill in SMTP settings in .env.local to enable actual email delivery.
npm run dev
```

On Windows PowerShell: `Copy-Item .env.example .env.local`.
Open `http://localhost:3000`.

### Check Before Client Review

```bash
npm run typecheck
npm run check:catalogue
npm run build
```

Test desktop and phone sizes, navigate all category links, open/close the photo lightbox (including keyboard navigation), search, use the quote cart and submit a test quotation using configured SMTP.

## Vercel Deployment (Client Approval Demo)

1. Push this project to a Git repository, excluding `.env.local`, `.next`, `.git` and `node_modules`.
2. Import it on Vercel as a Next.js project; build command `npm run build`.
3. Add `QUOTE_TO_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` and `SMTP_FROM` in Vercel Environment Variables.
4. Redeploy after saving the variables. Send the preview to the client for design approval.
5. Test both contact and quote emails in the actual deployed environment before considering it functional.

**Important PHP hosting note:** This is still a Next.js/Node.js project. Its server-side `/api/quote` and `/api/contact` routes **cannot run directly on PHP-only shared hosting**. Once the design is approved, the frontend must be exported/recreated for the selected final host, and the email endpoints must be implemented in PHP or moved to a supported external service. Do not simply upload this project zip to a PHP-only public_html directory and expect it to run. No PHP conversion or live deployment has been claimed in this UI redesign.

## Requirements Remaining Before Production

- Confirm the exact photographed products, product names and prices.
- Obtain approval for the privacy/terms/cancellation policies (currently placeholders).
- Supply final business contact details and production SMTP credentials.
- Replace the demonstration inbox with the client's approved inbox.
- Enable SEO indexing only when the real production domain and content are approved. This prototype intentionally has `robots: noindex`.
- Verify the Next.js build and actual browser/email workflows in a network-enabled environment. Only TSX syntax, CSS parsing and supplied image integrity were statically checked during this package preparation because npm dependencies could not be downloaded in this runtime.

See `docs/REDESIGN-2026-10-21.md` for file-level changes.
