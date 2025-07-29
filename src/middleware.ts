import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const logs = ['=== Middleware ejecutándose ==='];
  const { pathname } = request.nextUrl;
  logs.push(`Ruta actual: ${pathname}`);

  //token de autenticación
  const token = await getToken({ req: request });
  logs.push(`Token de autenticación: ${token ? 'Presente' : 'No presente'}`);

  // Rutas públicas que no requieren autenticación
  const publicViews = ['/home', '/motos', '/contacto'];
  const publicPaths = ['/signin', '/signout', ...publicViews];
  const isPublicPath =
    publicPaths.some(path => pathname.startsWith(path)) || pathname.startsWith('/public');
  logs.push(`¿Es ruta pública?: ${isPublicPath}`);

  // Si el usuario está autenticado y está en la página de inicio de sesión, redirigir al dashboard
  if (token && pathname === '/signin') {
    logs.push('Redirigiendo usuario autenticado a /dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si no está autenticado y no es una ruta pública, redirigir a signin
  if (!token && !isPublicPath) {
    logs.push('Redirigiendo a página de inicio de sesión');
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  logs.push('Continuando con la solicitud normalmente');
  return NextResponse.next();
}

// Configuración de rutas protegidas
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api/auth|signout).*)'],
};
