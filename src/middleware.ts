import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASSWORD;

  // Si pas de creds configures cote serveur, on laisse passer (utile en dev local)
  if (!expectedUser || !expectedPass) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];

    try {
      const [user, pwd] = atob(authValue).split(':');

      if (user === expectedUser && pwd === expectedPass) {
        return NextResponse.next();
      }
    } catch {
      // En-tete Authorization malforme : on retombe sur le 401 ci-dessous
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
  // Protege tout, y compris les routes /api, sauf les assets statiques.
  // Le navigateur renvoie automatiquement les identifiants sur les appels
  // same-origin une fois l'authentification passee.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)',
  ],
};
