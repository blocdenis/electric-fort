import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { getUserInfo } from './services/api/api';

// 1. Specify protected and public routes
const protectedRoutes = ['/user_profile'];
const publicRoutes = ['/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  // const user = await getUserInfo({
  //   headers: {
  //     Cookie:
  //       'e1a70832e274b27da9c09bf0760bbdc833add86ab6b9837a9cef66036f02=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im12aWthQG1haWwuY29tIiwiZXhwIjoxNzIzMzMzMzM4fQ.dBM8o2fut--QZ8UTFydtEyYUVowc2SZQs23MxC8ui7DyXcTmqvHMZTsySjttuT4TQmOanV8IURi9acsNzNYuqA; 8f74f5ad8776849bff0aa55b4fd5e28ff2cc319c27ea74737db4684ddeed=eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgwLCJleHAiOjE3MjU5MjQ0Mzh9.sKwm1fjQ8fT4JBHJJs-Bnx7nu27Tt_b7HYh-srMefKwjxgw-_1a_alHGoKDS814Z; refresh-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzI0MDAzMTI0fQ.-c1hO3oxlkX79tfPr7ozJThLYpDlZQjKGGQ1qj4GIDQ; 2b737dd4ea518936df4461d1b3197edbfe03f731aaba03ee5c143f081472=eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5OGM1YzY2LWI2MDMtNDVlNy1hNmEwLWFkZmYyNTFlNzU3MyJ9.pypR5l_P3A3qDR0_0z29ecEhZvOQ0LVjNsNNjKD4elsRs_nVKMcH_QU9oHIpGzWc',
  //   },
  // });
  // console.log(user);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute) {
    // return NextResponse.redirect(new URL('/#auth', req.nextUrl));
    // console.log('user', user);
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && !req.nextUrl.pathname.startsWith('/dashboard')) {
    // return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
