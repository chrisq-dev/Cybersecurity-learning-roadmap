import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "../lib/frontmatter.mjs";
import { OFFICIAL_SOURCES } from "../lib/officialSources.mjs";
import { AREAS } from "../lib/areas.js";
import { CONTENT_FOLDERS, PAGE_ORDER, STUDY_ORDER, formatFolderName } from "../lib/markdown.js";

const ROOT = path.resolve(process.cwd(), "..");
const IGNORED_FOLDERS = new Set([".git", "node_modules", "web", "assets"]);
const ALLOWED_LEVELS = new Set(["inicial", "intermedio", "avanzado", "referencia"]);
const ALLOWED_TYPES = new Set(["articulo", "glosario", "guia", "playbook", "recurso", "ruta"]);
const ROOT_CONTENT = new Set(["INICIO-AQUI.md"]);
const errors = [];
const warnings = [];
const today = new Date().toISOString().slice(0, 10);

function isValidDate(value) {
  const text = String(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
  const date = new Date(`${text}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === text;
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      if (IGNORED_FOLDERS.has(entry.name) || entry.name.startsWith(".")) return [];
      return walk(path.join(directory, entry.name));
    }
    if (!entry.name.endsWith(".md")) return [];
    const fullPath = path.join(directory, entry.name);
    if (directory === ROOT && !ROOT_CONTENT.has(entry.name)) return [];
    return [fullPath];
  });
}

const files = walk(ROOT);
const registeredFiles = new Set(
  Object.entries(PAGE_ORDER).flatMap(([folder, names]) => names.map((name) => `${folder}/${name}.md`))
);
const inicioContent = fs.readFileSync(path.join(ROOT, "INICIO-AQUI.md"), "utf8");
const seenTitles = new Map();
const seenSlugs = new Map();

for (const file of files) {
  const relative = path.relative(ROOT, file);
  if (relative.includes(path.sep)) {
    const folder = relative.split(path.sep)[0];
    if (!CONTENT_FOLDERS.includes(folder)) {
      errors.push(`${relative}: la carpeta no está registrada en PAGE_ORDER`);
    } else if (!registeredFiles.has(relative)) {
      errors.push(`${relative}: el archivo no está registrado en PAGE_ORDER`);
    }
  }
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = parseFrontmatter(raw);
  const slug = relative.replace(/\.md$/i, "").toLowerCase();
  const folder = relative.includes(path.sep) ? relative.split(path.sep)[0] : "default";
  if (!OFFICIAL_SOURCES[folder]) errors.push(`${relative}: no tiene colección de fuentes oficiales`);

  for (const field of ["title", "level", "content_type", "updated"]) {
    if (!data[field]) errors.push(`${relative}: falta frontmatter ${field}`);
  }

  if (data.level && !ALLOWED_LEVELS.has(data.level)) errors.push(`${relative}: nivel no permitido ${data.level}`);
  if (data.content_type && !ALLOWED_TYPES.has(data.content_type)) errors.push(`${relative}: tipo no permitido ${data.content_type}`);
  if (data.updated && !isValidDate(data.updated)) errors.push(`${relative}: fecha updated inválida`);
  if (data.updated && String(data.updated) > today) errors.push(`${relative}: updated está en el futuro`);
  if (data.reviewed && !isValidDate(data.reviewed)) errors.push(`${relative}: fecha reviewed inválida`);
  if (data.reviewed && String(data.reviewed) > today) errors.push(`${relative}: reviewed está en el futuro`);
  if (data.reviewed && !data.reviewed_against) errors.push(`${relative}: reviewed requiere reviewed_against`);
  if (data.reviewed && !Array.isArray(data.official_sources)) errors.push(`${relative}: un artículo revisado requiere official_sources`);

  for (const source of data.official_sources || []) {
    if (!source?.title || !source?.url?.startsWith("https://")) errors.push(`${relative}: official_sources contiene una referencia inválida`);
  }

  const h1 = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (!h1) errors.push(`${relative}: falta encabezado H1`);
  else if (data.title && h1 !== data.title) errors.push(`${relative}: el H1 no coincide con title`);

  if (seenTitles.has(data.title)) warnings.push(`${relative}: título repetido con ${seenTitles.get(data.title)}`);
  else seenTitles.set(data.title, relative);
  if (seenSlugs.has(slug)) errors.push(`${relative}: slug duplicado con ${seenSlugs.get(slug)}`);
  else seenSlugs.set(slug, relative);

  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1].split("#")[0];
    if (!href || /^(https?:|mailto:|#)/i.test(href)) continue;
    const target = path.resolve(path.dirname(file), decodeURIComponent(href));
    if (!fs.existsSync(target)) errors.push(`${relative}: enlace interno roto ${href}`);
  }

  if (/CVE-20\d{2}-XXXX/i.test(content)) warnings.push(`${relative}: contiene un CVE de ejemplo sin identificador real`);
}

const mappedFolders = new Set(AREAS.flatMap((area) => area.folders));
for (const folder of CONTENT_FOLDERS) {
  if (!fs.existsSync(path.join(ROOT, folder))) {
    errors.push(`PAGE_ORDER: la carpeta ${folder} no existe`);
    continue;
  }

  if (!mappedFolders.has(folder)) errors.push(`areas.js: falta mapear la carpeta ${folder}`);
  if (!STUDY_ORDER.includes(formatFolderName(folder))) errors.push(`STUDY_ORDER: falta ${formatFolderName(folder)}`);
  if (!inicioContent.includes(`](${folder}/`)) errors.push(`INICIO-AQUI.md: falta un enlace a ${folder}/`);

  for (const name of PAGE_ORDER[folder]) {
    if (!fs.existsSync(path.join(ROOT, folder, `${name}.md`))) {
      errors.push(`PAGE_ORDER: falta ${folder}/${name}.md`);
    }
  }
}

for (const folder of mappedFolders) {
  if (folder !== "" && !CONTENT_FOLDERS.includes(folder)) {
    errors.push(`areas.js: la carpeta ${folder} no está registrada en PAGE_ORDER`);
  }
}

for (const [collection, sources] of Object.entries(OFFICIAL_SOURCES)) {
  if (!Array.isArray(sources) || sources.length < 2) errors.push(`fuentes ${collection}: se requieren al menos dos referencias`);
  for (const source of sources || []) {
    if (!source.title || !source.url?.startsWith("https://")) errors.push(`fuentes ${collection}: referencia inválida`);
  }
}

const dockerfile = fs.readFileSync(path.join(ROOT, "Dockerfile"), "utf8");
const publishedFolders = new Set(files.map((file) => path.relative(ROOT, file)).filter((relative) => relative.includes(path.sep)).map((relative) => relative.split(path.sep)[0]));
for (const folder of publishedFolders) {
  if (!dockerfile.includes(`/app/${folder} /app/${folder}`)) errors.push(`Dockerfile: falta copiar la categoría ${folder}`);
}
if (!dockerfile.includes("/app/assets /app/assets")) errors.push("Dockerfile: falta copiar assets");

for (const warning of warnings) console.warn(`ADVERTENCIA: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

console.log(`${files.length} documentos comprobados; ${errors.length} errores; ${warnings.length} advertencias.`);
if (errors.length > 0) process.exit(1);
