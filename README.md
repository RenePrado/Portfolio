# Rene Angelo Prado — Portfolio

Personal portfolio. React 18 + Vite 5 + Tailwind 3. No animation libraries —
motion is CSS transitions plus small `IntersectionObserver`/`requestAnimationFrame`
hooks, all gated behind `prefers-reduced-motion` and pointer-type media queries.

Design direction: **"spec sheet"** — the page reads like a printed technical
document that shows its own workings (grid, tokens, type) through Inspect mode.

## Structure

```
index.html               # meta/OG tags, pre-paint theme script, font preload
public/                  # résumé PDF, fonts, optimized images, OG image, icons
assets-src/              # original portrait (source for the image pipeline)
scripts/                 # check-contrast.mjs, optimize-images.mjs (dev only)
src/
  main.jsx               # mounts App, imports styles
  App.jsx                # composition only + ErrorBoundary
  styles/
    tokens.css           # all design tokens (color per theme, type, space, grid)
    base.css             # reset, typography, focus ring, reduced-motion
    site.css             # component styles
    inspect.css          # Inspect-mode grid overlay + spec labels
    fonts.css            # @font-face for self-hosted variable fonts
    print.css            # one-page print stylesheet
  data/                  # ALL content lives here — edit without touching JSX
    profile.js           # name, role, contact, links, portrait
    projects.js          # project index (image: null → placeholder plate)
    journey.js           # experience + education timeline
    stack.js             # four tech-stack groups
  hooks/                 # useTheme, useReveal, useInspect, usePointerAxis, useCopy
  components/
    layout/              # Header, MobileMenu, Footer, SkipLink
    sections/            # Hero, About, Projects, Journey, TechStack, Contact
    ui/                  # Button, FigureFrame, IndexRail, InspectToggle,
                         # PreviewPlate, ProjectRow, CopyEmail, ThemeToggle, …
```

## Tokens

`src/styles/tokens.css` is the single source of truth: colors are CSS custom
properties switched by `[data-theme]` on `<html>` (light default, dark via
`prefers-color-scheme` fallback + explicit attribute). Tailwind colors in
`tailwind.config.js` reference `var(--…)` — never hardcode hex in components.

Two accents exist on purpose: `#9c4f16` (light) and `#d98a4a` (dark), each tuned
to pass WCAG 4.5:1 on that theme's real backgrounds.

```bash
npm run contrast   # fails if any text/bg pair drops below AA
```

## Adding a project

Edit `src/data/projects.js` — one entry per project, newest first. Set
`image` to a path under `/assets/` to replace the placeholder plate (one-line
change). Only add `links` entries with confirmed URLs; omit unknown links.
Tech tags must come from the résumé's skills section **and** be supported by
the project's own details — inferred tags are flagged in `OPEN_ITEMS.md`.

## Updating the résumé

Replace `public/Rene-Angelo-Prado-Resume.pdf`. Both hero links
("Résumé" download + "Preview") point at it automatically — the download
attribute includes `.pdf`.

## Images

`public/Prado.jpg` was replaced by optimized variants generated from
`assets-src/Prado.jpg`:

```bash
npm run images   # sharp → public/assets/portrait/*.{avif,webp,jpg} + og.png
```

`sharp` is a devDependency only; nothing image-related ships to the client
beyond the static files in `public/`.

## Inspect mode

Press **G** (or the "Grid" button in the header, ≥768px) to overlay the real
12-column grid, block outlines, and `data-spec` labels showing the actual
token names in use (`--step-5`, `grid 1–9`, …). The overlay reads the same CSS
variables as the layout, so it cannot drift. Everything is `aria-hidden` and
`pointer-events: none`.

## Commands

```bash
npm run dev        # dev server
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
npm run lint       # ESLint (react, react-hooks, jsx-a11y) — must stay clean
npm run contrast   # WCAG contrast gate for both themes
npm run images     # regenerate optimized images + OG card
```
