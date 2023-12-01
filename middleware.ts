import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const session = await getToken({ req });

    if (!session && path !== "/auth/signin") {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    } else if (session && path == "/auth/signin") {
        return NextResponse.redirect(new URL("/tracking", req.url));
    }

    if (req.nextUrl.pathname == '/') {
        return NextResponse.redirect(new URL('/tracking', req.url))
    }
    if (session) {
        const { modules }: Array<string> = session;

        console.log(path.toUpperCase().replace("/", ""))
        console.log(modules.includes(path.toUpperCase().replace("/", "")))
        if (!(modules && modules.includes(path.toUpperCase().replace("/", "")))) {
            return NextResponse.redirect(new URL('/tracking', req.url))
        }
    }
}