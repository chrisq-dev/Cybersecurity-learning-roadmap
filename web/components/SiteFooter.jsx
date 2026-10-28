import Link from 'next/link';

const REPO_URL = 'https://github.com/chrisq-dev/Cybersecurity-learning-roadmap';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© {year} cbsdev.lat · Proyecto educativo abierto</p>
        <nav className="footer-links" aria-label="Enlaces del pie de página">
          <Link href="/guias">Guías</Link>
          <Link href="/rutas">Rutas</Link>
          <a href={`${REPO_URL}/blob/main/LICENSE`}>Código MIT</a>
          <a href={`${REPO_URL}/blob/main/LICENSE-CONTENT`}>Contenido CC BY-SA 4.0</a>
          <a href={`${REPO_URL}/blob/main/SECURITY.md`}>Seguridad</a>
        </nav>
      </div>
    </footer>
  );
}
