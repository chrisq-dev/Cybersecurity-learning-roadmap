import Link from 'next/link';

export default function Pagination({ prevPage, nextPage }) {
  if (!prevPage && !nextPage) return null;

  return (
    <div className="pagination-grid">
      {prevPage ? (
        <Link href={`/${prevPage.slug.join('/')}`} className="book-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            ← Anterior
          </span>
          <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem' }}>{prevPage.title}</h4>
        </Link>
      ) : <div />}

      {nextPage ? (
        <Link href={`/${nextPage.slug.join('/')}`} className="book-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Siguiente →
          </span>
          <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem' }}>{nextPage.title}</h4>
        </Link>
      ) : <div />}
    </div>
  );
}
