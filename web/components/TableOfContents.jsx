'use client';

import { useMemo } from 'react';
import { createHeadingId } from '../lib/headings';

export default function TableOfContents({ content }) {
  const headings = useMemo(() => {
    const lines = content.split('\n');
    const extractedHeadings = [];
    const headingCounts = new Map();

    lines.forEach(line => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        extractedHeadings.push({ level, text, id: createHeadingId(text, headingCounts) });
      }
    });

    return extractedHeadings;
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="toc-container" style={{
      position: 'sticky',
      top: '2rem',
      maxHeight: 'calc(100vh - 4rem)',
      overflowY: 'auto',
      paddingLeft: '2rem',
      borderLeft: '1px solid var(--border-color)',
      minWidth: '250px'
    }}>
      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dark)', marginBottom: '1rem' }}>
        En esta página
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {headings.map((h, i) => (
          <li key={i} style={{ 
            marginBottom: '0.6rem',
            paddingLeft: h.level === 3 ? '1rem' : '0',
            fontSize: '0.9rem'
          }}>
            <a href={`#${h.id}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'}
               onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
