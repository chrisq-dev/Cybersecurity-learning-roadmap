import { getContentStructure } from '../lib/markdown';
import Link from 'next/link';
import { SiLinux, SiPython, SiGo, SiGnubash, SiCisco, SiOwasp, SiDocker, SiKubernetes, SiKalilinux } from 'react-icons/si';
import { FaNetworkWired, FaShieldAlt, FaSatelliteDish, FaWindows, FaAws } from 'react-icons/fa';

const techIcons = [
  { Icon: SiLinux, color: '#FCC624', title: 'Linux' },
  { Icon: SiKalilinux, color: '#557C94', title: 'Kali Linux' },
  { Icon: FaNetworkWired, color: '#888888', title: 'Redes' },
  { Icon: SiCisco, color: '#1BA0D7', title: 'Cisco' },
  { Icon: SiOwasp, color: 'var(--text-main)', title: 'OWASP' },
  { Icon: FaWindows, color: '#0078D6', title: 'Active Directory' },
  { Icon: FaSatelliteDish, color: '#2a9d8f', title: 'SIEM' },
  { Icon: FaShieldAlt, color: '#e9c46a', title: 'EDR' },
  { Icon: SiPython, color: '#3776AB', title: 'Python' },
  { Icon: SiGo, color: '#00ADD8', title: 'Go' },
  { Icon: SiGnubash, color: '#4EAA25', title: 'Bash' },
  { Icon: SiDocker, color: '#2496ED', title: 'Docker' },
  { Icon: SiKubernetes, color: '#326CE5', title: 'Kubernetes' },
  { Icon: FaAws, color: '#FF9900', title: 'AWS' },
];

const profileRoutes = [
  {
    title: 'Fundamentos',
    description: 'Base técnica para entender seguridad, redes, Linux, web y riesgo.',
    links: [
      ['Inicio Aquí', '/INICIO-AQUI'],
      ['Glosario de Ciberseguridad', '/glosario/GLOSARIO'],
      ['Computación Básica', '/fundamentos/COMPUTACION-BASICA'],
      ['Base de Seguridad', '/fundamentos/BASE-DE-SEGURIDAD'],
      ['Fundamentos de Redes', '/redes-cisco/FUNDAMENTOS-REDES'],
    ],
  },
  {
    title: 'Blue Team',
    description: 'Investigación, detección, SIEM, MITRE, hunting y respuesta.',
    links: [
      ['Fundamentos Blue Team', '/blue-team/FUNDAMENTOS-BLUE-TEAM'],
      ['SIEM y MITRE', '/blue-team/SIEM-MITRE'],
      ['Detection Engineering', '/blue-team/DETECTION-ENGINEERING'],
      ['Respuesta a Incidentes', '/blue-team/RESPUESTA-INCIDENTES'],
    ],
  },
  {
    title: 'AppSec',
    description: 'Seguridad web, APIs, OWASP, autenticación, autorización y revisiones.',
    links: [
      ['Fundamentos Web', '/web-owasp/FUNDAMENTOS-WEB'],
      ['OWASP Top 10', '/web-owasp/OWASP-TOP-10'],
      ['Fundamentos de API Security', '/api-security/FUNDAMENTOS-API'],
      ['Fundamentos de AppSec', '/appsec-devsecops/FUNDAMENTOS-APPSEC'],
    ],
  },
  {
    title: 'Cloud',
    description: 'Responsabilidad compartida, IAM, logging, storage y Kubernetes.',
    links: [
      ['Fundamentos Cloud', '/cloud-security/FUNDAMENTOS-CLOUD'],
      ['IAM Avanzado', '/cloud-security/IAM-AVANZADO'],
      ['IAM, Storage y Logging', '/cloud-security/IAM-STORAGE-LOGGING'],
      ['Kubernetes Seguridad', '/containers-kubernetes/KUBERNETES-SEGURIDAD'],
    ],
  },
  {
    title: 'GRC',
    description: 'Gobierno, riesgo, controles, evidencia, privacidad y continuidad.',
    links: [
      ['Fundamentos GRC', '/grc/FUNDAMENTOS-GRC'],
      ['Riesgo y Controles', '/grc/RIESGO-CONTROLES'],
      ['Fundamentos de Privacidad', '/privacy/FUNDAMENTOS-PRIVACIDAD'],
      ['Backups', '/business-continuity/BACKUPS'],
    ],
  },
  {
    title: 'Empleabilidad',
    description: 'Portafolio, entrevistas, mapa de habilidades y preparación laboral.',
    links: [
      ['Empleo Ready', '/empleabilidad/EMPLEO-READY'],
      ['Rutas por Rol', '/empleabilidad/RUTAS-POR-ROL'],
      ['Proyectos de Portafolio', '/empleabilidad/PROYECTOS-PORTAFOLIO'],
      ['CV y LinkedIn', '/empleabilidad/CV-LINKEDIN'],
    ],
  },
];

