// Experience — two entries, most recent first. Education renders as a
// single quiet line under the list (see Journey.jsx), not a timeline item.

export const experience = [
  {
    index: '01',
    role: 'E-Commerce Funnel Developer',
    org: 'Freelance',
    meta: 'Remote',
    dates: 'Aug 2026 – Present',
    bullets: [
      'Launched 30+ Funnelish funnels for 3 clients across 5 markets using custom HTML, CSS, and JavaScript, with content localized for each market.',
      'Configured Shopify products with tiered bundle offers and integrated each funnel with WeTracked for conversion tracking.',
      'Monitored conversion rates and order volume across client funnels and designed client logos in Canva.'
    ]
  },
  {
    index: '02',
    role: 'Frontend Developer Intern',
    org: 'Simplevia Technologies Inc.',
    meta: 'Makati City, Philippines · 300 hours',
    dates: 'Oct 2025 – Nov 2025',
    bullets: [
      'Resolved 14 bugs across API handling, data bindings, event handlers, and data inconsistencies.',
      'Translated Figma designs into 9 responsive, consistently styled UI pages using Vue and Vuetify.',
      'Integrated forms with APIs, fixing data bindings that did not update in real time and adding loading states and status tracking.'
    ]
  }
];

// Quiet education line — facts from the résumé.
export const educationLine = 'B.S. Computer Science, New Era University, 2022–2026';
