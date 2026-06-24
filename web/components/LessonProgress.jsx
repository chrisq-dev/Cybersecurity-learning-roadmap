'use client';

import { useSyncExternalStore } from 'react';

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

export default function LessonProgress({ slug }) {
  const completedSnapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const completedLessons = JSON.parse(completedSnapshot);
  const completed = completedLessons.includes(slug);

  function toggleCompleted() {
    const currentLessons = readCompletedLessons();
    const nextCompleted = currentLessons.includes(slug)
      ? currentLessons.filter((item) => item !== slug)
      : [...currentLessons, slug];

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCompleted));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleCompleted}
      className="lesson-progress-button"
      aria-pressed={completed}
      aria-label={completed ? 'Quitar lectura guardada' : 'Guardar lectura'}
      style={{
        border: '1px solid var(--border-color)',
        background: completed ? 'rgba(0, 255, 65, 0.08)' : 'var(--bg-card)',
        color: completed ? 'var(--accent-success)' : 'var(--text-muted)',
        borderRadius: '999px',
        padding: '0.55rem 0.9rem',
        fontSize: '0.9rem',
        cursor: 'pointer',
        marginTop: '1rem',
      }}
    >
      {completed ? 'Lectura guardada' : 'Guardar lectura'}
    </button>
  );
}
