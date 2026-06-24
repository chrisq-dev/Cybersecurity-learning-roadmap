import { getMarkdownContent, getContentStructure } from '../../lib/markdown';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import Pagination from '../../components/Pagination';
import TableOfContents from '../../components/TableOfContents';
import LessonProgress from '../../components/LessonProgress';
import Link from 'next/link';

export async function generateStaticParams() {
  const structure = getContentStructure();
  let paths = [];
  structure.forEach((category) => {
    category.pages.forEach((page) => {
      paths.push({ slug: page.slug });
    });
  });
  return paths;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const data = getMarkdownContent(resolvedParams.slug);
  if (!data) return { title: 'No encontrado' };
  return {
    title: `${data.title} | Ciberseguridad`,
    description: `Guia de ${data.title} — ciberseguridad en español.`,
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const data = getMarkdownContent(resolvedParams.slug);

  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <h1>404 — Documento no encontrado</h1>
        <Link href="/">Volver al inicio</Link>
      </div>
    );
  }

  const structure = getContentStructure();
  const allPages = structure.flatMap(category => category.pages);
  const currentIndex = allPages.findIndex(p => p.slug.join('/') === resolvedParams.slug.join('/'));

  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;
  const currentSlug = resolvedParams.slug.join('/');

  return (
    <article className="markdown-reader" style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          ← Volver al inicio
        </Link>
        <h1 className="serif-title" style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '3rem' }}>
          {data.title}
        </h1>
        {(data.meta.dificultad || data.meta.tiempo_estimado) && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {data.meta.dificultad && (
              <span className="meta-badge">Dificultad: {data.meta.dificultad}</span>
            )}
            {data.meta.tiempo_estimado && (
              <span className="meta-badge">Tiempo: {data.meta.tiempo_estimado}</span>
            )}
          </div>
        )}
        <LessonProgress slug={currentSlug} />
      </header>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <MarkdownRenderer
            content={data.content}
            basePath={resolvedParams.slug.length > 1 ? resolvedParams.slug.slice(0, -1).join('/') : ''}
          />
          <Pagination prevPage={prevPage} nextPage={nextPage} />
        </div>
        <TableOfContents content={data.content} />
      </div>
    </article>
  );
}
