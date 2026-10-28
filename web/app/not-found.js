import Link from 'next/link';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="section-kicker">Error 404</p>
      <h1 className="serif-title">Esta página no existe o cambió de lugar</h1>
      <p>
        Revisa la dirección o vuelve al mapa para encontrar la guía que buscas. También puedes
        buscar por tema en el catálogo completo.
      </p>
      <div className="not-found-actions">
        <Link href="/" className="cta-btn-primary">Volver al inicio</Link>
        <Link href="/guias" className="cta-btn-secondary">Buscar una guía</Link>
      </div>
    </div>
  );
}
