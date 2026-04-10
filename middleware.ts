import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Country Detection and Priority Logic:
 * Priority 1: User Manual Selection (Current Path Segment)
 * Priority 2: Cookie (Stored preference from previous session)
 * Priority 3: IP Detection (Initial or default detection via x-vercel-ip-country)
 * Priority 4: Unknown Country (Defaults to /en-in)
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 1. Handle short-code aliases for easy manual entry (e.g., /in, /au, /us)
  const shortCodes: Record<string, string> = {
    '/in':  'en-in',
    '/au':  'en-au',
    '/us':  'en-us',
  }
  
  for (const [short, full] of Object.entries(shortCodes)) {
    if (pathname === short || pathname.startsWith(short + '/')) {
      const rest = pathname.slice(short.length)
      const response = NextResponse.redirect(new URL(`/${full}${rest}`, request.url))
      // Update cookie to persist this manual selection
      response.cookies.set('user-region', full, { maxAge: 60 * 60 * 24 * 365, path: '/' })
      return response
    }
  }

  // 2. ROOT REDIRECTION: Logic for landing on maduratravel.com (Root)
  if (pathname === '/') {
    // Priority: Cookie > IP detection > Default (en-in)
    let targetRegion = request.cookies.get('user-region')?.value;

    if (!targetRegion) {
      // IP Detection (Vercel specific header or geo data)
      const countryCode = request.headers.get('x-vercel-ip-country') || (request as any).geo?.country;
      
      const countryToRegion: Record<string, string> = {
        'IN': 'en-in',
        'AU': 'en-au',
        'US': 'en-us',
        'GB': 'en-us', // Mapping UK to US segment as a placeholder if no UK segment exists
      }
      
      targetRegion = countryCode ? (countryToRegion[countryCode.toUpperCase()] || 'en-in') : 'en-in';
    }

    const response = NextResponse.redirect(new URL(`/${targetRegion}`, request.url))
    // Persist finalized region in cookie
    response.cookies.set('user-region', targetRegion, { maxAge: 60 * 60 * 24 * 365, path: '/' })
    return response
  }

  // 3. MANUAL OVERRIDE DETECTION: If visiting a regional path directly, update preference
  const supportedRegions = ['en-in', 'en-au', 'en-us'];
  const firstSegment = pathname.split('/')[1];

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  if (supportedRegions.includes(firstSegment)) {
    const currentCookie = request.cookies.get('user-region')?.value;
    // If user navigates to a different region manually, update the cookie
    if (currentCookie !== firstSegment) {
      response.cookies.set('user-region', firstSegment, { maxAge: 60 * 60 * 24 * 365, path: '/' })
    }
  }

  // 4. SUPABASE SESSION REFRESH
  // This ensures the session remains active across different regional domains
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
          // Re-apply our custom region cookie if it was set earlier in this middleware
          if (supportedRegions.includes(firstSegment)) {
             response.cookies.set('user-region', firstSegment, { maxAge: 60 * 60 * 24 * 365, path: '/' })
          }
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Images/Assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
