export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <p className="mono site-footer__copy">© {year} Rene Angelo Prado</p>
      </div>
    </footer>
  );
}
