import { getContentStructure } from './markdown.js';
import { getAreaForFolder } from './areas.js';

let cachedIndex = null;

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function getIndex() {
  if (cachedIndex) return cachedIndex;

  cachedIndex = getContentStructure().flatMap((category) => {
    const area = getAreaForFolder(category.folder);
    return category.pages.map((page) => {
      const slug = page.slug.join('/');
      return {
        slug,
        title: page.title,
        excerpt: page.excerpt,
        level: page.level,
        contentType: page.contentType,
        updated: page.updated,
        folder: category.folder,
        category: category.category,
        areaId: area.id,
        areaTitle: area.title,
        haystack: normalize(
          [page.title, category.category, page.fileName, page.searchText].join(' ')
        ),
      };
    });
  });

  return cachedIndex;
}

export function searchContent({ q = '', level = '', type = '', area = '', limit = 60 } = {}) {
  const query = String(q).slice(0, 100).trim();
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const maxResults = Math.min(Math.max(Number(limit) || 60, 1), 100);
  const filtered = getIndex().filter(
    (page) =>
      (!level || page.level === level) &&
      (!type || page.contentType === type) &&
      (!area || page.areaId === area)
  );

  if (terms.length === 0) {
    return { total: filtered.length, results: filtered.slice(0, maxResults) };
  }

  const scored = filtered
    .map((page) => {
      const title = normalize(page.title);
      let score = 0;

      for (const term of terms) {
        if (title === term) score += 100;
        else if (title.startsWith(term)) score += 60;
        else if (title.includes(term)) score += 35;
        if (normalize(page.category).includes(term)) score += 18;
        if (page.haystack.includes(term)) score += 4;
      }

      return { page, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title));

  return {
    total: scored.length,
    results: scored.slice(0, maxResults).map(({ page }) => {
      const { haystack, ...result } = page;
      return result;
    }),
  };
}
