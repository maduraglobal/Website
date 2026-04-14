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
  
  // 1. Define Supported Regions and Reserved Paths
  const supportedRegions = ['en-in', 'en-au', 'en-us'];
  const reservedPaths = ['admin', 'api', 'auth', 'antigravity', 'crm', 'destination', 'test', '_next'];
  const shortCodes: Record<string, string> = {
    'in': 'en-in',
    'au': 'en-au',
    'us': 'en-us',
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // 2. Handle short-code aliases (e.g., /in/visa -> /en-in/visa)
  if (firstSegment && shortCodes[firstSegment]) {
    const target = shortCodes[firstSegment];
    const rest = pathname.slice(firstSegment.length + 1);
    const response = NextResponse.redirect(new URL(`/${target}${rest}`, request.url));
    response.cookies.set('user-region', target, { maxAge: 60 * 60 * 24 * 365, path: '/' });
    return response;
  }

  // 3. Geolocation-based routing for non-regional paths
  // If we are at root, or the first segment is not a supported region AND not a reserved path
  const isRegional = supportedRegions.includes(firstSegment);
  const isReserved = reservedPaths.includes(firstSegment);

  if (!isRegional && !isReserved) {
    // Priority: Cookie > IP detection > Default (en-in)
    let targetRegion = request.cookies.get('user-region')?.value;

    if (!targetRegion) {
      // IP Detection (Vercel specific header or geo data)
      const countryCode = request.headers.get('x-vercel-ip-country') || (request as any).geo?.country;
      
      const countryToRegion: Record<string, string> = {
        'IN': 'en-in',
        'AU': 'en-au',
        'US': 'en-us',
        'GB': 'en-us',
        'AE': 'en-in',
        'OM': 'en-in',
        'QA': 'en-in',
        'SA': 'en-in',
      }
      
      targetRegion = countryCode ? (countryToRegion[countryCode.toUpperCase()] || 'en-in') : 'en-in';
    }

    const response = NextResponse.redirect(new URL(`/${targetRegion}${pathname}`, request.url))
    response.cookies.set('user-region', targetRegion, { maxAge: 60 * 60 * 24 * 365, path: '/' })
    return response
  }

  // 4. Persistence: If visiting a regional path, ensure cookie matches
  let response = NextResponse.next();
  if (isRegional) {
    const currentCookie = request.cookies.get('user-region')?.value;
    if (currentCookie !== firstSegment) {
      response.cookies.set('user-region', firstSegment, { maxAge: 60 * 60 * 24 * 365, path: '/' })
    }
  }

  // 5. SUPABASE SESSION REFRESH
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
            response.cookies.set(name, value, {
              ...options,
              maxAge: undefined,
              expires: undefined,
            })
          )
          // Re-apply our custom region cookie if it was set earlier
          if (isRegional) {
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
