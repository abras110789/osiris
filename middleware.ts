import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASSWORD;

  // Si pas de creds configurés côté serveur, on laisse passer (utile en dev local)
  if (!expectedUser || !expectedPass) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === expectedUser && pwd === expectedPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Osiris"',
    },
  });
}

export const config = {
  // Protège tout sauf les assets statiques et les routes Next internes
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
