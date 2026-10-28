import fs from 'fs';
import path from 'path';
import { parseFrontmatter } from './frontmatter.mjs';

const ROOT_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), '..');

// List of folders we want to ignore (system or non-content folders)
const IGNORE_FOLDERS = [
  'web',
  'node_modules',
  '.git',
  '.next',
  '.gemini',
  'public',
  'assets',
  'notes',
  'resources',
  'roadmap',
];

const PUBLIC_ROOT_FILES = [
  'INICIO-AQUI.md',
];

const INTERNAL_ROOT_FILES = [
  'CONTRIBUTING.md',
  'DEPLOY-EASYPANEL.md',
  'LICENSE',
  'README.md',
  'SECURITY.md',
];

export const PAGE_ORDER = {
  '': ['INICIO-AQUI'],
  'seguridad-personal': [
    'PROTEGETE-EN-INTERNET',
    'CUENTAS-Y-CONTRASENAS',
    'PRIVACIDAD-DIARIA',
    'CELULAR-Y-DISPOSITIVOS',
    'ESTAFAS-CON-IA',
    'SI-TE-HACKEARON',
    'FAMILIA-Y-USUARIOS-NO-TECNICOS',
  ],
  glosario: ['GLOSARIO'],
  fundamentos: ['COMPUTACION-BASICA', 'SISTEMAS-OPERATIVOS', 'IDENTIDAD-PERMISOS', 'BASE-DE-SEGURIDAD'],
  'redes-cisco': ['FUNDAMENTOS-REDES', 'MODELO-OSI-TCPIP', 'IP-SUBNETTING', 'DNS-DHCP-NAT', 'SWITCHING-VLANS-ACLS'],
  linux: ['FUNDAMENTOS-LINUX', 'COMANDOS-BASICOS', 'PERMISOS-USUARIOS', 'PROCESOS-SERVICIOS-LOGS', 'HARDENING-BASICO'],
  'windows-ad': ['FUNDAMENTOS-WINDOWS-AD', 'WINDOWS-BASICO', 'POWERSHELL-EVENTOS', 'ACTIVE-DIRECTORY'],
  programacion: ['FUNDAMENTOS-PYTHON-SEGURIDAD', 'PYTHON-BASICO', 'LOGS-JSON-CSV-APIS'],
  'web-owasp': ['FUNDAMENTOS-WEB', 'HTTP', 'AUTENTICACION-AUTORIZACION', 'OWASP-TOP-10', 'SQL-INJECTION', 'XSS', 'CSRF', 'SSRF', 'FILE-UPLOAD'],
  'blue-team': ['FUNDAMENTOS-BLUE-TEAM', 'LOGS-Y-ALERTAS', 'SIEM-MITRE', 'SIGMA-YARA', 'DETECTION-ENGINEERING', 'THREAT-HUNTING', 'RESPUESTA-INCIDENTES'],
  'security-teams': ['TEAMS-Y-HATS'],
  'cloud-security': ['FUNDAMENTOS-CLOUD', 'IAM-STORAGE-LOGGING', 'IAM-AVANZADO', 'AWS-AZURE-GCP'],
  'iot-ot-security': ['FUNDAMENTOS-IOT', 'SCADA-Y-OT', 'HARDWARE-HACKING'],
  'osint-cti': ['FUNDAMENTOS-OSINT', 'THREAT-INTELLIGENCE', 'HERRAMIENTAS-Y-PRIVACIDAD'],
  'mobile-security': ['FUNDAMENTOS-MOBILE', 'REVERSE-ENGINEERING', 'OWASP-MOBILE-TOP-10'],
  'ai-security': ['FUNDAMENTOS-IA', 'OWASP-TOP-10-LLM', 'IA-EN-DEFENSA'],
  'api-security': ['FUNDAMENTOS-API', 'RIESGOS-CONTROLES'],
  'appsec-devsecops': ['FUNDAMENTOS-APPSEC', 'DEVSECOPS'],
  'vulnerability-management': ['FUNDAMENTOS', 'PRIORIZACION-Y-CVSS'],
  'network-security': ['FIREWALLS-IDS-IPS', 'VPN-PROXY-SEGMENTACION'],
  'endpoint-security': ['EDR-ANTIVIRUS-HARDENING', 'TELEMETRIA-ENDPOINT'],
  'database-security': ['FUNDAMENTOS-DB', 'PERMISOS-AUDITORIA'],
  'wireless-security': ['FUNDAMENTOS-WIFI'],
  'identity-access': ['IAM-CORPORATIVO', 'PAM'],
  'containers-kubernetes': ['CONTENEDORES', 'KUBERNETES-SEGURIDAD'],
  'security-architecture': ['FUNDAMENTOS-ARQUITECTURA', 'ZERO-TRUST'],
  grc: ['FUNDAMENTOS-GRC', 'RIESGO-CONTROLES'],
  privacy: ['FUNDAMENTOS-PRIVACIDAD'],
  'email-security': ['FUNDAMENTOS-EMAIL', 'GATEWAYS-Y-FILTROS'],
  'social-engineering': ['FUNDAMENTOS-PHISHING', 'PRETEXTING-OSINT'],
  'business-continuity': ['BACKUPS', 'CONTINUIDAD-DRP'],
  cripto: ['FUNDAMENTOS-CRIPTOGRAFIA', 'HASHING-Y-PASSWORDS', 'PKI-Y-TLS'],
  forense: ['CADENA-DE-CUSTODIA', 'FORENSE-DE-DISCO', 'FORENSE-DE-MEMORIA'],
  'malware-basico': ['TIPOS-DE-MALWARE', 'RANSOMWARE', 'BOTNETS-Y-C2'],
  'red-team': ['METODOLOGIA-ETICA', 'RECONOCIMIENTO-ENUMERACION', 'REPORTE-REMEDIACION'],
  playbooks: ['CUENTA-COMPROMETIDA', 'PHISHING', 'SERVIDOR-EXPUESTO', 'MALWARE-ENDPOINT', 'FUGA-DATOS'],
  empleabilidad: ['RUTA-TRABAJO', 'RUTAS-POR-ROL', 'EMPLEO-READY', 'PROYECTOS-PORTAFOLIO', 'MAPA-DE-SKILLS', 'CV-LINKEDIN', 'ENTREVISTAS', 'CHECKLIST-APLICAR'],
  recursos: [
    'COMO-USAR-ESTA-GUIA',
    'ROADMAP-90-DIAS',
    'PLATAFORMAS-DE-PRACTICA',
    'GLOSARIO-CULTURA-HACKER',
    'CURSOS-Y-CERTIFICACIONES',
  ],
  'cultura-geek': ['INSPIRACION-MR-ROBOT', 'COMO-VER-MR-ROBOT', 'CULTURA-TECH-Y-CIBERSEGURIDAD', 'ETICA-HACKER-Y-OPEN-SOURCE'],
};

