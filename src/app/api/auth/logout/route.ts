import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  cookies().delete('session');
  return NextResponse.redirect(new URL('/portal/login', request.url));
}
