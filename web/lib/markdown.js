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
];

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
    .replace('Id', 'ID')
    .replace('Db', 'Database')
    .replace('Edr', 'EDR')
    .replace('Vpn', 'VPN')
    .replace('Api', 'API')
    .replace('Tdah', 'TDAH');
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

  // We want to read individual root markdown files first (like README, INICIO-AQUI, SISTEMA-TDAH)
  const rootFiles = [];

  items.forEach((item) => {
    if (!item.isDirectory()) {
      const ignoredRootFiles = ['LICENSE', 'CONTRIBUTING.md', 'README.md', 'PLANTILLA-APUNTES.md'];
      if (item.name.endsWith('.md') && !ignoredRootFiles.includes(item.name)) {
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
    const rootOrder = [
      'INICIO-AQUI',
      'COMO-USAR-LA-GUIA',
      'COMO-ESTUDIAR',
      'GUIA-DE-ESTUDIO',
      'TEMARIO-MAESTRO',
      'PUBLICACION-GITHUB'
    ];

    rootFiles.sort((a, b) => {
      const nameA = a.fileName.replace('.md', '');
      const nameB = b.fileName.replace('.md', '');
      const idxA = rootOrder.indexOf(nameA);
      const idxB = rootOrder.indexOf(nameB);

      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.title.localeCompare(b.title);
    });

    structure.push({
      category: 'General',
      folder: '',
      pages: rootFiles
    });
  }

  // Now scan subdirectories
  items.forEach((item) => {
    if (item.isDirectory() && !IGNORE_FOLDERS.includes(item.name) && !item.name.startsWith('.')) {
      const folderPath = path.join(ROOT_DIR, item.name);
      const pages = [];
      const files = getMarkdownFilesRecursive(folderPath, [item.name]);

      files.forEach((file) => {
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
        // Also sort pages inside folders alphabetically
        pages.sort((a, b) => a.title.localeCompare(b.title));

        structure.push({
          category: formatFolderName(item.name),
          folder: item.name,
          pages: pages
        });
      }
    }
  });

  const STUDY_ORDER = [
    'General',
    'Fundamentos',
    'Redes Cisco',
    'Linux',
    'Windows Active Directory',
    'Programacion',
    'Web OWASP',
    'Blue Team',
    'Security Teams',
    'Cloud Security',
    'Cripto',
    'AppSec y DevSecOps',
    'Forense',
    'Malware Basico',
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
