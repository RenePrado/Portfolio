# Open items — placeholders and unverified content

Everything below needs the owner's confirmation. Nothing here is shipped as
fact; placeholders are clearly marked in the UI or omitted entirely.

## Placeholders in the UI

- **Project screenshots** — all three project rows show a marked
  "screenshot pending" plate. To swap in real images, set `image` (and
  optionally `imageSrcSet`/`avifSrcSet`/`webpSrcSet`) in
  `src/data/projects.js` — a one-line change per project.
- **About section** — the "development philosophy / what makes my approach
  different" copy is a dashed placeholder box. It needs the owner's own
  words; it was deliberately not written for him.
- **Portrait** — `public/Prado.jpg` is a square white-background photo cropped
  to a 4:5 frame (object-position favors the top). A better crop or cutout
  with a transparent/dark-friendly background would improve both themes.

## Missing links (omitted, never faked)

- Source/repo links for all three projects.
- Live links for **Facility Reservation Management** and
  **Curriculum Comparison System** (only Fish Freshness Detector has a
  confirmed live URL).
- No links at all are shown for the freelance funnel role — none exist to
  confirm.

## Unverified against the résumé (kept, flagged)

- **Facility Reservation Management** tech tags `React` + `Supabase` —
  carried over from the old site copy ("built with React.js and Supabase");
  the résumé does not name them.
- **Fish Freshness Detector** tag `Vercel` — inferred from the
  `*.vercel.app` domain only.
- **Curriculum Comparison System** tag `Python` — inferred from the
  "pretrained sentence-embedding model" bullet.
- **LinkedIn** (`linkedin.com/in/reneprado50/`) — kept from the old site;
  the new résumé does not list it. Confirm it is still wanted.
- Hero label "Front-End Developer" — kept from the old site; confirm it
  still fits now that the freelance funnel role exists.

## Dropped claims (on the old site/résumé, NOT on the new one)

Removed because they appear nowhere in the new résumé:

- "live camera streaming" and "ROI bounding boxes" (old Fish Freshness copy —
  the résumé says captured or uploaded eye and gill photos; **confirm** the
  résumé description is accurate)
- "Python-based computer-vision backend"
- "real-time data management"
- "AI-assisted platform" phrasing for Curriculum Comparison
- Skills: **Java, IBM DB2, MySQL**
- Old "Coming Soon" project buttons and all `#` placeholder links
- Old résumé file `resume/Resume - Prado.pdf` (deleted; replaced by
  `public/Rene-Angelo-Prado-Resume.pdf`)

## Config placeholders

- **Canonical URL / OG URL / OG image URL / Twitter image URL** — currently
  `https://example.com/` placeholders in `index.html`. Replace with the
  production domain when known (search for `TODO(OPEN_ITEMS)`).

## Phone display decision

The phone number is shown masked (`+63 976 ••• ••99`) so it isn't printed as
plain scrapable text; the `tel:+639763688999` link still works and carries an
aria-label with the full number.
