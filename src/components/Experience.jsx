import { motion } from 'framer-motion';

const highlights = [
  'Built responsive UIs with Vue.js and Vuetify',
  'Created reusable components',
  'Integrated frontend with backend APIs',
  'Collaborated via Git and GitHub',
  'Optimized UI performance'
];

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">Experience</p>
        <h2 className="section-heading mt-4">Internship experience focused on building production-ready interfaces.</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="glass-panel mt-8 rounded-[1.75rem] p-8"
      >
        <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">Front-End Developer Internship</h3>
            <p className="mt-2 text-slate-300">2025</p>
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accentGreen">Internship</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}