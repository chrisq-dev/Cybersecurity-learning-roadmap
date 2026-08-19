import { getContentStructure } from '../lib/markdown';
import Link from 'next/link';
import {
  SiLinux, SiPython, SiGnubash, SiCisco, SiOwasp, SiDocker, SiKubernetes, SiKalilinux,
} from 'react-icons/si';
import {
  FaNetworkWired, FaShieldAlt, FaSatelliteDish, FaWindows, FaAws, FaRobot, FaMobileAlt,
  FaUserSecret, FaMicrochip, FaArrowRight,
} from 'react-icons/fa';

/* ── Decorative tech icons ───────────────────────── */
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
  { Icon: SiGnubash, color: '#4EAA25', title: 'Bash' },
  { Icon: SiDocker, color: '#2496ED', title: 'Docker' },
  { Icon: SiKubernetes, color: '#326CE5', title: 'Kubernetes' },
  { Icon: FaAws, color: '#FF9900', title: 'AWS' },
  { Icon: FaRobot, color: '#10A37F', title: 'Inteligencia Artificial' },
  { Icon: FaMobileAlt, color: '#3DDC84', title: 'Seguridad Móvil' },
  { Icon: FaUserSecret, color: 'var(--text-main)', title: 'OSINT' },
  { Icon: FaMicrochip, color: '#E42117', title: 'Hardware Hacking / IoT' },
];

/* ── Visual roadmap steps ────────────────────────── */
const roadmapSteps = [
  { num: '01', label: 'Fundamentos', href: '/fundamentos/computacion-basica' },
  { num: '02', label: 'Redes & Linux', href: '/redes-cisco/fundamentos-redes' },
  { num: '03', label: 'Criptografía', href: '/cripto/fundamentos-criptografia' },
  { num: '04', label: 'Web & AppSec', href: '/web-owasp/fundamentos-web' },
  { num: '05', label: 'Blue Team', href: '/blue-team/fundamentos-blue-team' },
  { num: '06', label: 'Red Team', href: '/red-team/metodologia-etica' },
  { num: '07', label: 'Cloud & IA', href: '/cloud-security/fundamentos-cloud' },
  { num: '08', label: 'OSINT & CTI', href: '/osint-cti/fundamentos-osint' },
  { num: '09', label: 'Forense & Malware', href: '/forense/cadena-de-custodia' },
  { num: '10', label: 'IoT & Wireless', href: '/iot-ot-security/fundamentos-iot' },
  { num: '11', label: 'GRC & Riesgo', href: '/grc/fundamentos-grc' },
  { num: '12', label: 'Empleabilidad', href: '/empleabilidad/empleo-ready' },
];



