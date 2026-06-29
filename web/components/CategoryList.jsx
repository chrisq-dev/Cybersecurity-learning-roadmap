'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CategoryList({ structure }) {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('todos');
  const [contentType, setContentType] = useState('todos');
  const levels = [
    ['todos', 'Todos'],
    ['inicial', 'Introductorio'],
    ['intermedio', 'Intermedio'],
    ['avanzado', 'Avanzado'],
    ['referencia', 'Referencia'],
  ];
  const contentTypes = [
    ['todos', 'Todos los tipos'],
    ['guia', 'Guías'],
    ['ruta', 'Rutas'],
    ['playbook', 'Playbooks'],
    ['glosario', 'Glosarios'],
    ['recurso', 'Recursos'],
    ['articulo', 'Artículos'],
  ];

  // Helper to normalize strings (remove accents and convert to lowercase)
  const normalizeStr = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const normalizedQuery = normalizeStr(query);

  // Filter structure based on query
  const filteredStructure = structure
    .map((category) => {
      const categoryMatches = normalizeStr(category.category).includes(normalizedQuery);
      
      const filteredPages = category.pages.filter((page) => {
        const titleMatches = normalizeStr(page.title).includes(normalizedQuery);
        const contentMatches = normalizeStr(page.searchText).includes(normalizedQuery);
        const levelMatches = level === 'todos' || page.level === level;
        const typeMatches = contentType === 'todos' || page.contentType === contentType;
        // If the category itself matches, show all its pages. Otherwise, filter by title match.
        return levelMatches && typeMatches && (categoryMatches || titleMatches || contentMatches);
      });

      return {
        ...category,
        pages: filteredPages,
      };
    })
    .filter((category) => category.pages.length > 0);

  return (
    <div>
      {/* Search Input Container */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '2rem auto 4rem auto' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="search-pill"
          placeholder="Buscar por título, concepto o tema..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ paddingLeft: '3rem', margin: 0 }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', margin: '-2.5rem auto 4rem auto' }}>
        {levels.map(([value, label]) => {
          const active = level === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setLevel(value)}
              style={{
                border: '1px solid var(--border-color)',
                background: active ? 'var(--text-main)' : 'var(--bg-card)',
                color: active ? 'var(--bg-card)' : 'var(--text-muted)',
                borderRadius: '999px',
                padding: '0.5rem 0.85rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast)'
              }}
              aria-pressed={active}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="content-type-filter">
        <label htmlFor="content-type">Tipo de contenido</label>
        <select id="content-type" value={contentType} onChange={(event) => setContentType(event.target.value)}>
          {contentTypes.map(([value, label]) => (
            <option value={value} key={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Main Routes Grid */}
      <div style={{ textAlign: 'left', marginTop: '4rem' }}>
        <h2 className="serif-title" style={{ fontSize: '2rem', borderBottom: 'none', marginBottom: '1rem' }}>
          Todas las guías
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Recorre las áreas en orden o utiliza la búsqueda para encontrar un concepto, una herramienta o un tema específico.
        </p>

        {filteredStructure.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredStructure.map((category, idx) => (
              <div key={idx} style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dark)', marginBottom: '1rem' }}>
                  {category.category || 'General'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {category.pages.map((page, pIdx) => (
                    <Link href={`/${page.slug.join('/')}`} key={pIdx} className="book-card" style={{ padding: '1rem', textDecoration: 'none' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>{page.title}</h4>
                      <p style={{ margin: '0.35rem 0 0', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                        {page.level === 'inicial' ? 'introductorio' : page.level}
                        {page.contentType ? ` · ${page.contentType.replace('-', ' ')}` : ''}
                      </p>
                      {normalizedQuery && normalizeStr(page.searchText).includes(normalizedQuery) && !normalizeStr(page.title).includes(normalizedQuery) && (
                        <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.85rem', lineHeight: 1.45, color: 'var(--text-muted)' }}>
                          {page.excerpt}...
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius)', background: 'var(--bg-card)' }}>
            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              No se encontraron guías que coincidan con &ldquo;{query}&rdquo;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
