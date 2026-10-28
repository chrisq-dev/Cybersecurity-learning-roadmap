'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaTimes } from 'react-icons/fa';

const LEVELS = [
  ['', 'Todos'],
  ['inicial', 'Introductorio'],
  ['intermedio', 'Intermedio'],
  ['avanzado', 'Avanzado'],
  ['referencia', 'Referencia'],
];

const TYPES = [
  ['', 'Todos los tipos'],
  ['guia', 'Guías'],
  ['ruta', 'Rutas'],
  ['playbook', 'Playbooks'],
  ['glosario', 'Glosarios'],
  ['recurso', 'Recursos'],
  ['articulo', 'Artículos'],
];

const TYPE_LABELS = {
  articulo: 'Artículo',
  glosario: 'Glosario',
  guia: 'Guía',
  playbook: 'Playbook',
  recurso: 'Recurso',
  ruta: 'Ruta temática',
};

function levelLabel(level) {
  return LEVELS.find(([value]) => value === level)?.[1] || level;
}

function typeLabel(type) {
  return TYPE_LABELS[type] || type;
}

function GuideCard({ page }) {
  return (
    <Link href={`/${page.slug}`} className="guide-card">
      <span className="guide-card-meta">
        {levelLabel(page.level)} · {typeLabel(page.contentType)}
      </span>
      <h3>{page.title}</h3>
      {page.excerpt && <p>{page.excerpt}</p>}
    </Link>
  );
}

export default function GuideExplorer({ pages, areas, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [level, setLevel] = useState('');
  const [type, setType] = useState('');
  const [area, setArea] = useState('');
  const [remote, setRemote] = useState(null);
  const [error, setError] = useState(null);
  const trimmedQuery = query.trim();

  useEffect(() => {
    if (!trimmedQuery) return undefined;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const params = new URLSearchParams({ q: trimmedQuery, limit: '100' });
      if (level) params.set('level', level);
      if (type) params.set('type', type);
      if (area) params.set('area', area);

      try {
        const response = await fetch(`/api/search?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('La búsqueda no está disponible.');
        const data = await response.json();
        setRemote(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError({
            query: trimmedQuery,
            message: 'No se pudo completar la búsqueda. Intenta de nuevo.',
          });
          setRemote({ query: trimmedQuery, total: 0, results: [] });
        }
      }
    }, 220);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmedQuery, level, type, area]);

  const filteredPages = useMemo(
    () =>
      pages.filter(
        (page) =>
          (!level || page.level === level) &&
          (!type || page.contentType === type) &&
          (!area || page.areaId === area)
      ),
    [pages, level, type, area]
  );

  const groupedAreas = useMemo(() => {
    return areas
      .map((currentArea) => {
        const areaPages = filteredPages.filter((page) => page.areaId === currentArea.id);
        if (areaPages.length === 0) return null;

        const categories = [];
        for (const page of areaPages) {
          const previous = categories[categories.length - 1];
          if (previous?.name === page.category) previous.pages.push(page);
          else categories.push({ name: page.category, pages: [page] });
        }

        return { ...currentArea, categories, count: areaPages.length };
      })
      .filter(Boolean);
  }, [areas, filteredPages]);

  const activeRemote = trimmedQuery && remote?.query === trimmedQuery ? remote : null;
  const activeError = error?.query === trimmedQuery ? error.message : '';
  const pending = Boolean(trimmedQuery) && !activeRemote && !activeError;
  const results = activeRemote?.results || [];
  const total = trimmedQuery ? activeRemote?.total ?? 0 : filteredPages.length;
  const showInitialGroups = !trimmedQuery && groupedAreas.length > 0;
  const showNoResults = !pending && !activeError && (trimmedQuery ? activeRemote !== null && results.length === 0 : groupedAreas.length === 0);

  return (
    <div className="guide-explorer">
      <form className="guide-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <FaSearch className="guide-search-icon" aria-hidden="true" size={18} />
        <label className="sr-only" htmlFor="guide-search-input">
          Buscar guías por título, tema o concepto
        </label>
        <input
          id="guide-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Busca una guía"
          autoComplete="off"
          maxLength={100}
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
            <FaTimes aria-hidden="true" size={14} />
          </button>
        )}
      </form>

      <div className="guide-filters">
        <div className="filter-pills" role="group" aria-label="Filtrar por nivel">
          {LEVELS.map(([value, label]) => (
            <button
              key={value || 'todos'}
              type="button"
              className="filter-pill"
              aria-pressed={level === value}
              onClick={() => setLevel(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="guide-select">
          <span>Tipo</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            {TYPES.map(([value, label]) => (
              <option key={value || 'todos'} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <label className="guide-select">
          <span>Área</span>
          <select value={area} onChange={(event) => setArea(event.target.value)}>
            <option value="">Todas las áreas</option>
            {areas.map((currentArea) => (
              <option key={currentArea.id} value={currentArea.id}>{currentArea.title}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="guide-result-count" aria-live="polite" aria-busy={pending}>
        {pending
          ? 'Buscando...'
          : trimmedQuery
            ? `${total} ${total === 1 ? 'resultado' : 'resultados'} para “${trimmedQuery}”`
            : `${total} ${total === 1 ? 'guía' : 'guías'} disponibles`}
      </p>

      {activeError && <p className="guide-error" role="alert">{activeError}</p>}

      {showInitialGroups &&
        groupedAreas.map((currentArea) => (
          <section className="guide-area" key={currentArea.id} aria-labelledby={`area-${currentArea.id}`}>
            <div className="guide-area-header">
              <div>
                <p className="section-kicker">{currentArea.count} {currentArea.count === 1 ? 'guía' : 'guías'}</p>
                <h2 id={`area-${currentArea.id}`}>{currentArea.title}</h2>
              </div>
              <p>{currentArea.description}</p>
            </div>

            {currentArea.categories.map((category) => {
              const showCategoryTitle =
                category.name.trim().toLowerCase() !== currentArea.title.trim().toLowerCase();

              return (
                <div className="guide-category" key={`${currentArea.id}-${category.name}`}>
                  {showCategoryTitle && <h3>{category.name}</h3>}
                  <div className="guide-grid">
                    {category.pages.map((page) => (
                      <GuideCard page={page} key={page.slug} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        ))}

      {trimmedQuery && results.length > 0 && (
        <div className="guide-results" aria-label="Resultados de búsqueda">
          <div className="guide-grid">
            {results.map((page) => (
              <GuideCard page={page} key={page.slug} />
            ))}
          </div>
        </div>
      )}

      {showNoResults && (
        <div className="guide-empty">
          <p>No encontramos guías con esos filtros.</p>
          <button
            type="button"
            className="cta-btn-secondary"
            onClick={() => {
              setQuery('');
              setLevel('');
              setType('');
              setArea('');
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
