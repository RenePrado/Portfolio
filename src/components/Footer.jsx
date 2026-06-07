export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950/80">
      <div className="section-shell flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-400">© 2026 Rene Angelo Prado. All rights reserved.</p>
        <div className="flex flex-wrap gap-5 text-sm text-slate-300">
          <a href="https://linkedin.com/in/reneprado50/" target="_blank" rel="noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href="https://github.com/RenePrado" target="_blank" rel="noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href="mailto:reneangeloprado50@gmail.com" className="hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}