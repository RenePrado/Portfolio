// Selected work — newest first. Project 01 is featured (7-col media + 5-col
// text); the rest render as a side-by-side pair.
//
// To add a screenshot: drop the file at /public/projects/<id>.webp and set
// `image: '/projects/<id>.webp'` (16:10). Optional `mobileImage` renders a
// small inset at the bottom-right of the frame.
// `links`: set `live` / `repo` URLs that exist; `private: true` shows a
// non-link "Private repo" note. Never render dead links.
// TODO(owner): project 01's real stack — "Vercel" is a host, kept as a
// hosting note, not a tech tag. Projects 02/03 tech tags unconfirmed.

export const projects = [
  {
    id: 'fish-freshness-detector',
    title: 'Fish Freshness Detector',
    description:
      'Responsive web interface that classifies fish freshness across four stages from captured or uploaded eye and gill photos.',
    result:
      'Presents annotated images with a color-coded verdict and consumption advice; also labeled the four-class eye and gill training set.',
    tech: [], // TODO(owner): real stack
    hosting: 'Vercel',
    links: {
      live: 'https://grouperfish-freshness-detector.vercel.app/',
      repo: null,
      private: false
    },
    image: null,
    mobileImage: null,
    figLabel: 'Fig. 01: Freshness verdict'
  },
  {
    id: 'facility-reservation',
    title: 'Facility Reservation Management',
    description:
      'Reservation system for six recreational facilities, with separate user and admin modules.',
    result:
      'Time-slot booking with duplicate-slot prevention, reservation history and QR codes; admin dashboard with per-facility charts and monthly trends.',
    tech: ['React', 'Supabase'], // unconfirmed — see OPEN_ITEMS.md
    hosting: null,
    links: { live: null, repo: null, private: false },
    image: null,
    mobileImage: null,
    figLabel: 'Fig. 02: Admin dashboard'
  },
  {
    id: 'curriculum-comparison',
    title: 'Curriculum Comparison System',
    description:
      "Web-based system that compares a student's curriculum PDF against the target program's official curriculum.",
    result:
      'Matches courses with a pretrained sentence-embedding model, classifies each as transferable, possibly transferable, or not, and exports filterable transferable-unit reports to PDF.',
    tech: [], // TODO(owner): real stack
    hosting: null,
    links: { live: null, repo: null, private: false },
    image: null,
    mobileImage: null,
    figLabel: 'Fig. 03: Transferable-unit report'
  }
];
