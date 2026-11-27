// Project index — newest first. `image: null` renders nothing in production;
// set `image` (and optional srcset fields) to a path under /assets/ to swap in
// a real screenshot — a one-line change per project.
// `links` must only contain confirmed URLs; omit unknown links entirely.
// `bullets` are the remaining résumé bullets verbatim (the `objective` is the
// first bullet, kept as the one-line summary).

export const projects = [
  {
    id: 'fish-freshness-detector',
    index: '01',
    title: 'Fish Freshness Detector',
    dates: 'Jan 2026 – May 2026',
    objective:
      'Responsive web interface that classifies fish freshness across four stages from captured or uploaded eye and gill photos.',
    bullets: [
      'Presents the analysis through annotated images and a color-coded verdict with consumption advice for each stage.',
      'Labeled fish eye and gill images into four freshness classes to build the training dataset.'
    ],
    tech: ['Vercel'], // inferred from *.vercel.app domain — unconfirmed, see OPEN_ITEMS.md
    links: [
      {
        label: 'Live',
        href: 'https://grouperfish-freshness-detector.vercel.app/'
      }
    ],
    image: null,
    figLabel: 'Fig. 01, Fish Freshness Detector'
  },
  {
    id: 'facility-reservation',
    index: '02',
    title: 'Facility Reservation Management',
    dates: 'Mar 2025 – May 2025',
    objective:
      'Reservation system for six recreational facilities, with separate user and admin modules.',
    bullets: [
      'Time-slot booking with duplicate-slot prevention, reservation history, and QR code generation.',
      'Admin dashboard with per-facility reservation charts and monthly trends.'
    ],
    tech: ['React', 'Supabase'], // kept from previous site copy — unconfirmed, see OPEN_ITEMS.md
    links: [],
    image: null,
    figLabel: 'Fig. 02, Facility Reservation Management'
  },
  {
    id: 'curriculum-comparison',
    index: '03',
    title: 'Curriculum Comparison System',
    dates: 'Feb 2025 – Mar 2025',
    objective:
      "Web-based system that compares a student's curriculum PDF against the target program's official curriculum.",
    bullets: [
      'Matches courses with a pretrained sentence-embedding model and classifies each as transferable, possibly transferable, or not.',
      'Filterable results showing total transferable units, with one-click PDF export.'
    ],
    tech: [],
    links: [],
    image: null,
    figLabel: 'Fig. 03, Curriculum Comparison System'
  }
];
