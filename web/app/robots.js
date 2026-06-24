export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://cbsdev.lat/sitemap.xml',
    host: 'https://cbsdev.lat',
  };
}
