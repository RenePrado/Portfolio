# Content trace — every factual claim → résumé source

Source of truth: `public/Rene-Angelo-Prado-Resume.pdf` (the new résumé).
"Spec" = the task prompt's content section (derived from the résumé).
Anything not mappable is listed in `OPEN_ITEMS.md`.

## Identity / contact (`src/data/profile.js`)

| Claim on site | Résumé source |
|---|---|
| Name "Rene Angelo Prado" | Header: "Rene Angelo Prado" |
| "Quezon City, Philippines" | Header + Education location |
| Email `reneangeloprado50@gmail.com` | Header |
| Phone `tel:+639763688999` | Header "+63 976 368 8999" |
| GitHub `github.com/RenePrado` | Header |
| LinkedIn `linkedin.com/in/reneprado50/` | **Not on résumé** — kept from old site, flagged in OPEN_ITEMS |
| Hero label "Front-End Developer" | **Not on résumé** — kept from old site, flagged in OPEN_ITEMS |
| Hero intro paragraph | **Not on résumé** — kept verbatim per task spec §5, flagged |
| Portrait caption "Fig. 01 — …, Quezon City" | Location on résumé; photo itself unverified asset |

## About (`src/components/sections/About.jsx`)

| Claim | Résumé source |
|---|---|
| "front-end developer and 2026 Computer Science graduate" | Education: BS CS, 08/2022–06/2026 |
| "based in Quezon City, Philippines" | Header / Education location |
| "Vue.js and Vuetify — translating Figma designs into responsive, consistently styled pages" | Internship bullet: "Translated Figma designs into 9 responsive, consistently styled UI pages using Vue and Vuetify" |
| "custom HTML, CSS, and JavaScript for e-commerce funnels" | Freelance bullet: "custom HTML, CSS, and JavaScript" |
| "skills also include React and TypeScript" | Skills: Frontend list |
| "30+ Funnelish funnels for 3 clients across 5 markets" | Freelance bullet 1 (verbatim numbers) |
| "frontend internship at Simplevia Technologies Inc. resolving 14 bugs across API handling, data bindings, and event handlers" | Internship bullet 1 (verbatim) |
| Owner-words placeholder | Marked `[ Owner note needed … ]` — not invented |

## Projects (`src/data/projects.js`)

| Claim | Résumé source |
|---|---|
| Fish Freshness Detector, Jan–May 2026 | PROJECTS entry 01/2026–05/2026 |
| "classifies fish freshness across four stages from captured or uploaded eye and gill photos" | Bullet 1 (verbatim) |
| "annotated images and a color-coded verdict" detail → folded into objective/contribution | Bullets 1–2 |
| "Labeled fish eye and gill images into four freshness classes to build the training dataset" | Bullet 3 (verbatim, contribution column) |
| Tech tag `Vercel` | **Inferred** from `*.vercel.app` — flagged in OPEN_ITEMS |
| Live link `grouperfish-freshness-detector.vercel.app` | Confirmed live URL per task spec |
| Facility Reservation Management, Mar–May 2025 | PROJECTS entry 03/2025–05/2025 |
| "six recreational facilities, separate user and admin modules" | Bullet 1 (verbatim) |
| "Time-slot booking with duplicate-slot prevention, reservation history, and QR code generation; admin dashboard with per-facility charts and monthly trends" | Bullets 2–3 (verbatim) |
| Tech tags `React`, `Supabase` | **Unverified** — old site copy, flagged in OPEN_ITEMS |
| No links for this project | No confirmed URLs — omitted per spec |
| Curriculum Comparison System, Feb–Mar 2025 | PROJECTS entry 02/2025–03/2025 |
| "compares a student's curriculum PDF against the target program's official curriculum" | Bullet 1 (verbatim) |
| "pretrained sentence-embedding model … transferable, possibly transferable, or not … filterable results … one-click PDF export" | Bullets 2–3 (verbatim) |
| Tech tag `Python` | **Inferred** from embedding-model bullet — flagged in OPEN_ITEMS |
| No links for this project | No confirmed URLs — omitted per spec |

## Journey (`src/data/journey.js`)

| Claim | Résumé source |
|---|---|
| E-Commerce Funnel Developer · Freelance · Remote · Aug 2026 – Present | EXPERIENCE entry 1 (08/2026–Present, Freelance, Remote) |
| All three bullets (30+, 3, 5, Shopify, WeTracked, Canva) | EXPERIENCE bullets 1–3 (verbatim) |
| Frontend Developer Intern (300 hours) · Simplevia Technologies Inc. · Makati City · Oct–Nov 2025 | EXPERIENCE entry 2 (10/2025–11/2025) — "300 hours" verbatim from title |
| All three bullets (14 bugs, 9 pages, Vue/Vuetify, forms/APIs) | EXPERIENCE bullets 1–3 (verbatim) |
| New Era University · BS Computer Science · Quezon City · Aug 2022 – Jun 2026 | EDUCATION entry (08/2022–06/2026) |
| Kind labels "Experience"/"Education" | Structural labels, not factual claims |

## Stack (`src/data/stack.js`)

All four groups and every item are verbatim from the résumé SKILLS section:
Frontend (Vue.js, Vuetify, React, JavaScript, TypeScript, HTML, CSS, Tailwind
CSS, Bootstrap) · Backend/Database (Python, Supabase, SQL, PHP) ·
Tools (Git, GitHub, VS Code, Vercel, Figma, Jira, Lucidchart) ·
E-commerce (Shopify, Funnelish, WeTracked, Canva, Google Analytics).
Removed vs old site: Java, IBM DB2, MySQL (not on résumé — OPEN_ITEMS).

## SEO / meta (`index.html`)

| Claim | Résumé source |
|---|---|
| Description: "front-end developer and 2026 Computer Science graduate based in Quezon City… freelance e-commerce funnel development and a frontend internship at Simplevia" | Role/education/experience above |
| OG/Twitter title "Front-End Developer" | Same unverified label as hero — OPEN_ITEMS |
| Canonical/OG URLs `example.com` | Placeholder — production domain unknown (OPEN_ITEMS) |

## Explicitly NOT on the site (dropped claims)

"live camera streaming", "ROI bounding boxes", "Python-based computer-vision
backend", "real-time data management", "AI-assisted", Java, IBM DB2, MySQL,
"Coming Soon" buttons, `#` links, invented client names/URLs/testimonials,
any derived statistics (no "years of experience", no percentages).
