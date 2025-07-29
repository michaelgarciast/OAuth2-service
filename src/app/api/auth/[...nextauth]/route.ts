import { authOptions } from '@/auth/infrastructure/auth/nextauth.config';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };