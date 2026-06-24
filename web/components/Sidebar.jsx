'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar({ structure }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="serif-title" style={{ fontSize: '1.5rem', margin: 0, border: 'none' }}>
          <em style={{ color: 'var(--accent-primary)' }}>Ciberseguridad</em>
        </h2>
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Cerrar' : 'Menu'}
        </button>
      </div>

      <nav className={`sidebar-nav ${isOpen ? 'open' : ''}`}>
        {structure.map((section, index) => (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-dark)',
              marginBottom: '0.6rem'
            }}>
              {section.category}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {section.pages.map((page, pIdx) => {
                const slugString = page.slug.join('/');
                return (
                  <li key={pIdx} style={{ marginBottom: '0.3rem' }}>
                    <Link href={`/${slugString}`} className="sidebar-link">
                      {page.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