export const CONTENT_FOLDERS = Object.freeze(Object.keys(PAGE_ORDER).filter(Boolean));

export const STUDY_ORDER = [
  'Inicio',
  'Seguridad Personal',
  'Glosario',
  'Fundamentos',
  'Redes Cisco',
  'Linux',
  'Windows Active Directory',
  'Programación',
  'Web OWASP',
  'Blue Team',
  'Security Teams',
  'Cloud Security',
  'IoT y Seguridad Industrial',
  'Seguridad en IA y LLMs',
  'OSINT y CTI',
  'Seguridad Móvil',
  'Criptografía',
  'AppSec y DevSecOps',
  'Forense',
  'Malware Básico',
  'Ingeniería Social',
  'Scripts',
  'Vulnerability Management',
  'GRC',
  'API Security',
  'Containers Kubernetes',
  'Privacy',
  'Email Security',
  'Wireless Security',
  'Security Architecture',
  'Identity Access',
  'Business Continuity',
  'Network Security',
  'Endpoint Security',
  'Database Security',
  'Red Team',
  'Playbooks',
  'Empleabilidad',
  'Recursos',
  'Cultura Geek',
];

function slugifyPart(value) {
  return value.replace(/\.md$/i, '').toLowerCase();
}

function resolveMarkdownFilePath(slug) {
  const normalizedSlug = slug.map((part) => part.toLowerCase());

  if (normalizedSlug.length === 1) {
    const fileName = PUBLIC_ROOT_FILES.find((name) => slugifyPart(name) === normalizedSlug[0]);
    return fileName ? path.join(ROOT_DIR, fileName) : null;
  }

  const folderPath = path.join(ROOT_DIR, ...normalizedSlug.slice(0, -1));
  if (!fs.existsSync(folderPath)) return null;

  const requestedFile = `${normalizedSlug[normalizedSlug.length - 1]}.md`;
  const fileName = fs
    .readdirSync(folderPath)
    .find((entry) => entry.toLowerCase() === requestedFile);

  return fileName ? path.join(folderPath, fileName) : null;
}

