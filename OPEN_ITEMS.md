# Open items — placeholders and unverified content

Everything below needs the owner's confirmation. TODOs live as code comments
in `src/data/*` and `src/components/*`; nothing is rendered as placeholder
text on the page.

## Content needing the owner's words

- **Approach sentence** — `src/data/about.js`: add one sentence on your
  approach to front-end work, in your own words.
- **Availability wording** — `src/data/profile.js` `availability`: currently
  "Open to junior front-end roles & freelance" (draft).
- **Hero lead** — `src/data/profile.js` `intro`: draft copy, confirm or
  replace.
- **Eyebrow** — `src/data/profile.js` `eyebrow`: "Front-end developer ·
  Quezon City", confirm.

## Assets to supply

- **Project screenshots** — all three `image` fields in
  `src/data/projects.js` are `null`. Drop files at
  `public/projects/<id>.webp` (16:10) and set `image` — one line each.
  Optional `mobileImage` renders a small bottom-right inset.
- **Portrait** — currently the existing square photo cropped to 4:5 via
  `object-fit: cover; object-position: center 30%`. A real 900×1125 WebP
  can replace it; the path lives only in `profile.portrait`.
- **OG image** — `public/og.png` is a generated text-on-dark fallback
  (1200×630). Replace with a designed card when ready.
- **Production domain** — `index.html` canonical/OG URLs still point at
  `https://example.com/` (marked TODO in the file).

## Unverified / decisions pending

- **PHP** — kept in the toolkit ("Backend & data") until confirmed.
- **Bootstrap, Jira, Lucidchart, Canva** — removed from the toolkit.
- **Project 01 tech tags** — empty; "Vercel" kept as a hosting note only.
  Supply the real stack.
- **Projects 02/03 tech tags** — `React` + `Supabase` on Facility
  Reservation are unconfirmed (carried from old copy); Curriculum
  Comparison has none.
- **Project links** — only Fish Freshness Detector has a confirmed live
  URL. `repo`/`live`/`private` fields exist in `src/data/projects.js`;
  nothing dead is rendered.
- **LinkedIn** — kept; the new résumé does not list it. Confirm.
- **Hero résumé link** — kept per §6 hero CTA spec; note there are then
  three résumé links (nav, hero, Contact) while §2/checklist say two
  (nav + Contact). Remove `hero__resume` in `Hero.jsx` if unwanted.

## Dropped claims (on the old site/résumé, NOT on the new one)

- "live camera streaming" and "ROI bounding boxes" (old Fish Freshness
  copy — the résumé says captured or uploaded eye and gill photos)
- "Python-based computer-vision backend"
- "real-time data management"
- "AI-assisted platform" phrasing for Curriculum Comparison
- Skills: **Java, IBM DB2, MySQL**
- Old "Coming Soon" project buttons and all `#` placeholder links
- Old résumé file `resume/Resume - Prado.pdf` (deleted; replaced by
  `public/Rene-Angelo-Prado-Resume.pdf`)
