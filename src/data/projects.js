// Project index — newest first. `image: null` renders a marked placeholder
// plate; set `image` (and optional `imageSrcSet`) to a path under /assets/
// to swap in a real screenshot — a one-line change per project.
// `links` must only contain confirmed URLs; omit unknown links entirely.

export const projects = [
  {
    id: 'fish-freshness-detector',
    index: '01',
    title: 'Fish Freshness Detector',
    dates: 'Jan 2026 – May 2026',
    objective:
      'Responsive web interface that classifies fish freshness across four stages from captured or uploaded eye and gill photos.',
    tech: ['Vercel'], // inferred from *.vercel.app domain — see OPEN_ITEMS.md
    contribution:
      'Labeled fish eye and gill images into four freshness classes to build the training dataset.',
    links: [
      {
        label: 'Live',
        href: 'https://grouperfish-freshness-detector.vercel.app/'
      }
    ],
    image: null,
    figLabel: 'Fig. 01 — Fish Freshness Detector'
  },
  {
    id: 'facility-reservation',
    index: '02',
    title: 'Facility Reservation Management',
    dates: 'Mar 2025 – May 2025',
    objective:
      'Reservation system for six recreational facilities, with separate user and admin modules.',
    tech: ['React', 'Supabase'], // kept from previous site copy — unverified, see OPEN_ITEMS.md
    contribution:
      'Time-slot booking with duplicate-slot prevention, reservation history, and QR code generation; admin dashboard with per-facility charts and monthly trends.',
    links: [],
    image: null,
    figLabel: 'Fig. 02 — Facility Reservation Management'
  },
  {
    id: 'curriculum-comparison',
    index: '03',
    title: 'Curriculum Comparison System',
    dates: 'Feb 2025 – Mar 2025',
    objective:
      "Web-based system that compares a student's curriculum PDF against the target program's official curriculum.",
    tech: ['Python'], // inferred from pretrained sentence-embedding model — see OPEN_ITEMS.md
    contribution:
      'Matched courses with a pretrained sentence-embedding model, classifying each as transferable, possibly transferable, or not; filterable results with total transferable units and one-click PDF export.',
    links: [],
    image: null,
    figLabel: 'Fig. 03 — Curriculum Comparison System'
  }
];
