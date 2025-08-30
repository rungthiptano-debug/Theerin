import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/auth",
    "/find-job",
    "/health",
    "/appointment",
    "/history",
    "/consulting",
    "/location-reminder",
    "/job-chat",
    "/community",
  ]

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(
    (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + "/"),
  )

  // Allow access to public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For now, allow access to all routes until we can properly implement auth middleware
  // TODO: Implement proper authentication checking once Supabase is working
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
