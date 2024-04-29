import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = [
    '/',
    '/home',
    '/tournements',
    '/tournements',
    '/game',
    '/meessanger',
    '/profile',
    '/settings'
]

const publicRoutes = [
    '/auth',
    '/auth/register',
]

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const IsProtected = protectedRoutes.includes(path);
    const IsPublic = publicRoutes.includes(path);
    const cookie = cookies().get('access')?.value
    if (IsProtected && !cookie) {
        return NextResponse.redirect(new URL('/auth', req.nextUrl))
    }
    if (IsPublic && cookie) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
    return NextResponse.next()
}