import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  // const shouldHandleLocale =
  //   !PUBLIC_FILE.test(request.nextUrl.pathname) &&
  //   !request.nextUrl.pathname.includes('/api/') &&
  //   request.nextUrl.locale === 'default';

  // const url = process.env.SITE_URL;

  // if (!url) return undefined;

  // return shouldHandleLocale ? NextResponse.redirect(`${url}/en${request.nextUrl.href}`) : undefined;
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(new URL(`/en${req.nextUrl.pathname}`, req.url));
  }
}
