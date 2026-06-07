import { motion } from 'framer-motion';

const contactLinks = [
  {
    label: 'Email',
    value: 'reneangeloprado50@gmail.com',
    href: 'mailto:reneangeloprado50@gmail.com'
  },
  {
    label: 'Phone',
    value: '09763688989',
    href: 'tel:+639763688989'
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/reneprado50/',
    href: 'https://linkedin.com/in/reneprado50/'
  },
  {
    label: 'GitHub',
    value: 'github.com/RenePrado',
    href: 'https://github.com/RenePrado'
  }
];

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">Contact</p>
          <h2 className="section-heading mt-4">Let&apos;s connect.</h2>
          <p className="section-copy">
            I&apos;m open to opportunities, collaborations, and conversations around front-end development and
            product-focused work.
          </p>
        </div>

        <div className="glass-panel rounded-[1.75rem] p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactLinks.map((entry) => (
              <a
                key={entry.label}
                href={entry.href}
                target={entry.href.startsWith('http') ? '_blank' : undefined}
                rel={entry.href.startsWith('http') ? 'noreferrer' : undefined}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-accent/40 hover:bg-accent/10"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-accentGreen">{entry.label}</p>
                <p className="mt-3 break-words text-base text-slate-100">{entry.value}</p>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}