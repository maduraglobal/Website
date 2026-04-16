import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return [] // Not used in this context but required by type
          },
          setAll(cookiesToSet) {
            // Usually we'd handle cookies here, but in a route handler we can use the response
          },
        },
      }
    )

    // Manual cookie handling for the route handler response
    const response = NextResponse.redirect(`${origin}${next}`)

    const { error } = await (supabase.auth as any).exchangeCodeForSession(code)
    
    // We need to re-create the client WITH the response to set cookies correctly
    const finalSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return []
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )
    
    await finalSupabase.auth.exchangeCodeForSession(code)

    if (!error) {
       return response
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
