import { NextResponse } from 'next/server';

function normalizePathname(pathname) {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }
  return decoded
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function proxy(request) {
  const url = request.nextUrl;
  const normalizedPath = normalizePathname(url.pathname);

  if (url.pathname !== normalizedPath) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = normalizedPath;
    return NextResponse.redirect(redirectUrl, 301);
  }

  const response = NextResponse.next();
  response.headers.set(
    'Cache-Control',
    'public, max-age=0, s-maxage=300, stale-while-revalidate=86400'
  );
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|icon.svg|robots.txt|sitemap.xml|og-mapa-ciberseguridad.png|opengraph-image).*)',
  ],
};