const learningOutcomes = [
  {
    title: 'Pensar en riesgo',
    text: 'Conectar activos, amenazas, vulnerabilidades, impacto y controles sin memorizar definiciones sueltas.',
  },
  {
    title: 'Entender sistemas reales',
    text: 'Leer redes, Linux, Windows, web, cloud e identidad como piezas de una misma superficie de ataque.',
  },
  {
    title: 'Investigar con criterio',
    text: 'Interpretar logs, alertas, evidencia, hipótesis y severidad sin confundir actividad rara con incidente confirmado.',
  },
  {
    title: 'Proteger aplicaciones',
    text: 'Reconocer fallas comunes como IDOR, XSS, SQL Injection, SSRF y errores de autenticación o autorización.',
  },
  {
    title: 'Comunicar seguridad',
    text: 'Explicar hallazgos, impacto, remediación y decisiones de forma clara para equipos técnicos y no técnicos.',
  },
  {
    title: 'Prepararte para roles junior',
    text: 'Ubicar rutas como SOC, AppSec, Cloud, GRC y Vulnerability Management sin intentar dominar todo al mismo tiempo.',
  },
];

export default function Home() {
  const structure = getContentStructure();
  const totalCategories = structure.length;
  const totalPages = structure.reduce((acc, cat) => acc + cat.pages.length, 0);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Ciberseguridad — Guías gratis en español",
    description: "Ruta estructurada para aprender ciberseguridad en español: fundamentos, redes, Linux, seguridad web, Blue Team, cloud y empleabilidad.",
    provider: {
      "@type": "Person",
      name: "Christian Quiñones",
      url: "https://cbsdev.lat"
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <h1 className="serif-title" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
        Guías <em>gratis</em> de <br/> ciberseguridad en español
      </h1>
      
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
        Una ruta organizada para estudiar ciberseguridad sin perderte entre tantos temas: fundamentos, redes, Linux, web, Blue Team, cloud, laboratorios y empleabilidad.
      </p>

      {/* Dynamic Statistics Banner */}
      <div className="home-stats">
        <div>
          <strong style={{ color: 'var(--text-main)' }}>{totalPages}</strong> guías ordenadas
        </div>
        <span className="stats-divider">|</span>
        <div>
          <strong style={{ color: 'var(--text-main)' }}>{totalCategories}</strong> módulos temáticos
        </div>
        <span className="stats-divider">|</span>
        <div>
          <span style={{ color: 'var(--accent-success)', fontWeight: 'bold' }}>100%</span> en español
        </div>
      </div>

      {/* Decorative tech icons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        {techIcons.map((tech, idx) => (
          <div key={idx} style={{ 
            color: tech.color, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform var(--transition-fast)',
            cursor: 'help'
          }} title={tech.title} className="tech-icon-hover">
            <tech.Icon size={36} />
          </div>
        ))}
      </div>

      <section style={{ textAlign: 'left', margin: '0 auto 4rem auto' }}>
        <h2 className="serif-title" style={{ fontSize: '2rem', borderBottom: 'none', marginBottom: '0.75rem' }}>
          Qué aprenderás
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '760px' }}>
          La meta no es memorizar herramientas. La meta es entender cómo fallan los sistemas, cómo se investigan incidentes y cómo se reducen riesgos.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {learningOutcomes.map((item) => (
            <div key={item.title} className="book-card" style={{ padding: '1.15rem', cursor: 'default' }}>
              <h3 style={{ margin: '0 0 0.45rem 0', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign: 'left', margin: '0 auto 4rem auto' }}>
        <h2 className="serif-title" style={{ fontSize: '2rem', borderBottom: 'none', marginBottom: '0.75rem' }}>
          Rutas por perfil
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Usa estas rutas como mapas de lectura según el enfoque que quieras explorar.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {profileRoutes.map((route) => (
            <div key={route.title} className="book-card" style={{ padding: '1.25rem', cursor: 'default' }}>
              <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                {route.title}
              </h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '1rem', lineHeight: 1.55 }}>
                {route.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {route.links.map(([label, href]) => (
                  <Link key={href} href={href} style={{ fontSize: '0.92rem', textDecoration: 'none', color: 'var(--text-muted)' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          textAlign: 'center',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius)',
          padding: '1.25rem',
          margin: '0 auto 1rem auto',
          maxWidth: '760px',
          boxShadow: '0 4px 12px var(--border-glow)'
        }}
      >
        <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-muted)' }}>
          Si esta guía te resulta útil, considera dejar una estrella en{' '}
          <a
            href="https://github.com/chrisq-dev/Cybersecurity-learning-roadmap"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          . Ayuda a que más personas puedan encontrarla.
        </p>
      </section>

    </div>
  );
}
