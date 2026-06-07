import { useEffect, useState } from 'react';
import { Download, ExternalLink, Sun, Moon, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'NEU Compare',
    description:
      'AI-assisted platform for curriculum comparison and credit validation. Designed to compare syllabi and generate credit equivalency recommendations.',
    link: '#',
  },
  {
    title: 'NEU Recre Reservation System',
    description:
      'Web-based facility reservation system with Admin and User modules. Built with React.js and Supabase for a clean booking flow.',
    link: '#',
  },
  {
    title: 'Fish Freshness Detector',
    description:
      'Web app using live camera streaming and ROI bounding boxes to classify fish freshness in four stages.',
    link: 'https://grouperfish-freshness-detector.vercel.app/',
  },
];

const skillGroups = [
  {
    label: 'Languages',
    items: ['Java', 'SQL', 'JavaScript', 'PHP', 'Python'],
  },
  {
    label: 'Web',
    items: ['HTML', 'CSS', 'React.js', 'Vue.js', 'Vuetify', 'Tailwind CSS'],
  },
  {
    label: 'Database',
    items: ['MySQL', 'IBM DB2', 'Supabase'],
  },
  {
    label: 'Tools',
    items: ['GitHub', 'VS Code', 'Figma', 'Lucidchart', 'Google Analytics', 'Jira'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

function SectionHeading({ title }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h2>
    </div>
  );
}

function Navbar({ isDark, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    ['About', '#about'],
    ['Experience', '#experience'],
    ['Projects', '#projects'],
    ['Skills', '#skills'],
    ['Contact', '#contact'],
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-[#e8e0d0] dark:border-[#3a3530] bg-[#f5f0e8] dark:bg-[#1c1814] h-16 transition-colors duration-300"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-8 h-full">
        <a href="#home" className="font-semibold text-lg text-[#1a1a1a] dark:text-white transition-colors duration-300">
          RAP.
        </a>
        <nav className="hidden items-center gap-4 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link text-base font-medium text-[#1a1a1a] dark:text-white transition hover:text-[#b5651d] transition-colors duration-300">
              {label}
            </a>
          ))}
          <button
            onClick={() => setIsDark(prev => !prev)}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[#e8e0d0] dark:border-[#3a3530] text-[#1a1a1a] dark:text-white hover:bg-[#e8e0d0] dark:hover:bg-[#3a3530] transition-colors duration-300"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsDark(prev => !prev)}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[#e8e0d0] dark:border-[#3a3530] text-[#1a1a1a] dark:text-white hover:bg-[#e8e0d0] dark:hover:bg-[#3a3530] transition-colors duration-300"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[#e8e0d0] dark:border-[#3a3530] text-[#1a1a1a] dark:text-white hover:bg-[#e8e0d0] dark:hover:bg-[#3a3530] transition-colors duration-300"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#f5f0e8] dark:bg-[#1c1814] w-full py-4 px-6 flex flex-col gap-4 border-b border-[#e8e0d0] dark:border-[#3a3530] transition-colors duration-300"
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-[#1a1a1a] dark:text-white transition hover:text-[#b5651d] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}

function Hero() {
  return (
    <section id="home" className="bg-[#f5f0e8] dark:bg-[#1c1814] transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 items-center">
          <div className="order-1 md:order-2 md:col-span-1 flex justify-center">
            <motion.img
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              src="/Prado.jpg"
              alt="Rene Angelo Prado"
              className="w-40 h-40 md:w-56 md:h-56 rounded-2xl object-cover"
            />
          </div>
          <div className="order-2 md:order-1 md:col-span-2 text-center md:text-left">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-xs tracking-widest text-[#b5651d] uppercase"
            >
              Front-End Developer
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-[#1a1a1a] dark:text-white transition-colors duration-300"
            >
              Rene Angelo Prado
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-4 text-base leading-7 text-[#5c5046] dark:text-[#a89f94] transition-colors duration-300"
            >
              I build responsive, user-friendly interfaces with a simple and thoughtful front-end approach.
              I enjoy turning ideas into clean web experiences that are practical and easy to use.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-row items-center gap-2 flex-nowrap justify-center md:justify-start"
            >
              <a
                href="#projects"
                className="rounded-full bg-[#1a1a1a] dark:bg-white px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-semibold text-[#f5f0e8] dark:text-[#1c1814] transition hover:bg-[#2a2a2a] dark:hover:bg-[#e0e0e0] transition-colors duration-300"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[#1a1a1a] dark:border-white px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-semibold text-[#1a1a1a] dark:text-white transition hover:border-[#b5651d] hover:text-[#b5651d] transition-colors duration-300"
              >
                Contact Me
              </a>
              <a
                href="/resume/Resume - Prado.pdf"
                download="Rene_Angelo_Prado_CV"
                title="Download CV"
                className="w-9 h-9 rounded-full bg-[#1a1a1a] dark:bg-white text-[#f5f0e8] dark:text-[#1c1814] flex items-center justify-center hover:opacity-80 transition-all duration-200 transition-colors duration-300"
              >
                <Download size={16} />
              </a>
              <a
                href="/resume/Resume - Prado.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Preview CV"
                className="w-9 h-9 rounded-full border border-[#1a1a1a] dark:border-white text-[#1a1a1a] dark:text-white flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 transition-colors duration-300"
              >
                <ExternalLink size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      id="about"
      className="bg-[#f5f0e8] dark:bg-[#1c1814] transition-colors duration-300 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-6 transition-colors duration-300">About</h2>
          <p className="text-lg leading-7 text-[#5c5046] dark:text-[#a89f94] transition-colors duration-300">
            I am a Front-End Developer who values clean interfaces, reliable code, and practical user experiences. 
            I enjoy building modern web pages with a minimal, developer-focused approach.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function Education() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      id="education"
      className="bg-[#f5f0e8] dark:bg-[#1c1814] transition-colors duration-300"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-6 transition-colors duration-300">Education</h2>
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl bg-[#fffdf9] dark:bg-[#242018] p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 transition-colors duration-300"
          >
            <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white transition-colors duration-300">New Era University</h3>
            <p className="mt-1 text-sm text-[#8a7f72] dark:text-[#a89f94] transition-colors duration-300">BS Computer Science, 2022–2026</p>
            <p className="mt-1 text-sm text-[#8a7f72] dark:text-[#a89f94] transition-colors duration-300">Dean&apos;s Lister 2024–2025</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function Experience() {
  const items = [
    'Built responsive UIs with Vue.js and Vuetify',
    'Created reusable components',
    'Integrated frontend with backend APIs',
    'Used Git for version control',
    'Optimized UI performance',
  ];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      id="experience"
      className="bg-[#f5f0e8] dark:bg-[#1c1814] transition-colors duration-300 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-6 transition-colors duration-300">Experience</h2>
        <motion.div
          whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-[#fffdf9] dark:bg-[#242018] p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 transition-colors duration-300"
        >
          <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] dark:text-white transition-colors duration-300">Front-End Developer Intern</h3>
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#b5651d]">Internship</p>
          </div>
          <p className="pb-4 text-sm text-[#8a7f72] dark:text-[#a89f94] border-b border-[#e8e0d0] dark:border-[#3a3530] transition-colors duration-300">Simplevia · 2025</p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#1a1a1a] dark:text-white transition-colors duration-300">
            {items.map((item) => (
              <li key={item} className="leading-6">
                <div className="flex items-start gap-2">
                  <span className="text-[#b5651d] mt-0.5 transition-colors duration-300">•</span>
                  <span>{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Projects() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      id="projects"
      className="bg-[#f5f0e8] dark:bg-[#1c1814] transition-colors duration-300 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-6 transition-colors duration-300">Projects</h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 grid-cols-1 sm:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col rounded-2xl bg-[#fffdf9] dark:bg-[#242018] p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 transition-colors duration-300"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-xs text-[#b5651d] font-mono transition-colors duration-300">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold text-[#1a1a1a] dark:text-white transition-colors duration-300">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c5046] dark:text-[#a89f94] transition-colors duration-300">{project.description}</p>
                </div>
                {project.link === '#' ? (
                  <span className="mt-4 inline-block text-xs tracking-widest uppercase font-medium border border-[#1a1a1a] dark:border-white text-[#1a1a1a] dark:text-white px-4 py-2 rounded-full opacity-40 cursor-not-allowed pointer-events-none transition-colors duration-300">
                    Coming Soon
                  </span>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs tracking-widest uppercase font-medium border border-[#1a1a1a] dark:border-white text-[#1a1a1a] dark:text-white px-4 py-2 rounded-full hover:bg-[#1a1a1a] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 transition-colors duration-300"
                  >
                    Live Preview
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function Skills() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      id="skills"
      className="bg-[#f5f0e8] dark:bg-[#1c1814] transition-colors duration-300 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-6 transition-colors duration-300">Skills</h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 grid-cols-2 md:grid-cols-4"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.label}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              transition={{ duration: 0.2 }}
              className="h-full rounded-2xl bg-[#fffdf9] dark:bg-[#242018] p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200 transition-colors duration-300"
            >
              <p className="text-xs tracking-widest text-[#8a7f72] dark:text-[#a89f94] uppercase transition-colors duration-300">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full bg-[#ede8df] dark:bg-[#3a3530] px-3 py-1 text-xs text-[#5c5046] dark:text-[#a89f94] hover:scale-105 transition-transform duration-150 transition-colors duration-300">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function Contact() {
  const contactItems = [
    { label: 'EMAIL', value: 'reneangeloprado50@gmail.com', href: 'mailto:reneangeloprado50@gmail.com' },
    { label: 'PHONE', value: '09763688999', href: 'tel:+639763688999' },
    { label: 'LINKEDIN', value: 'linkedin.com/in/reneprado50/', href: 'https://linkedin.com/in/reneprado50/' },
    { label: 'GITHUB', value: 'github.com/RenePrado', href: 'https://github.com/RenePrado' },
  ];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      id="contact"
      className="bg-[#f5f0e8] dark:bg-[#1c1814] transition-colors duration-300 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-white mb-6 transition-colors duration-300">Contact</h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 grid-cols-2 md:grid-cols-4"
        >
          {contactItems.map((item) => (
            <motion.a
              key={item.label}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              transition={{ duration: 0.2 }}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex flex-col p-4 sm:p-5 rounded-2xl bg-[#fffdf9] dark:bg-[#242018] shadow-sm hover:shadow-md transition-shadow duration-200 transition-colors duration-300"
            >
              <p className="text-xs tracking-widest text-[#8a7f72] dark:text-[#a89f94] uppercase transition-colors duration-300">{item.label}</p>
              <p className="mt-1 text-sm font-medium text-[#1a1a1a] dark:text-white truncate transition-colors duration-300">{item.value}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#e8e0d0] dark:border-[#3a3530] bg-[#f5f0e8] dark:bg-[#1c1814] transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 text-center">
        <p className="text-sm text-[#8a7f72] dark:text-[#a89f94] transition-colors duration-300">© 2026 Rene Angelo Prado</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = '/Prado.jpg';
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/jpeg';
      link.href = '/Prado.jpg';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-[#f5f0e8] dark:bg-[#1c1814] text-[#1a1a1a] dark:text-white font-[Inter] ${isDark ? 'dark' : ''}`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}