# Preston Cleaners: website demo

Demo website for Preston Cleaners, 14760 Preston Rd, Ste 100, Dallas, TX 75254 · (972) 239-2212.

- Single static page (`index.html`), English/Spanish (`?lang=es`).
- Claim-ticket language switch, hanger light/dark switch (shirt ↔ suit), live open/closed status.
- Pitch angle: their current domain prestoncleaners.com shows a broken Wix "domain not connected" page.

## Needed before going live
- [ ] Weekday opening time (7:00 or 6:30 AM?)
- [ ] Same-day drop-off cutoff time
- [ ] Price list (shirts, suits, wash & fold per lb)
- [ ] What "eco-friendly" means for them (solvent/process) to describe it accurately
- [ ] Photos of the storefront and counter; logo if any
- [ ] Do they still have coin washers on site? (one directory lists coin-op machines)

## Stack
- **Next.js** (static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (Marquee, MagicCard, BorderBeam), **Motion**, **GSAP**, **Lenis** smooth scroll, **Phosphor** icons
- Strings live in `src/content/strings.json` (English plus each translation); the page is `src/app/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).
