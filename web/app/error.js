'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Cuando el cliente tiene caché de un deploy viejo, Next.js lanza este error.
    // La solución es recargar la página para que obtenga el nuevo bundle.
    if (error?.message?.includes('Server Action')) {
      window.location.reload()
    }
  }, [error])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: '1rem',
      fontFamily: 'inherit',
    }}>
      <p style={{ color: 'var(--color-text-secondary, #888)' }}>
        Algo salió mal. Intenta de nuevo.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '0.5rem 1.25rem',
          borderRadius: '6px',
          border: '1px solid var(--color-border, #333)',
          background: 'transparent',
          cursor: 'pointer',
          color: 'inherit',
        }}
      >
        Reintentar
      </button>
    </div>
  )
}
