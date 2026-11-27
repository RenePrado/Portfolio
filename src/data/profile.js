export const profile = {
  name: 'Rene Angelo Prado',
  nameShort: 'Rene Angelo Prado',
  // Hero name renders as two lines; "Prado" is indented ~2 columns.
  nameLines: ['Rene Angelo', 'Prado'],
  role: 'Front-End Developer',
  // TODO(owner): confirm eyebrow wording.
  eyebrow: 'Front-end developer · Quezon City',
  // TODO(owner): confirm availability wording before launch.
  availability: 'Open to junior front-end roles & freelance',
  // TODO(owner): draft lead copy — confirm or replace.
  intro:
    'I turn Figma designs into responsive Vue and React interfaces, and build e-commerce funnels for clients across five markets.',
  location: 'Quezon City, Philippines',
  email: 'reneangeloprado50@gmail.com',
  // Full number shown only after the visitor asks for it (see Contact.jsx).
  phonePretty: '+63 976 368 8999',
  phoneTel: '+639763688999',
  github: 'github.com/RenePrado',
  githubUrl: 'https://github.com/RenePrado',
  linkedinUrl: 'https://linkedin.com/in/reneprado50/',
  linkedinLabel: 'linkedin.com/in/reneprado50',
  resumePath: '/Rene-Angelo-Prado-Resume.pdf',
  resumeFileName: 'Rene-Angelo-Prado-Resume.pdf',
  // Single source for the portrait path — swap files here only.
  // Existing square source is cropped to 4:5 via object-fit: cover;
  // replace with a real 900×1125 WebP when available.
  portrait: {
    src: '/assets/portrait/portrait-800.jpg',
    srcSet: '/assets/portrait/portrait-480.jpg 480w, /assets/portrait/portrait-800.jpg 800w',
    avifSrcSet:
      '/assets/portrait/portrait-480.avif 480w, /assets/portrait/portrait-800.avif 800w',
    webpSrcSet:
      '/assets/portrait/portrait-480.webp 480w, /assets/portrait/portrait-800.webp 800w',
    sizes: '(min-width: 1024px) 300px, (min-width: 640px) 220px, 96px',
    width: 300,
    height: 375,
    alt: 'Portrait of Rene Angelo Prado'
    // fetch priority is set via the <link rel="preload"> in index.html —
    // React 18 has no fetchPriority JSX prop.
  }
};
