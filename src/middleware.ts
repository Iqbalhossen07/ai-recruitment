import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = path.startsWith('/system-hq');
  
  if (isProtected && path !== '/system-hq/login') {
    const sessionCookie = request.cookies.get('session')?.value;
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/system-hq/login', request.url));
    }
    
    try {
      const session = await decrypt(sessionCookie);
      if (!session || session.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/system-hq/login', request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL('/system-hq/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/system-hq/:path*'],
};
