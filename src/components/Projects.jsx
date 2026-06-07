import { motion } from 'framer-motion';

const projects = [
  {
    title: 'NEU Compare',
    description:
      'An AI-assisted curriculum comparison and credit validation platform designed to help students review academic paths faster and with better confidence.',
    stack: ['AI-assisted workflow', 'Curriculum comparison', 'Credit validation']
  },
  {
    title: 'NEU Recre Reservation System',
    description:
      'A React.js and Supabase facility reservation system for streamlined booking, scheduling, and user-friendly reservation management.',
    stack: ['React.js', 'Supabase', 'Facility reservation']
  },
  {
    title: 'Fish Freshness Detector',
    description:
      'A real-time image capture web app that classifies fish freshness across four stages for fast and practical quality assessment.',
    stack: ['Real-time capture', 'Image classification', '4-stage freshness']
  }
];

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">Projects</p>
        <h2 className="section-heading mt-4">Selected work across AI, reservation systems, and image-based web apps.</h2>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="glass-panel group rounded-[1.75rem] p-7 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex h-full flex-col">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-lg font-semibold text-accent">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 flex-1 leading-7 text-slate-300">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}