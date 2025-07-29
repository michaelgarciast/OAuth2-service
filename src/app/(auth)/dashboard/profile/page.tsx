import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/infrastructure/auth/nextauth.config';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="max-w-md mx-auto mt-4 sm:mt-10 px-4 sm:px-0 bg-white rounded-lg shadow-sm">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-6 sm:py-8 text-center rounded-t-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Perfil de Usuario</h1>
      </div>

      {/* Contenido principal */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col items-center">
          {user?.image && (
            <div className="relative mb-4 sm:mb-6">
              <Image
                src={user.image}
                alt="Avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg object-cover"
                width={96}
                height={96}
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          )}

          <div className="w-full space-y-4 sm:space-y-6">
            {/* Campo Nombre */}
            <div className="flex items-center space-x-3 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-1 sm:mb-2">
                  <span className="block text-sm font-medium text-gray-500">Nombre: </span>
                  <span className="text-gray-900 font-medium">{user?.name || '-'}</span>
                </div>
              </div>
            </div>

            {/* Campo Email */}
            <div className="flex items-center space-x-3 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-1 sm:mb-2">
                  <span className="block text-sm font-medium text-gray-500">Email: </span>
                  <span className="text-gray-900 font-medium">{user?.email || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
