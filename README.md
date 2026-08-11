# Milind Gauns — Portfolio

Personal site for Milind Gauns: electrical engineer turned analyst, incoming
PGDM (Big Data Analytics) at Goa Institute of Management, national-level chess
player.

## The idea

A knight's tour visits all sixty-four squares without landing on one twice —
moving in L-shapes, never straight. That's the shape of the career the site
describes: EEE at NIT Goa → after-sales operations at Godrej → a grain
logistics model for the Government of Goa → Big Data Analytics.

So the board is the site. Six milestones sit on six squares, each one a legal
knight move from the last (`a1 → c2 → e3 → g4 → f6 → e8`), and the tour is
playable in full at the bottom of the page.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger — the pinned tour and the photo wipe
- `next/font` — Space Grotesk (display) + JetBrains Mono (data), self-hosted

No WebGL, no 3D dependency: the board and knight are plain SVG, which stays
crisp at every size and costs nothing to render.

## Run

```bash
npm install
npm run dev
```

> Stop the dev server before running `npm run build` — both write to `.next`,
> and running them together corrupts the dev server's chunks.

## Layout

```
app/          layout (fonts, metadata), page (section order), globals.css
components/   one file per section, plus:
  board/      Board (presentational), HeroBoard (autoplay), KnightGlyph
  KnightPuzzle       playable knight's tour
  CommandPalette     ⌘K navigation
  ScrollRevealPhoto  scroll-driven wipe between two photos
  Counter            count-up figures
lib/
  content.ts    all copy and facts — single source of truth, from the CV
  knightTour.ts board geometry, move legality, tour solver
public/photos/  processed images
```

Content lives only in `lib/content.ts`. Edit facts there, not in components.

## Notes

- **The tour solver** uses Warnsdorff's heuristic with backtracking. Plain
  Warnsdorff dead-ends from some starting squares (e3 strands at 60), so
  candidates are explored in heuristic order with a node budget. Verified to
  produce a complete 64-square tour from all 64 starts; worst case 109 nodes.
- **Reduced motion** is handled per-feature, not globally: the tour section
  un-pins into a list, the photo wipe becomes a stacked pair (otherwise the
  second photo would never be visible), counters jump to final values, and the
  intro is skipped.
- **Photos** — `portrait.png` and `pickleball.png` are background-removed
  cutouts (rembg, u2net_human_seg); the rest are whole scenes as WebP.
- **The loading intro** plays once per session (`sessionStorage`) and any
  click or keypress cuts it short.

## Deploy

Push to a Git repo and import into Vercel. No environment variables, no
configuration — everything is static.
