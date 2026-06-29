'use client';

import Link from 'next/link';
import { FaMoon, FaSun, FaRoute } from 'react-icons/fa';

export default function TopNav() {
  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('theme', nextTheme);
  }

  const pillStyle = {
    color: 'var(--text-main)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)',
    border: '1px solid var(--border-color)',
    borderRadius: '999px',
    padding: '0.45rem 0.75rem',
    background: 'var(--bg-card)',
    boxShadow: '0 3px 10px var(--border-glow)',
    cursor: 'pointer',
    fontFamily: 'inherit',
  };

  return (
    <nav className="top-nav">
      <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.7rem' }}>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
        <span className="serif-title" style={{ fontSize: '1.4rem' }}>cbsdev.lat</span>
      </Link>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Link href="/rutas" className="nav-hover" style={pillStyle}>
          <FaRoute size={14} />
          <span className="hide-on-mobile">Rutas</span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          className="nav-hover theme-toggle"
          aria-label="Cambiar modo de color"
          title="Cambiar modo de color"
          style={pillStyle}
        >
          <FaMoon className="theme-icon theme-icon-moon" size={14} />
          <FaSun className="theme-icon theme-icon-sun" size={14} />
          <span className="hide-on-mobile theme-label-light">Oscuro</span>
          <span className="hide-on-mobile theme-label-dark">Claro</span>
        </button>

        <a
          href="https://github.com/chrisq-dev"
          target="_blank"
          rel="noopener noreferrer"
          title="Perfil de GitHub de Christian"
          aria-label="Perfil de GitHub de Christian"
          className="nav-hover github-profile-link"
          style={pillStyle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3"></path>
            <path d="M15 21v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
          </svg>
          <span className="hide-on-mobile">Christian</span>
        </a>
      </div>
    </nav>
  );
}