function sortPagesByStudyOrder(folder, pages) {
  const order = PAGE_ORDER[folder] || [];

  return pages.sort((a, b) => {
    const nameA = a.fileName.replace('.md', '');
    const nameB = b.fileName.replace('.md', '');
    const idxA = order.indexOf(nameA);
    const idxB = order.indexOf(nameB);

    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.title.localeCompare(b.title);
  });
}

function getMarkdownFilesRecursive(dir, relativeParts = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      if (!IGNORE_FOLDERS.includes(entry.name) && !entry.name.startsWith('.')) {
        files.push(...getMarkdownFilesRecursive(path.join(dir, entry.name), [...relativeParts, entry.name]));
      }
      return;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push({
        filePath: path.join(dir, entry.name),
        slugParts: [...relativeParts.map(slugifyPart), slugifyPart(entry.name)],
        fileName: entry.name,
      });
    }
  });

  return files;
}

// Helper to clean up folder names into readable titles
export function formatFolderName(folderName) {
  return folderName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace('Appsec Devsecops', 'AppSec y DevSecOps')
    .replace('Owasp', 'OWASP')
    .replace('Ad', 'Active Directory')
    .replace('Cisco', 'Cisco')
    .replace('Grc', 'GRC')
    .replace('Iam', 'IAM')
    .replace('Siem', 'SIEM')
    .replace(/\bId\b/g, 'ID')
    .replace('Db', 'Database')
    .replace('Edr', 'EDR')
    .replace('Vpn', 'VPN')
    .replace('Api', 'API')
    .replace('Iot Ot Security', 'IoT y Seguridad Industrial')
    .replace('Osint Cti', 'OSINT y CTI')
    .replace('Mobile Security', 'Seguridad Móvil')
    .replace('Ai Security', 'Seguridad en IA y LLMs')
    .replace('Social Engineering', 'Ingeniería Social')
    .replace('Cultura Geek', 'Cultura Geek')
    .replace('Glosario', 'Glosario')
    .replace('Cripto', 'Criptografía')
    .replace('Malware Basico', 'Malware Básico')
    .replace('Programacion', 'Programación');
}

function inferLevel({ folder = '', fileName = '', title = '', isRoot = false }) {
  const text = `${folder} ${fileName} ${title}`.toLowerCase();

  if (isRoot) return 'inicial';

  if (
    text.includes('cheatsheet') ||
    folder === 'cheatsheets' ||
    folder === 'notes' ||
    folder === 'resources' ||
    fileName.includes('PLANTILLA')
  ) {
    return 'referencia';
  }

  if (
    text.includes('avanzado') ||
    text.includes('advanced') ||
    text.includes('capstone') ||
    folder === 'capstone-projects' ||
    folder === 'red-team' ||
    folder === 'forense' ||
    folder === 'malware-basico' ||
    folder === 'containers-kubernetes' ||
    folder === 'security-architecture'
  ) {
    return 'avanzado';
  }

  if (
    folder === 'blue-team' ||
    folder === 'osint-cti' ||
    folder === 'cloud-security' ||
    folder === 'iot-ot-security' ||
    folder === 'api-security' ||
    folder === 'mobile-security' ||
    folder === 'appsec-devsecops' ||
    folder === 'vulnerability-management' ||
    folder === 'windows-ad' ||
    folder === 'identity-access' ||
    folder === 'endpoint-security' ||
    folder === 'database-security' ||
    folder === 'network-security' ||
    folder === 'business-continuity' ||
    folder === 'grc' ||
    folder === 'privacy' ||
    folder === 'email-security' ||
    folder === 'wireless-security'
  ) {
    return 'intermedio';
  }

  if (folder === 'recursos' || folder === 'cultura-geek') {
    return 'referencia';
  }

  return 'inicial';
}

