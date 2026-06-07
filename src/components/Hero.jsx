import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

export default function Hero() {
  return (
    <section id="home" className="section-shell grid items-center gap-14 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:pt-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
          Front-End Developer and Computer Science Student
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Rene Angelo Prado
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
          I build clean, responsive interfaces that balance design precision with solid front-end engineering.
          I enjoy turning ideas into polished products with thoughtful interactions and strong performance.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-navy-950 transition hover:translate-y-[-2px] hover:bg-white"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-3xl" />
        <div className="glass-panel overflow-hidden rounded-[2rem] p-5">
          <div className="rounded-[1.75rem] border border-white/10 bg-navy-900 p-6">
            <div className="flex justify-center">
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white/10 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 shadow-glow sm:h-64 sm:w-64">
                <img
                  src="/assets/profile.jpg"
                  alt="Rene Angelo Prado"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-accentGreen">Available for opportunities</p>
              <p className="mt-2 text-base text-slate-200">
                Front-end focused, detail-driven, and comfortable working across design, code, and collaboration.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}