import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), '..');

// List of folders we want to ignore (system or non-content folders)
const IGNORE_FOLDERS = [
  'web',
  'node_modules',
  '.git',
  '.next',
  '.gemini',
  'public',
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

const PUBLIC_FOLDERS = [
  'glosario',
  'fundamentos',
  'redes-cisco',
  'linux',
  'windows-ad',
  'programacion',
  'web-owasp',
  'blue-team',
  'security-teams',
  'cloud-security',
  'api-security',
  'appsec-devsecops',
  'vulnerability-management',
  'network-security',
  'endpoint-security',
  'database-security',
  'wireless-security',
  'identity-access',
  'containers-kubernetes',
  'security-architecture',
  'grc',
  'privacy',
  'email-security',
  'social-engineering',
  'business-continuity',
  'cripto',
  'forense',
  'malware-basico',
  'red-team',
  'labs',
  'playbooks',
  'capstone-projects',
  'cheatsheets',
  'empleabilidad',
  'writeups',
];

const PAGE_ORDER = {
  '': ['INICIO-AQUI'],
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
  labs: ['PRIMEROS-LABS', 'LABS-GUIADOS-FUNDAMENTOS', 'LABS-GUIADOS-BLUE-WEB', 'PROYECTOS-GUIADOS'],
  playbooks: ['CUENTA-COMPROMETIDA', 'PHISHING', 'SERVIDOR-EXPUESTO', 'MALWARE-ENDPOINT', 'FUGA-DATOS'],
  'capstone-projects': ['SOC-INVESTIGATION', 'APPSEC-REVIEW', 'CLOUD-SECURITY-REVIEW', 'SECURE-SMALL-BUSINESS'],
  cheatsheets: ['GLOSARIO', 'REDES', 'LINUX', 'WEB', 'BLUE-TEAM', 'PYTHON'],
  empleabilidad: ['RUTA-TRABAJO', 'RUTAS-POR-ROL', 'EMPLEO-READY', 'PROYECTOS-PORTAFOLIO', 'MAPA-DE-SKILLS', 'CV-LINKEDIN', 'ENTREVISTAS', 'CHECKLIST-APLICAR'],
  writeups: ['PLANTILLA-REPORTE'],
};

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
        slugParts: [...relativeParts, entry.name.replace('.md', '')],
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
    .replace('Social Engineering', 'Ingeniería Social')
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
    folder === 'cloud-security' ||
    folder === 'api-security' ||
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

  return 'inicial';
}

function createSearchText(content) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]+`/g, ' ')
    .replace(/[#>*_[\]()`|:-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 4000);
}

function createExcerpt(content) {
  return createSearchText(content).slice(0, 180);
}

// Get all content categories and their markdown files
export function getContentStructure() {
  const items = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
  const structure = [];

  // Root files are limited to the public student entry point.
  const rootFiles = [];

  items.forEach((item) => {
    if (!item.isDirectory()) {
      if (
        item.name.endsWith('.md') &&
        PUBLIC_ROOT_FILES.includes(item.name) &&
        !INTERNAL_ROOT_FILES.includes(item.name)
      ) {
        const filePath = path.join(ROOT_DIR, item.name);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        // Extract title from content if not in frontmatter
        let title = data.title;
        if (!title) {
          const match = fileContent.match(/^#\s+(.+)$/m);
          title = match ? match[1] : item.name.replace('.md', '');
        }

        rootFiles.push({
          slug: [item.name.replace('.md', '')],
          title: title,
          fileName: item.name,
          isRoot: true,
          level: inferLevel({ fileName: item.name, title, isRoot: true }),
          searchText: createSearchText(fileContent),
          excerpt: createExcerpt(fileContent)
        });
      }
    }
  });

  if (rootFiles.length > 0) {
    sortPagesByStudyOrder('', rootFiles);

    structure.push({
      category: 'Inicio',
      folder: '',
      pages: rootFiles
    });
  }

  // Now scan subdirectories
  items.forEach((item) => {
    if (
      item.isDirectory() &&
      PUBLIC_FOLDERS.includes(item.name) &&
      !IGNORE_FOLDERS.includes(item.name) &&
      !item.name.startsWith('.')
    ) {
      const folderPath = path.join(ROOT_DIR, item.name);
      const pages = [];
      const files = getMarkdownFilesRecursive(folderPath, [item.name]);
      const allowedFiles = PAGE_ORDER[item.name] || null;

      files.forEach((file) => {
        const baseName = file.fileName.replace('.md', '');
        if (allowedFiles && !allowedFiles.includes(baseName)) return;

        const fileContent = fs.readFileSync(file.filePath, 'utf8');
        const { data } = matter(fileContent);

        let title = data.title;
        if (!title) {
          const match = fileContent.match(/^#\s+(.+)$/m);
          title = match ? match[1] : file.fileName.replace('.md', '');
        }

        pages.push({
          slug: file.slugParts,
          title: title,
          fileName: file.fileName,
          isRoot: false,
          level: inferLevel({ folder: item.name, fileName: file.fileName, title }),
          searchText: createSearchText(fileContent),
          excerpt: createExcerpt(fileContent)
        });
      });

      if (pages.length > 0) {
        sortPagesByStudyOrder(item.name, pages);

        structure.push({
          category: formatFolderName(item.name),
          folder: item.name,
          pages: pages
        });
      }
    }
  });

  const STUDY_ORDER = [
    'Inicio',
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
    'Labs',
    'Playbooks',
    'Writeups',
    'Cheatsheets',
    'Evaluaciones',
    'Empleabilidad'
  ];

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
  let filePath = '';

  if (slug.length === 1) {
    // Root file
    filePath = path.join(ROOT_DIR, `${slug[0]}.md`);
  } else {
    // Subfolder file, including nested content paths
    filePath = path.join(ROOT_DIR, ...slug.slice(0, -1), `${slug[slug.length - 1]}.md`);
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Extract title if not in frontmatter
  let title = data.title;
  if (!title) {
    const match = content.match(/^#\s+(.+)$/m);
    title = match ? match[1] : slug[slug.length - 1];
  }

  return {
    meta: data,
    content: content.replace(/^#\s+.+$/m, ''), // Remove title from content body to avoid duplication
    title: title
  };
}
