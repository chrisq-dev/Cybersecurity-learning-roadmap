import { getMarkdownContent, getContentStructure } from '../../lib/markdown';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import Pagination from '../../components/Pagination';
import TableOfContents from '../../components/TableOfContents';
import Link from 'next/link';

const BASE_URL = "https://cbsdev.lat";
const SOCIAL_IMAGE = "/og-mapa-ciberseguridad.png";

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

function extractDescription(content) {
  if (!content) return null;
  const plain = content
    .replace(/^#+\s.*/gm, '')       // quitar headings
    .replace(/\*\*|__|`{1,3}/g, '') // quitar markdown inline
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → texto
    .replace(/\n+/g, ' ')
    .trim();
  const first = plain.slice(0, 155).trim();
  return first.length > 0 ? first : null;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const data = getMarkdownContent(resolvedParams.slug);
  if (!data) return { title: 'No encontrado' };

  const pageUrl = `${BASE_URL}/${resolvedParams.slug.join('/')}`;
  const description =
    extractDescription(data.content) ||
    `Guía de ${data.title} — ciberseguridad en español.`;

  return {
    title: data.title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${data.title} | cbsdev.lat`,
      description,
      url: pageUrl,
      siteName: "cbsdev.lat",
      images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: data.title }],
      locale: "es_MX",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | cbsdev.lat`,
      description,
      images: [SOCIAL_IMAGE],
    },
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: data.title,
    description: data.meta?.description || `Guía de ${data.title} — ciberseguridad en español.`,
    image: `${BASE_URL}${SOCIAL_IMAGE}`,
    author: {
      "@type": "Person",
      name: "Christian Quiñones",
      url: "https://cbsdev.lat"
    },
    publisher: {
      "@type": "Person",
      name: "Christian Quiñones",
      url: "https://cbsdev.lat"
    },
    inLanguage: "es",
  };

  return (
    <article className="markdown-reader" style={{ paddingBottom: '5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <header style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          ← Volver al inicio
        </Link>
        <h1 className="serif-title guide-title" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          {data.title}
        </h1>
      </header>

      <div className="content-layout">
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