/* ── Explore areas ───────────────────────────────── */
const exploreAreas = [
  {
    title: 'Seguridad personal',
    description: 'Antes de estudiar cómo se rompen los sistemas, aprende a proteger los tuyos.',
    links: [
      ['Protégete en internet', '/seguridad-personal/protegete-en-internet'],
      ['Cuentas y contraseñas', '/seguridad-personal/cuentas-y-contrasenas'],
      ['Privacidad diaria', '/seguridad-personal/privacidad-diaria'],
      ['Celular y dispositivos', '/seguridad-personal/celular-y-dispositivos'],
      ['Estafas con IA', '/seguridad-personal/estafas-con-ia'],
      ['¿Te hackearon?', '/seguridad-personal/si-te-hackearon'],
    ],
  },
  {
    title: 'Comenzar',
    description: 'Punto de partida y primeras bases, siguiendo el orden recomendado de estudio.',
    links: [
      ['Inicio Aquí', '/inicio-aqui'],
      ['Glosario de Ciberseguridad', '/glosario/glosario'],
      ['Computación Básica', '/fundamentos/computacion-basica'],
      ['Sistemas Operativos', '/fundamentos/sistemas-operativos'],
      ['Identidad y Permisos', '/fundamentos/identidad-permisos'],
      ['Base de Seguridad', '/fundamentos/base-de-seguridad'],
    ],
  },
  {
    title: 'Redes y sistemas',
    description: 'Redes, Linux, Windows, Active Directory y controles de infraestructura.',
    links: [
      ['Fundamentos de Redes', '/redes-cisco/fundamentos-redes'],
      ['Fundamentos de Linux', '/linux/fundamentos-linux'],
      ['Windows y Active Directory', '/windows-ad/fundamentos-windows-ad'],
      ['Firewalls, IDS e IPS', '/network-security/firewalls-ids-ips'],
    ],
  },
  {
    title: 'Criptografía',
    description: 'Cifrado, hashing, TLS, PKI y contraseñas. Base para entender la seguridad moderna.',
    links: [
      ['Fundamentos de Criptografía', '/cripto/fundamentos-criptografia'],
      ['Hashing y Contraseñas', '/cripto/hashing-y-passwords'],
      ['PKI y TLS', '/cripto/pki-y-tls'],
    ],
  },
  {
    title: 'Defensa y respuesta',
    description: 'Investigación, detección, SIEM, MITRE, hunting y respuesta.',
    links: [
      ['Fundamentos Blue Team', '/blue-team/fundamentos-blue-team'],
      ['SIEM y MITRE', '/blue-team/siem-mitre'],
      ['Fundamentos OSINT', '/osint-cti/fundamentos-osint'],
      ['Respuesta a Incidentes', '/blue-team/respuesta-incidentes'],
    ],
  },
  {
    title: 'Seguridad de aplicaciones',
    description: 'Web, APIs, OWASP, AppSec, autenticación y seguridad móvil.',
    links: [
      ['Fundamentos Web', '/web-owasp/fundamentos-web'],
      ['OWASP Top 10', '/web-owasp/owasp-top-10'],
      ['Fundamentos de AppSec', '/appsec-devsecops/fundamentos-appsec'],
      ['OWASP Mobile Top 10', '/mobile-security/owasp-mobile-top-10'],
    ],
  },
  {
    title: 'Cloud e infraestructura',
    description: 'Responsabilidad compartida, IAM, logging, Kubernetes y arquitectura.',
    links: [
      ['Fundamentos Cloud', '/cloud-security/fundamentos-cloud'],
      ['IAM, Storage y Logging', '/cloud-security/iam-storage-logging'],
      ['Kubernetes Seguridad', '/containers-kubernetes/kubernetes-seguridad'],
      ['Arquitectura de Seguridad', '/security-architecture/fundamentos-arquitectura'],
    ],
  },
  {
    title: 'IA, IoT y hardware',
    description: 'Seguridad en IA, dispositivos conectados, sistemas industriales y hardware.',
    links: [
      ['Fundamentos de IA', '/ai-security/fundamentos-ia'],
      ['OWASP Top 10 para LLMs', '/ai-security/owasp-top-10-llm'],
      ['Fundamentos IoT', '/iot-ot-security/fundamentos-iot'],
      ['SCADA y OT', '/iot-ot-security/scada-y-ot'],
      ['Hardware Hacking', '/iot-ot-security/hardware-hacking'],
    ],
  },
  {
    title: 'Riesgo y carrera',
    description: 'Gobierno, privacidad, continuidad y preparación para el entorno profesional.',
    links: [
      ['Fundamentos GRC', '/grc/fundamentos-grc'],
      ['Riesgo y Controles', '/grc/riesgo-controles'],
      ['Fundamentos de Privacidad', '/privacy/fundamentos-privacidad'],
      ['Empleo Ready', '/empleabilidad/empleo-ready'],
      ['Rutas por Rol', '/empleabilidad/rutas-por-rol'],
      ['CV y LinkedIn', '/empleabilidad/cv-linkedin'],
    ],
  },
  {
    title: 'Recursos y cultura',
    description: 'Orientación para estudiar, practicar y conectar la ciberseguridad con su cultura.',
    links: [
      ['Cómo Usar Esta Guía', '/recursos/como-usar-esta-guia'],
      ['Roadmap 90 Días', '/recursos/roadmap-90-dias'],
      ['Plataformas de Práctica', '/recursos/plataformas-de-practica'],
      ['Cursos y Certificaciones', '/recursos/cursos-y-certificaciones'],
      ['Inspiración: Mr. Robot', '/cultura-geek/inspiracion-mr-robot'],
      ['Cultura Tech y Ciberseguridad', '/cultura-geek/cultura-tech-y-ciberseguridad'],
    ],
  },
];

