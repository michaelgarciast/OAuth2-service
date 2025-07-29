'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              MiApp
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/motos"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Motos
              </Link>
              <Link
                href="/contacto"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Login Button Desktop */}
          <div className="hidden md:block">
            <Link
              href="/signin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block"
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMenuOpen ? (
                // Hamburger icon
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                // Close icon
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/servicios"
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/contacto"
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <div className="pt-3 pb-2">
              <Link
                href="/signin"
                className="w-full inline-block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
