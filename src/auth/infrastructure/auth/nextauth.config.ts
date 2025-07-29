import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../prisma/prismaClient';

// Tiempo de expiración en segundos
const THIRTY_DAYS = 30 * 24 * 60 * 60;

export const authOptions: AuthOptions = {
  // Adapter
  adapter: PrismaAdapter(prisma),
  // Providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  // Pages
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: THIRTY_DAYS, // 30 días de inactividad máxima
    updateAge: 24 * 60 * 60, // Actualiza la sesión cada 24 horas
  },
  // JWT configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: THIRTY_DAYS, // 30 días para el JWT
  },
  // Callbacks
  callbacks: {
    async jwt({ token, user, account }) {
      // Pass user ID to token
      if (user) {
        token.id = user.id;
      }
      // Pass access token to JWT token
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass user ID to session
      if (token.id) {
        session.user.id = token.id as string;
      }
      // Add access token directly to session
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If accessing signin without callbackUrl, redirect to dashboard
      if (url === '/signin' && !url.includes('?callbackUrl=')) {
        return baseUrl + '/dashboard';
      }
      return url;
    }
  },
  // Secret
  secret: process.env.NEXTAUTH_SECRET,
  // Debug
  debug: process.env.NODE_ENV === 'development',
  // Security
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};