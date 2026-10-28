import { getContentStructure } from '../lib/markdown';
import { AREAS } from '../lib/areas';
import { ROADMAP_STEPS } from '../lib/roadmap';
import Link from 'next/link';
import { FaArrowRight, FaSearch } from 'react-icons/fa';

const TOPICS = ['Linux', 'Phishing', 'OWASP', 'Cloud', 'Blue Team', 'Empleabilidad'];

export default function Home() {
  const structure = getContentStructure();
  const totalPages = structure.reduce((acc, category) => acc + category.pages.length, 0);
  const pageBySlug = new Map(
    structure.flatMap((category) =>
      category.pages.map((page) => [page.slug.join('/'), page])
    )
  );

  const exploreAreas = AREAS.map((area) => {
    const links = area.featured
      .map((slug) => {
        const page = pageBySlug.get(slug);
        return page ? [page.title, `/${slug}`] : null;
      })
      .filter(Boolean);

    if (links.length === 0) {
      const fallback = structure.find((category) => area.folders.includes(category.folder));
      if (fallback) {
        fallback.pages.slice(0, 4).forEach((page) => {
          links.push([page.title, `/${page.slug.join('/')}`]);
        });
      }
    }

    return { ...area, links };
  }).filter((area) => area.links.length > 0);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mapa abierto de ciberseguridad en español",
    description: "Colección abierta de explicaciones y recursos de ciberseguridad organizados por área de conocimiento.",
    url: "https://cbsdev.lat",
    inLanguage: "es",
    numberOfItems: totalPages,
    author: {
      "@type": "Person",
      name: "Christian Quiñones",
      url: "https://cbsdev.lat"
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <section className="hero">
        <p className="section-kicker">Ciberseguridad en español · 100% abierta</p>
        <h1 className="serif-title hero-title">
          Un mapa abierto de <br className="hero-break" />
          <em>ciberseguridad</em> en español
        </h1>

        <p className="hero-subtitle">
          Una colección organizada de explicaciones y recursos para consultar fundamentos,
          conectar conceptos y explorar la ciberseguridad sin perderte.
        </p>

        <form className="home-search" action="/guias" method="get" role="search">
          <FaSearch className="home-search-icon" aria-hidden="true" size={18} />
          <label className="sr-only" htmlFor="home-search-input">
            Buscar una guía de ciberseguridad
          </label>
          <input
            id="home-search-input"
            name="q"
            type="search"
            placeholder="Busca un tema"
            autoComplete="off"
            maxLength={100}
          />
          <button type="submit">Buscar</button>
        </form>

        <div className="topic-chips" aria-label="Búsquedas populares">
          {TOPICS.map((topic) => (
            <Link key={topic} href={`/guias?q=${encodeURIComponent(topic)}`} className="topic-chip">
              {topic}
            </Link>
          ))}
        </div>

        <div className="hero-actions">
          <Link href="/inicio-aqui" className="cta-btn-primary">
            Comenzar desde cero <FaArrowRight size={13} />
          </Link>
          <Link href="/rutas" className="cta-btn-secondary">
            Ver rutas temáticas
          </Link>
        </div>

        <div className="home-stats">
          <div><strong>{totalPages}</strong> guías</div>
          <span className="stats-divider">|</span>
          <div><strong>{AREAS.length}</strong> áreas</div>
          <span className="stats-divider">|</span>
          <div>100% en español</div>
        </div>
      </section>

      <section className="home-roadmap" aria-labelledby="home-roadmap-title">
        <div className="home-roadmap-heading">
          <div>
            <p className="section-kicker">Secuencia sugerida</p>
            <h2 id="home-roadmap-title">Ruta de estudio recomendada</h2>
          </div>
          <Link href="/rutas#ruta-lineal">Ver la ruta completa →</Link>
        </div>
        <div className="roadmap-strip">
          {ROADMAP_STEPS.slice(0, 4).map((step, index) => (
            <div key={step.num} className="roadmap-item">
              <Link href={step.href} className="roadmap-step">
                <span className="roadmap-step-num">{step.num}</span>
                <span className="roadmap-step-label">{step.label}</span>
              </Link>
              {index < 3 && <span className="roadmap-arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="explore-map" aria-labelledby="explore-map-title">
        <div className="explore-heading">
          <div>
            <p className="section-kicker">{AREAS.length} áreas conectadas</p>
            <h2 id="explore-map-title">Explorar el mapa</h2>
          </div>
          <p>
            Empieza por <Link href="/inicio-aqui">Inicio Aquí</Link> y sigue los fundamentos.
            Después puedes profundizar con una <Link href="/rutas">ruta temática</Link> o buscar
            directamente en el <Link href="/guias">catálogo completo</Link>.
          </p>
        </div>

        <div className="area-grid">
          {exploreAreas.map((area) => (
            <div key={area.id} className="book-card area-card">
              <h3>
                <Link href={area.links[0][1]} className="area-title-link">
                  {area.title}
                </Link>
              </h3>
              <p className="area-description">{area.description}</p>
              <div className="area-links">
                {area.links.map(([label, href]) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="open-source-note">
        <h2 className="serif-title">Proyecto abierto</h2>
        <div>
          <p>
            Esta guía está en construcción constante. La idea es seguir agregando recursos,
            mejorando explicaciones y corrigiendo contenido conforme estudio, contrasto fuentes
            oficiales y recibo feedback de la comunidad.
          </p>
          <p>
            Si encuentras un error o una explicación confusa, puedes abrir un issue o contribuir
            directamente desde{' '}
            <a href="https://github.com/chrisq-dev/Cybersecurity-learning-roadmap" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
