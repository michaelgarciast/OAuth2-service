'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  HomeIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ArrowRightOnRectangleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  TruckIcon as TruckIconSolid,
} from '@heroicons/react/24/solid';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
    },
    {
      title: 'Motos',
      path: '/dashboard/motos',
      icon: TruckIcon,
      iconSolid: TruckIconSolid,
    },
    {
      title: 'Perfil',
      path: '/dashboard/profile',
      icon: UserCircleIcon,
      iconSolid: UserCircleIconSolid,
    },
  ];

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setIsSigningOut(false);
      setShowSignOutModal(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2.5 rounded-xl bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-all duration-200 active:scale-95"
          aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white z-40 transition-all duration-300 ease-in-out shadow-2xl border-r border-gray-700 ${
          isOpen ? 'w-72' : 'w-20'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className={`flex items-center space-x-3 ${!isOpen && 'lg:justify-center'}`}>
              {isOpen ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white">Mi Aplicación</h1>
                    <p className="text-xs text-gray-400">Panel de Control</p>
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
              )}
            </div>

            {/* Toggle button - hidden on mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              style={{ transition: 'transform 0.3s' }}
              aria-label={isOpen ? 'Colapsar sidebar' : 'Expandir sidebar'}
            >
              <ChevronLeftIcon
                className={`h-4 w-4 text-gray-400 transform transition-transform duration-300 ${
                  !isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {menuItems.map(item => {
                const isActive = pathname === item.path;
                const Icon = isActive ? item.iconSolid : item.icon;

                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={closeMobileMenu}
                      className={`group flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                      )}

                      <Icon className="h-5 w-5 flex-shrink-0" />

                      {isOpen && <span className="ml-3 truncate">{item.title}</span>}

                      {/* Tooltip for collapsed state */}
                      {!isOpen && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap border border-gray-600 shadow-lg">
                          {item.title}
                          <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45 border-l border-b border-gray-600"></div>
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User section - botón cerrar sesión al fondo */}
          <div className="border-t border-gray-700 mt-auto">
            <div className="px-2 pb-4">
              <button
                onClick={() => setShowSignOutModal(true)}
                className={`group w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-gray-300 cursor-pointer hover:text-red-400 hover:bg-red-500/10 ${
                  !isOpen && 'justify-center'
                }`}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="ml-3">Cerrar Sesión</span>}
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap border border-gray-600 shadow-lg">
                    Cerrar Sesión
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45 border-l border-b border-gray-600"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSignOutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-gray-800 animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">Cerrar Sesión</h2>
            <p className="text-gray-600 text-center mb-6">
              ¿Estás seguro de que deseas cerrar la sesión? También se cerrará la sesión de GitHub.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOutModal(false)}
                disabled={isSigningOut}
                className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSigningOut ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Cerrando...
                  </>
                ) : (
                  'Cerrar Sesión'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
