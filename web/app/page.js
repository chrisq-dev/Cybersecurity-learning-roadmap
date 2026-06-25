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
      ['Inicio Aquí', '/inicio-aqui'],
      ['Glosario de Ciberseguridad', '/glosario/glosario'],
      ['Computación Básica', '/fundamentos/computacion-basica'],
      ['Base de Seguridad', '/fundamentos/base-de-seguridad'],
      ['Fundamentos de Redes', '/redes-cisco/fundamentos-redes'],
    ],
  },
  {
    title: 'Blue Team',
    description: 'Investigación, detección, SIEM, MITRE, hunting y respuesta.',
    links: [
      ['Fundamentos Blue Team', '/blue-team/fundamentos-blue-team'],
      ['SIEM y MITRE', '/blue-team/siem-mitre'],
      ['Detection Engineering', '/blue-team/detection-engineering'],
      ['Respuesta a Incidentes', '/blue-team/respuesta-incidentes'],
    ],
  },
  {
    title: 'AppSec',
    description: 'Seguridad web, APIs, OWASP, autenticación, autorización y revisiones.',
    links: [
      ['Fundamentos Web', '/web-owasp/fundamentos-web'],
      ['OWASP Top 10', '/web-owasp/owasp-top-10'],
      ['Fundamentos de API Security', '/api-security/fundamentos-api'],
      ['Fundamentos de AppSec', '/appsec-devsecops/fundamentos-appsec'],
    ],
  },
  {
    title: 'Cloud',
    description: 'Responsabilidad compartida, IAM, logging, storage y Kubernetes.',
    links: [
      ['Fundamentos Cloud', '/cloud-security/fundamentos-cloud'],
      ['IAM Avanzado', '/cloud-security/iam-avanzado'],
      ['IAM, Storage y Logging', '/cloud-security/iam-storage-logging'],
      ['Kubernetes Seguridad', '/containers-kubernetes/kubernetes-seguridad'],
    ],
  },
  {
    title: 'GRC',
    description: 'Gobierno, riesgo, controles, evidencia, privacidad y continuidad.',
    links: [
      ['Fundamentos GRC', '/grc/fundamentos-grc'],
      ['Riesgo y Controles', '/grc/riesgo-controles'],
      ['Fundamentos de Privacidad', '/privacy/fundamentos-privacidad'],
      ['Backups', '/business-continuity/backups'],
    ],
  },
  {
    title: 'Empleabilidad',
    description: 'Portafolio, entrevistas, mapa de habilidades y preparación laboral.',
    links: [
      ['Empleo Ready', '/empleabilidad/empleo-ready'],
      ['Rutas por Rol', '/empleabilidad/rutas-por-rol'],
      ['Proyectos de Portafolio', '/empleabilidad/proyectos-portafolio'],
      ['CV y LinkedIn', '/empleabilidad/cv-linkedin'],
    ],
  },
  {
    title: 'Recursos y cultura',
    description: 'Cómo estudiar, roadmap inicial, práctica, glosario, certificaciones y cultura hacker.',
    links: [
      ['Cómo Usar Esta Guía', '/recursos/como-usar-esta-guia'],
      ['Roadmap 90 Días', '/recursos/roadmap-90-dias'],
      ['Plataformas de Práctica', '/recursos/plataformas-de-practica'],
      ['Glosario Cultura Hacker', '/recursos/glosario-cultura-hacker'],
      ['Cursos y Certificaciones', '/recursos/cursos-y-certificaciones'],
    ],
  },
];

const studyAreas = [
  {
    title: 'Fundamentos',
    text: 'Computación, sistemas operativos, redes, Linux, Windows, permisos y conceptos base de seguridad.',
  },
  {
    title: 'Seguridad web y AppSec',
    text: 'HTTP, OWASP Top 10, APIs, autenticación, autorización, validación y revisiones de seguridad.',
  },
  {
    title: 'Defensa y respuesta',
    text: 'Logs, alertas, SIEM, MITRE ATT&CK, hunting, playbooks e investigación de incidentes.',
  },
  {
    title: 'Cloud y arquitectura',
    text: 'IAM, storage, logging, contenedores, Kubernetes, Zero Trust y controles de arquitectura.',
  },
  {
    title: 'Riesgo y empleabilidad',
    text: 'GRC, privacidad, continuidad, rutas por rol, portafolio, entrevistas, CV y LinkedIn.',
  },
  {
    title: 'Cultura y recursos',
    text: 'Glosario hacker, plataformas de práctica, certificaciones, Mr. Robot, open source y referencias geek.',
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

      <section style={{ textAlign: 'left', margin: '0 auto 2.5rem auto' }}>
        <h2 className="serif-title" style={{ fontSize: '2rem', borderBottom: 'none', marginBottom: '0.75rem' }}>
          Qué puedes estudiar aquí
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '760px' }}>
          La meta no es memorizar herramientas ni dominar todo al mismo tiempo. Usa esta guía como un mapa para ubicar temas, conectar conceptos y elegir una ruta principal.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {studyAreas.map((area) => (
            <div key={area.title} className="book-card" style={{ padding: '1.15rem', cursor: 'default' }}>
              <h3 style={{ margin: '0 0 0.45rem 0', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                {area.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                {area.text}
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
            <div key={route.title} className="book-card route-card" style={{ padding: '1.25rem' }}>
              <Link
                href={route.links[0][1]}
                className="route-card-overlay"
                aria-label={`Abrir ${route.title}`}
              />
              <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                {route.title}
              </h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '1rem', lineHeight: 1.55 }}>
                {route.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {route.links.map(([label, href]) => (
                  <Link key={href} href={href} className="route-card-link" style={{ fontSize: '0.92rem', textDecoration: 'none', color: 'var(--text-muted)' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="open-source-note"
        style={{
          textAlign: 'left',
          borderTop: '1px solid var(--border-color)',
          padding: '1.5rem 0 0 0',
          margin: '0 auto 1rem auto',
          maxWidth: '920px',
          display: 'grid',
          gridTemplateColumns: 'minmax(180px, 0.55fr) minmax(280px, 1.45fr)',
          gap: '1.25rem',
          alignItems: 'start'
        }}
      >
        <h2 className="serif-title" style={{ fontSize: '1.45rem', borderBottom: 'none', margin: 0 }}>
          Proyecto abierto
        </h2>
        <div>
          <p style={{ margin: '0 0 0.65rem 0', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
            Esta guía está en construcción. La idea es seguir agregando recursos, mejorando explicaciones y corrigiendo contenido conforme estudio, pruebo laboratorios y recibo feedback.
          </p>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
            Si encuentras un error o una explicación confusa, puedes abrir un issue o contribuir desde{' '}
            <a
              href="https://github.com/chrisq-dev/Cybersecurity-learning-roadmap"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>

    </div>
  );
}
