import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
export async function middleware(request: NextRequest) {
  
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });
        
        if (!token && request.nextUrl.pathname == '/auth/signin'){
           
            return ;
        } 
      
        if (request.nextUrl.pathname == '/') {
            return NextResponse.redirect(new URL('/tracking', request.url))
        }
}