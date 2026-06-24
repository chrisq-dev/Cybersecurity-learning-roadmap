import { getContentStructure } from '../lib/markdown';

const BASE_URL = "https://cbsdev.lat";

export default function sitemap() {
  const structure = getContentStructure();

  const guideUrls = structure.flatMap((category) =>
    category.pages.map((page) => ({
      url: `${BASE_URL}/${page.slug.join('/')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...guideUrls,
  ];
}
