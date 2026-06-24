'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cyber-roadmap-completed-lessons';
const STORAGE_EVENT = 'cyber-roadmap-progress-updated';

function readCompletedLessons() {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function subscribe(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener(STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function getSnapshot() {
  return JSON.stringify(readCompletedLessons());
}

function getServerSnapshot() {
  return '[]';
}

export default function ProgressOverview({ structure }) {
  const completedSnapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const completedLessons = JSON.parse(completedSnapshot);
  const completedSet = new Set(completedLessons);

  const categories = structure
    .map((category) => {
      const total = category.pages.length;
      const completed = category.pages.filter((page) => completedSet.has(page.slug.join('/'))).length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        category: category.category || 'General',
        firstHref: category.pages[0] ? `/${category.pages[0].slug.join('/')}` : '/',
        total,
        completed,
        percent,
      };
    })
    .filter((category) => category.total > 0)
    .slice(0, 8);

  const totalPages = structure.reduce((acc, category) => acc + category.pages.length, 0);
  const completedTotal = structure.reduce(
    (acc, category) => acc + category.pages.filter((page) => completedSet.has(page.slug.join('/'))).length,
    0
  );
  const overallPercent = totalPages > 0 ? Math.round((completedTotal / totalPages) * 100) : 0;

  return (
    <section style={{ textAlign: 'left', margin: '0 auto 4rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'end', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <h2 className="serif-title" style={{ fontSize: '2rem', borderBottom: 'none', marginBottom: '0.35rem' }}>
            Lecturas por categoria
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: 0 }}>
            Estos marcadores se guardan localmente en este navegador.
          </p>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          <strong style={{ color: 'var(--text-main)' }}>{completedTotal}</strong> / {totalPages} lecturas · {overallPercent}%
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
        {categories.map((category) => (
          <Link key={category.category} href={category.firstHref} className="book-card" style={{ padding: '1rem', textDecoration: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', marginBottom: '0.65rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>{category.category}</h3>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {category.completed}/{category.total}
              </span>
            </div>
            <div style={{ height: '8px', background: 'var(--bg-code)', borderRadius: '999px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <div style={{ width: `${category.percent}%`, height: '100%', background: 'var(--accent-success)' }} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