function createSearchText(content) {
  return content
    .replace(/```[\s\S]*?```/g, (block) => ` ${block.replace(/```[a-zA-Z0-9-]*\n?/g, ' ')} `)
    .replace(/`([^`\n]+)`/g, ' $1 ')
    .replace(/[#>*_[\]()`|:-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 20000);
}

function createExcerpt(content) {
  const body = content.replace(/^\s*#\s+[^\n]+\n+/, '');
  return createSearchText(body).slice(0, 180);
}

function getEditorialMeta(data, inferredLevel) {
  return {
    level: data.level || inferredLevel,
    contentType: data.content_type || "guia",
    updated: data.updated || null,
    reviewed: data.reviewed || null,
    reviewedAgainst: data.reviewed_against || null,
  };
}

// Get all content categories and their markdown files
export function getContentStructure() {
  const structure = [];
  const rootFiles = [];

  for (const fileName of PUBLIC_ROOT_FILES) {
    const filePath = path.join(/*turbopackIgnore: true*/ ROOT_DIR, fileName);
    if (!fs.existsSync(/*turbopackIgnore: true*/ filePath)) continue;

    const fileContent = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf8');
    const { data, content } = parseFrontmatter(fileContent);
    const title = data.title || content.match(/^#\s+(.+)$/m)?.[1] || fileName.replace('.md', '');
    const inferredLevel = inferLevel({ fileName, title, isRoot: true });

    rootFiles.push({
      slug: [slugifyPart(fileName)],
      title,
      fileName,
      isRoot: true,
      ...getEditorialMeta(data, inferredLevel),
      searchText: createSearchText(content),
      excerpt: createExcerpt(content),
    });
  }

  if (rootFiles.length > 0) {
    sortPagesByStudyOrder('', rootFiles);
    structure.push({ category: 'Inicio', folder: '', pages: rootFiles });
  }

  for (const folder of CONTENT_FOLDERS) {
    const folderPath = path.join(/*turbopackIgnore: true*/ ROOT_DIR, folder);
    if (!fs.existsSync(folderPath)) continue;

    const pages = getMarkdownFilesRecursive(folderPath, [folder]).map((file) => {
      const fileContent = fs.readFileSync(file.filePath, 'utf8');
      const { data, content } = parseFrontmatter(fileContent);
      const title = data.title || content.match(/^#\s+(.+)$/m)?.[1] || file.fileName.replace('.md', '');
      const inferredLevel = inferLevel({ folder, fileName: file.fileName, title });

      return {
        slug: file.slugParts,
        title,
        fileName: file.fileName,
        isRoot: false,
        ...getEditorialMeta(data, inferredLevel),
        searchText: createSearchText(content),
        excerpt: createExcerpt(content),
      };
    });

    if (pages.length > 0) {
      sortPagesByStudyOrder(folder, pages);
      structure.push({ category: formatFolderName(folder), folder, pages });
    }
  }

  // Sort structure according to didactical study order
  structure.sort((a, b) => {
    const idxA = STUDY_ORDER.indexOf(a.category);
    const idxB = STUDY_ORDER.indexOf(b.category);
    
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.category.localeCompare(b.category);
  });

  return structure;
}

// Read content of a specific markdown file by its slug path
export function getMarkdownContent(slug) {
  const filePath = resolveMarkdownFilePath(slug);

  if (!filePath || !fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf8');
  const { data, content } = parseFrontmatter(fileContent);

  // Extract title if not in frontmatter
  let title = data.title;
  if (!title) {
    const match = content.match(/^#\s+(.+)$/m);
    title = match ? match[1] : slug[slug.length - 1];
  }

  return {
    meta: data,
    content: content.replace(/^#\s+.+$/m, ''), // Remove title from content body to avoid duplication
    title: title,
  };
}
