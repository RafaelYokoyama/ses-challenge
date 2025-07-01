import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname === '/saved' || 
      pathname === '/friends' || 
      pathname === '/notifications' ||
      pathname === '/preferences') {
    return NextResponse.redirect(new URL('/user', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/saved',
    '/friends', 
    '/notifications',
    '/preferences'
  ],
} 