import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  const handleSignIn = async (provider: string, options = {}) => {
    try {
      const result = await signIn(provider, {
        ...options,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error during sign in:', error);
      return { success: false, error };
    }
  };

  const handleSignOut = async () => {
    try {
      // Cerrar sesión en el servidor
      await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Cerrar sesión en la aplicación
      await signOut({ redirect: false });
      
      // Redirigir al login
      window.location.href = '/auth/signin';
      
      return { success: true };
    } catch (error) {
      console.error('Error during sign out:', error);
      return { success: false, error };
    }
  };

  return {
    session,
    isAuthenticated,
    isLoading,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
}

export function useRequireAuth(redirectUrl = '/auth/signin') {
  const { session, isAuthenticated, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isLoading, redirectUrl, router]);

  return { session, isAuthenticated, isLoading, signOut };
}
