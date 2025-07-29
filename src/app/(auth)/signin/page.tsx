'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import GlobalLoading from '@/app/components/ui/GlobalLoading';

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  // Obtener callbackUrl sólo en cliente
  const callbackUrl =
    typeof window !== 'undefined'
      ? new URL(window.location.href).searchParams.get('callbackUrl') || '/dashboard'
      : '/dashboard';

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await signIn('github', { callbackUrl });
    } catch (error) {
      console.error('Error signing in:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <GlobalLoading>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Cargando...</h1>
          </div>
        </div>
      </GlobalLoading>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Columna Izquierda - Imagen de Fondo */}
      <div className="flex-1 relative overflow-hidden">
        {/* Imagen de fondo con overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1655806810415-74ca9a8430a9?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        />

        {/* Contenido de texto */}
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Administrador de
            <span className="text-[#00FF75] block">Motocicletas</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
            Gestiona tu flota de motocicletas de manera eficiente. Control y creacion de marcas y
            motos.
          </p>

          {/* Características destacadas */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#00FF75] rounded-full"></div>
              <span className="text-gray-300">Control y creacion de motos</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#00FF75] rounded-full"></div>
              <span className="text-gray-300">Gestión y creacion de marcas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#00FF75] rounded-full"></div>
              <span className="text-gray-300">Gestión y creacion de banners publicitarios</span>
            </div>
          </div>
        </div>

        {/* Efectos decorativos */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-[#00FF75] rounded-full opacity-20"></div>
        <div className="absolute bottom-40 right-40 w-16 h-16 border border-white rounded-full opacity-10"></div>
      </div>

      {/* Columna Derecha - Formulario de Login */}
      <div className="w-full max-w-md bg-white flex flex-col justify-center p-12 shadow-2xl">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#00FF75] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h2>
          <p className="text-gray-600">Accede a tu panel de administración</p>
        </div>

        {/* GitHub Login Button */}
        <button
          onClick={handleGithubLogin}
          className="w-full bg-white border-2 border-gray-200 hover:border-[#00FF75] text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 hover:shadow-lg group transform hover:scale-105"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.337-3.369-1.337-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            />
          </svg>
          <span className="group-hover:text-[#00FF75] transition-colors">
            Iniciar sesión con GitHub
          </span>
        </button>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-gray-500 text-sm">o</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            Al iniciar sesión, aceptas nuestros{' '}
            <a
              href="#"
              className="text-gray-700 hover:underline"
            >
              términos de servicio
            </a>{' '}
            y{' '}
            <a
              href="#"
              className="text-gray-700 hover:underline"
            >
              política de privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
