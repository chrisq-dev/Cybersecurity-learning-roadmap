export function slugifyHeadingText(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createHeadingId(text, counts) {
  const baseId = slugifyHeadingText(text) || 'section';
  const count = counts.get(baseId) || 0;

  counts.set(baseId, count + 1);

  return count === 0 ? baseId : `${baseId}-${count}`;
}

export function extractTextFromReactNode(node) {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractTextFromReactNode).join('');
  if (node?.props?.children) return extractTextFromReactNode(node.props.children);
  return '';
}
