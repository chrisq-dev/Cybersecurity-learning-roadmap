import CategoryList from '../../components/CategoryList';
import { getContentStructure } from '../../lib/markdown';

export const metadata = {
  title: 'Índice de guías',
  description: 'Explora todas las guías de ciberseguridad en español, ordenadas por área y nivel.',
  alternates: {
    canonical: 'https://cbsdev.lat/guias',
  },
};

export default function GuidesPage() {
  const structure = getContentStructure();
  const totalPages = structure.reduce((total, category) => total + category.pages.length, 0);

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <header style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <h1 className="serif-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
          Índice de guías
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
          Explora las {totalPages} guías del proyecto, organizadas por área de conocimiento y orden de estudio.
        </p>
      </header>

      <CategoryList structure={structure} />
    </div>
  );
}
