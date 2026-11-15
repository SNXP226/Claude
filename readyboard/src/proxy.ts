import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Keeps the login fresh and sends logged-out visitors to the login page.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );
  const { data } = await supabase.auth.getClaims();
  const loggedIn = !!data?.claims;
  const path = request.nextUrl.pathname;

  const privatePage = path.startsWith("/staff") || path.startsWith("/settings");
  const authPage = path === "/" || path.startsWith("/login") || path.startsWith("/signup");

  if (privatePage && !loggedIn) return redirectTo(request, "/login", response);
  if (authPage && loggedIn) return redirectTo(request, "/staff", response);
  if (path === "/" && !loggedIn) return redirectTo(request, "/login", response);
  return response;
}

function redirectTo(request: NextRequest, to: string, from: NextResponse) {
  const url = request.nextUrl.clone();
  url.pathname = to;
  url.search = "";
  const res = NextResponse.redirect(url);
  from.cookies.getAll().forEach((c) => res.cookies.set(c));
  return res;
}

export const config = {
  matcher: ["/", "/login", "/signup", "/staff/:path*", "/settings/:path*"],
};
