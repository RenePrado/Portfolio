import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">About</p>
          <h2 className="section-heading mt-4">Building interfaces with clarity and purpose.</h2>
        </div>
        <div className="glass-panel rounded-[1.75rem] p-8">
          <p className="text-lg leading-8 text-slate-300">
            I am Rene Angelo Prado, a Front-End Developer and Computer Science student focused on creating
            responsive, user-friendly web experiences. I enjoy working on projects that combine practical
            engineering, visual polish, and reliable interaction patterns.
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accentGreen">Education</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">New Era University</h3>
            <p className="mt-2 text-slate-300">BS Computer Science • 2022–2026</p>
            <p className="mt-2 text-slate-300">Dean&apos;s Lister • 2024–2025</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}