import { motion } from 'framer-motion';

const skillGroups = [
  {
    label: 'Languages',
    items: ['Java', 'SQL', 'JavaScript', 'PHP', 'Python']
  },
  {
    label: 'Web',
    items: ['HTML', 'CSS', 'React.js', 'Vue.js', 'Vuetify', 'Tailwind CSS']
  },
  {
    label: 'Database',
    items: ['MySQL', 'IBM DB2', 'Supabase']
  },
  {
    label: 'Tools',
    items: ['GitHub', 'VS Code', 'Figma', 'Lucidchart', 'Google Analytics', 'Jira']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">Skills</p>
        <h2 className="section-heading mt-4">A focused stack for front-end delivery and collaboration.</h2>
      </motion.div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="glass-panel rounded-[1.5rem] p-6"
          >
            <h3 className="text-lg font-semibold text-white">{group.label}</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {group.items.map((item) => (
                <span key={item} className="tag-pill">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}