export default function Home() {
  const structure = getContentStructure();
  const totalCategories = structure.length;
  const totalPages = structure.reduce((acc, cat) => acc + cat.pages.length, 0);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mapa abierto de ciberseguridad en español",
    description: "Colección abierta de explicaciones y recursos de ciberseguridad organizados por área de conocimiento.",
    url: "https://cbsdev.lat",
    inLanguage: "es",
    numberOfItems: totalPages,
    author: {
      "@type": "Person",
      name: "Christian Quiñones",
      url: "https://cbsdev.lat"
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* ── Hero ──────────────────────────────────── */}
      <section style={{ textAlign: 'center', paddingTop: '3.5rem', paddingBottom: '1rem' }}>
        <h1 className="serif-title" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1.08, marginBottom: '1rem' }}>
          Un mapa abierto de <br /><em>ciberseguridad</em> en español
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto 2rem auto', lineHeight: 1.7 }}>
          Una colección organizada de explicaciones y recursos para consultar fundamentos, conectar conceptos y explorar la ciberseguridad sin perderte.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <Link href="/inicio-aqui" className="cta-btn-primary">
            Comenzar desde cero <FaArrowRight size={13} />
          </Link>
          <Link href="/rutas" className="cta-btn-secondary">
            Ver rutas temáticas
          </Link>
        </div>

        {/* Stats pill */}
        <div className="home-stats" style={{ marginBottom: '3.5rem' }}>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>{totalPages}</strong> temas documentados
          </div>
          <span className="stats-divider">|</span>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>{totalCategories}</strong> áreas conectadas
          </div>
          <span className="stats-divider">|</span>
          <div>100% en español</div>
        </div>
      </section>

      {/* ── Decorative tech icons ─────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        {techIcons.map((tech, idx) => (
          <div
            key={idx}
            style={{
              color: tech.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'help',
            }}
            title={tech.title}
            className="tech-icon-hover"
          >
            <tech.Icon size={34} />
          </div>
        ))}
      </div>

      {/* ── Visual Roadmap Strip ──────────────────── */}
      <section style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dark)', marginBottom: '1.25rem' }}>
          Ruta de estudio recomendada
        </p>
        <div className="roadmap-strip">
          {roadmapSteps.map((step, idx) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={step.href} className="roadmap-step" style={{ textDecoration: 'none' }}>
                <span className="roadmap-step-num">{step.num}</span>
                <span className="roadmap-step-label">{step.label}</span>
              </Link>
              {idx < roadmapSteps.length - 1 && (
                <span className="roadmap-arrow">→</span>
              )}
            </div>
          ))}
        </div>
      </section>



      {/* ── Explore the Map ───────────────────────── */}
      <section style={{ textAlign: 'left', margin: '0 auto 4rem auto' }}>
        <h2 className="serif-title" style={{ fontSize: '2rem', borderBottom: 'none', marginBottom: '0.75rem' }}>
          Explorar el mapa
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '820px' }}>
          Empieza por Inicio Aquí y sigue los fundamentos. Después puedes seguir una{' '}
          <Link href="/rutas">ruta temática</Link>.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {exploreAreas.map((area) => (
            <div key={area.title} className="book-card route-card" style={{ padding: '1.25rem' }}>
              <Link
                href={area.links[0][1]}
                className="route-card-overlay"
                aria-label={`Abrir ${area.title}`}
              />
              <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                {area.title}
              </h3>
              <p style={{ fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                {area.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {area.links.map(([label, href]) => (
                  <Link key={href} href={href} className="route-card-link" style={{ fontSize: '0.88rem', textDecoration: 'none', color: 'var(--text-muted)' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Source Note ──────────────────────── */}
      <section
        className="open-source-note"
        style={{
          textAlign: 'left',
          borderTop: '1px solid var(--border-color)',
          padding: '1.75rem 0 0 0',
          margin: '0 auto 1rem auto',
          maxWidth: '920px',
          display: 'grid',
          gridTemplateColumns: 'minmax(180px, 0.55fr) minmax(280px, 1.45fr)',
          gap: '1.25rem',
          alignItems: 'start',
        }}
      >
        <h2 className="serif-title" style={{ fontSize: '1.45rem', borderBottom: 'none', margin: 0 }}>
          Proyecto abierto
        </h2>
        <div>
          <p style={{ margin: '0 0 0.65rem 0', fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
            Esta guía está en construcción constante. La idea es seguir agregando recursos, mejorando explicaciones y corrigiendo contenido conforme estudio, contrasto fuentes oficiales y recibo feedback de la comunidad.
          </p>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
            Si encuentras un error o una explicación confusa, puedes abrir un issue o contribuir directamente desde{' '}
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
