import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, type Locale } from './lib/i18n/config';

/**
 * i18n Middleware
 * Handles locale detection and routing for multilingual support
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale from Accept-Language header or use default
  const locale = getLocale(request) || defaultLocale;

  // Redirect to locale-prefixed URL
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // Preserve search params
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

/**
 * Get locale from request
 */
function getLocale(request: NextRequest): Locale | null {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase());

    for (const lang of languages) {
      const locale = lang.split('-')[0] as Locale;
      if (locales.includes(locale)) {
        return locale;
      }
    }
  }

  // Check cookie if available
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  return null;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

