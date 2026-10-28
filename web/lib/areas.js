export const AREAS = [
  {
    id: 'personal',
    title: 'Seguridad personal',
    description: 'Protege tus cuentas, dispositivos y familia antes de estudiar cómo se rompen los sistemas.',
    folders: ['seguridad-personal'],
    featured: [
      'seguridad-personal/protegete-en-internet',
      'seguridad-personal/cuentas-y-contrasenas',
      'seguridad-personal/privacidad-diaria',
      'seguridad-personal/celular-y-dispositivos',
      'seguridad-personal/estafas-con-ia',
      'seguridad-personal/si-te-hackearon',
      'seguridad-personal/familia-y-usuarios-no-tecnicos',
    ],
  },
  {
    id: 'comenzar',
    title: 'Comenzar',
    description: 'Punto de partida, vocabulario y primeras bases para estudiar sin saltarte lo esencial.',
    folders: ['', 'glosario', 'fundamentos', 'programacion'],
    featured: [
      'inicio-aqui',
      'glosario/glosario',
      'fundamentos/computacion-basica',
      'fundamentos/sistemas-operativos',
      'fundamentos/identidad-permisos',
      'fundamentos/base-de-seguridad',
    ],
  },
  {
    id: 'redes',
    title: 'Redes y sistemas',
    description: 'Redes, Linux, Windows, Active Directory y controles de infraestructura.',
    folders: ['redes-cisco', 'linux', 'windows-ad', 'network-security'],
    featured: [
      'redes-cisco/fundamentos-redes',
      'linux/fundamentos-linux',
      'windows-ad/fundamentos-windows-ad',
      'network-security/firewalls-ids-ips',
    ],
  },
  {
    id: 'cripto',
    title: 'Criptografía',
    description: 'Cifrado, hashing, TLS, PKI y contraseñas: la base de la seguridad moderna.',
    folders: ['cripto'],
    featured: [
      'cripto/fundamentos-criptografia',
      'cripto/hashing-y-passwords',
      'cripto/pki-y-tls',
    ],
  },
  {
    id: 'defensa',
    title: 'Defensa, ofensiva y respuesta',
    description: 'Detección, SIEM, threat hunting, respuesta, red team ético y análisis forense.',
    folders: [
      'blue-team',
      'osint-cti',
      'security-teams',
      'playbooks',
      'red-team',
      'forense',
      'malware-basico',
      'social-engineering',
    ],
    featured: [
      'blue-team/fundamentos-blue-team',
      'blue-team/siem-mitre',
      'blue-team/respuesta-incidentes',
      'red-team/metodologia-etica',
      'forense/cadena-de-custodia',
      'playbooks/phishing',
    ],
  },
  {
    id: 'aplicaciones',
    title: 'Aplicaciones y datos',
    description: 'Web, APIs, OWASP, AppSec, móvil, vulnerabilidades y seguridad de bases de datos.',
    folders: [
      'web-owasp',
      'api-security',
      'appsec-devsecops',
      'mobile-security',
      'vulnerability-management',
      'database-security',
    ],
    featured: [
      'web-owasp/fundamentos-web',
      'web-owasp/owasp-top-10',
      'appsec-devsecops/fundamentos-appsec',
      'mobile-security/owasp-mobile-top-10',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud e infraestructura',
    description: 'Responsabilidad compartida, IAM, logging, Kubernetes y arquitectura.',
    folders: ['cloud-security', 'containers-kubernetes', 'security-architecture', 'identity-access'],
    featured: [
      'cloud-security/fundamentos-cloud',
      'cloud-security/iam-storage-logging',
      'containers-kubernetes/kubernetes-seguridad',
      'security-architecture/fundamentos-arquitectura',
    ],
  },
  {
    id: 'ia-iot',
    title: 'IA, IoT y hardware',
    description: 'Seguridad en IA, dispositivos conectados, sistemas industriales y hardware.',
    folders: ['ai-security', 'iot-ot-security', 'wireless-security', 'endpoint-security', 'email-security'],
    featured: [
      'ai-security/fundamentos-ia',
      'ai-security/owasp-top-10-llm',
      'iot-ot-security/fundamentos-iot',
      'iot-ot-security/scada-y-ot',
      'iot-ot-security/hardware-hacking',
    ],
  },
  {
    id: 'riesgo',
    title: 'Riesgo y carrera',
    description: 'Gobierno, privacidad, continuidad y preparación para el entorno profesional.',
    folders: ['grc', 'privacy', 'business-continuity', 'empleabilidad'],
    featured: [
      'grc/fundamentos-grc',
      'grc/riesgo-controles',
      'privacy/fundamentos-privacidad',
      'empleabilidad/empleo-ready',
      'empleabilidad/rutas-por-rol',
      'empleabilidad/cv-linkedin',
    ],
  },
  {
    id: 'recursos',
    title: 'Recursos y cultura',
    description: 'Orientación para estudiar, practicar y conectar la ciberseguridad con su cultura.',
    folders: ['recursos', 'cultura-geek'],
    featured: [
      'recursos/como-usar-esta-guia',
      'recursos/roadmap-90-dias',
      'recursos/plataformas-de-practica',
      'recursos/cursos-y-certificaciones',
      'cultura-geek/inspiracion-mr-robot',
      'cultura-geek/cultura-tech-y-ciberseguridad',
    ],
  },
];

const AREA_BY_FOLDER = new Map(
  AREAS.flatMap((area) => area.folders.map((folder) => [folder, area]))
);
const DEFAULT_AREA = AREAS.find((area) => area.id === 'comenzar') || AREAS[0];

export function getAreaForFolder(folder) {
  return AREA_BY_FOLDER.get(folder) || DEFAULT_AREA;
}

export function getAreaById(id) {
  return AREAS.find((area) => area.id === id) || null;
}
