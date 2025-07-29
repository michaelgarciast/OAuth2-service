import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      id: string;
      // Add other custom properties here
    } & DefaultSession['user'];
    accessToken?: string;
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    id: string;
    // Add other custom properties here
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the built-in JWT types
   */
  interface JWT {
    id: string;
    accessToken?: string;
  }
}
