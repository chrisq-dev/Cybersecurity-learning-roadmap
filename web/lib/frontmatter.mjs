import { parse } from "yaml";

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_PATTERN);
  if (!match) return { data: {}, content: raw };

  return {
    data: parse(match[1]) || {},
    content: raw.slice(match[0].length),
  };
}
