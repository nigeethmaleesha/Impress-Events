# Home hero motion — 2026-10-13 correction

## Client feedback
Remove the upward/revealing movement of homepage text, including when navigating back to Home. Preserve the gentle moving background image.

## Result
- Headline, kicker, paragraph, CTAs, footer labels, and all below-hero sections are always visible and **do not move into view**.
- Removed staggered text reveal CSS keyframes and the IntersectionObserver-based section reveal behavior.
- Preserved the slowly moving hero photo, desktop-only subtle pointer response, background warm-light ambience, and the scroll indicator glow.
- Replaced moving text with a small, stationary glowing accent rule next to the kicker.
- Reduced-motion mode disables movement and keeps all content visible.
- Re-entering Home via client-side navigation cannot replay text entrance animations because none remain.

## Changed files (replace existing files)
1. `src/app/page.tsx` — simplify hero text markup and remove `data-reveal` attributes.
2. `src/app/globals.css` — replace landing animation rules; image motion only, no text motion.
3. `src/components/LandingMotion.tsx` — remove reveal observer; retain hero image pointer motion only.

## Email, products, navigation and quotations
Unchanged. No new dependencies.

## Testing guidance
- Open Home on desktop and mobile; all hero text must be visible immediately.
- Navigate Home -> Rentals -> Home; the same text must not rise or replay.
- Scroll to the lower sections; no text/section upward scroll reveal should occur.
- Check 320px, 375px, 768px, and desktop widths for title wrapping.
- Confirm reduced-motion preference removes moving visual effects.
- Run `npm run build` before deploying to Vercel.
