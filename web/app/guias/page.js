import GuideExplorer from '../../components/GuideExplorer';
import { getContentStructure } from '../../lib/markdown';
import { AREAS, getAreaForFolder } from '../../lib/areas';

const BASE_URL = 'https://cbsdev.lat';

export const metadata = {
  title: 'Todas las guías de ciberseguridad',
  description:
    'Explora y busca las 125 guías de ciberseguridad en español: fundamentos, redes, Linux, OWASP, blue team, cloud, IA, GRC y carrera.',
  alternates: { canonical: `${BASE_URL}/guias` },
  openGraph: {
    title: 'Todas las guías de ciberseguridad | cbsdev.lat',
    description:
      'Explora y busca las guías por tema, nivel y tipo de contenido.',
    url: `${BASE_URL}/guias`,
    siteName: 'cbsdev.lat',
    locale: 'es_MX',
    type: 'website',
    images: [{ url: '/og-mapa-ciberseguridad.png', width: 1200, height: 630, alt: 'Guías de ciberseguridad en español' }],
  },
};

export default async function GuiasPage({ searchParams }) {
  const params = await searchParams;
  const initialQuery = typeof params?.q === 'string' ? params.q.slice(0, 100) : '';
  const structure = getContentStructure();
  const pages = structure.flatMap((category) => {
    const area = getAreaForFolder(category.folder);
    return category.pages.map((page) => ({
      slug: page.slug.join('/'),
      title: page.title,
      excerpt: page.excerpt,
      level: page.level,
      contentType: page.contentType,
      folder: category.folder,
      category: category.category,
      areaId: area.id,
    }));
  });

  return (
    <div className="guides-page">
      <header className="guides-header">
        <p className="section-kicker">Catálogo completo</p>
        <h1 className="serif-title">Todas las guías</h1>
        <p>
          {pages.length} guías organizadas en {AREAS.length} áreas. Busca por tema, filtra por
          nivel o recorre el mapa en orden.
        </p>
      </header>

      <GuideExplorer pages={pages} areas={AREAS} initialQuery={initialQuery} />
    </div>
  );
}
