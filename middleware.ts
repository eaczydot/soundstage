import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth-token') // Replace with your auth check
  const isPublicPath = request.nextUrl.pathname.startsWith('/auth/')
  
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)',
  ],
} 