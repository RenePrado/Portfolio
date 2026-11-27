export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <p className="site-footer__copy">© {year} Rene Angelo Prado</p>
        <a className="site-footer__top" href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
