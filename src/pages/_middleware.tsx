import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes('/api/') &&
    request.nextUrl.locale === 'default';

  const url = process.env.SITE_URL;

  if (!url) return undefined;

  return shouldHandleLocale ? NextResponse.redirect(`${url}/en${request.nextUrl.href}`) : undefined;
}
