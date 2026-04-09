import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 1. Short-code aliases: /in → /en-in, /au → /en-au, /us → /en-us
  const shortCodes: Record<string, string> = {
    '/in':  'en-in',
    '/au':  'en-au',
    '/us':  'en-us',
  }
  
  for (const [short, full] of Object.entries(shortCodes)) {
    if (pathname === short || pathname.startsWith(short + '/')) {
      const rest = pathname.slice(short.length)
      const response = NextResponse.redirect(new URL(`/${full}${rest}`, request.url))
      // Update cookie to persist manual selection via shortcode
      response.cookies.set('user-region', full, { maxAge: 60 * 60 * 24 * 365, path: '/' })
      return response
    }
  }

  // 2. Root path redirection with IP/Cookie detection
  if (pathname === '/') {
    // Priority: Cookie (User selection) > IP detection > Default (India)
    let targetRegion = request.cookies.get('user-region')?.value;

    if (!targetRegion) {
      // IP Detection (Vercel specific header or geo data)
      const countryCode = request.headers.get('x-vercel-ip-country') || (request as any).geo?.country;
      
      const countryToRegion: Record<string, string> = {
        'IN': 'en-in',
        'AU': 'en-au',
        'US': 'en-us',
      }
      
      targetRegion = countryCode ? (countryToRegion[countryCode.toUpperCase()] || 'en-in') : 'en-in';
    }

    const response = NextResponse.redirect(new URL(`/${targetRegion}`, request.url))
    // Persist detected/decided region in cookie
    response.cookies.set('user-region', targetRegion, { maxAge: 60 * 60 * 24 * 365, path: '/' })
    return response
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 3. Update cookie if user visits a specific region page directly
  const supportedRegions = ['en-in', 'en-au', 'en-us'];
  const firstSegment = pathname.split('/')[1];

  if (supportedRegions.includes(firstSegment)) {
    const currentCookie = request.cookies.get('user-region')?.value;
    if (currentCookie !== firstSegment) {
      response.cookies.set('user-region', firstSegment, { maxAge: 60 * 60 * 24 * 365, path: '/' })
    }
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
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
          // Re-apply our custom region cookie if it was set in this request
          if (supportedRegions.includes(firstSegment)) {
             response.cookies.set('user-region', firstSegment, { maxAge: 60 * 60 * 24 * 365, path: '/' })
          }
        },
      },
    }
  )

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
