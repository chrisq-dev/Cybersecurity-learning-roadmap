import { NextResponse } from 'next/server';

export function proxy(request) {
  const url = request.nextUrl;
  const lowercasePath = url.pathname.toLowerCase();

  if (url.pathname !== lowercasePath) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = lowercasePath;
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|icon.svg|robots.txt|sitemap.xml|og-mapa-ciberseguridad.png).*)'],
};
