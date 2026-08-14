import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isSystemPath = path.startsWith('/system-hq');
  const isPortalPath = path.startsWith('/portal');
  
  if (!isSystemPath && !isPortalPath) {
    return NextResponse.next();
  }
  
  // Exclude login pages from auth checks to prevent redirect loops
  if (path === '/system-hq/login' || path === '/portal/login') {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('session')?.value;
  
  if (!sessionCookie) {
    if (isSystemPath) return NextResponse.redirect(new URL('/system-hq/login', request.url));
    if (isPortalPath) return NextResponse.redirect(new URL('/portal/login', request.url));
  }
  
  try {
    const session = await decrypt(sessionCookie as string);
    if (!session) {
      throw new Error("Invalid session");
    }

    // Role-based routing
    if (isSystemPath && session.role !== 'ADMIN' && session.role !== 'HR') {
      return NextResponse.redirect(new URL('/portal/dashboard', request.url));
    }
    
    if (isPortalPath && (session.role === 'ADMIN' || session.role === 'HR')) {
      return NextResponse.redirect(new URL('/system-hq/dashboard', request.url));
    }
    
  } catch (err) {
    if (isSystemPath) return NextResponse.redirect(new URL('/system-hq/login', request.url));
    if (isPortalPath) return NextResponse.redirect(new URL('/portal/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/system-hq/:path*', '/portal/:path*'],
};
