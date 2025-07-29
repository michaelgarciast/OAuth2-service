'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export default function SignOutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/' });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Cerrando sesión...</h1>
        <p>Serás redirigido en un momento.</p>
      </div>
    </div>
  );
}
