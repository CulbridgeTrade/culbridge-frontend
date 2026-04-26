import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface TokenPayload {
  userId: string
  email: string
  role: string
}

// NOTE: In Edge runtime, avoid jsonwebtoken.
// We only validate existence here.
// Full verification MUST happen in backend API.
function parseToken(token: string | undefined): boolean {
  return Boolean(token && token.length > 10)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('auth-token')?.value

  const isAuthenticated = parseToken(token)

  // ============================
  // ADMIN ROUTES
  // ============================
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Role check must be done server-side (API), not middleware
    return NextResponse.next()
  }

  // ============================
  // PROTECTED ROUTES
  // ============================
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/shipment') ||
    pathname.startsWith('/demo')
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/shipment/:path*",
    "/demo/:path*",
    "/admin/:path*"
  ]
}