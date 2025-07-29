import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/infrastructure/auth/nextauth.config';
import { prisma } from '@/auth/infrastructure/prisma/prismaClient';

// Nueva función para obtener el total de motos
async function getTotalMotos() {
  return await prisma.moto.count();
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const totalMotos = await getTotalMotos();

  if (!session) {
    return null; // El layout ya redirigirá al login
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Bienvenido al Panel de Control</h1>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card de total de motos */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-200">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9V7a5 5 0 1110 0v2m-1 4v2a3 3 0 11-6 0v-2"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalMotos}</div>
            <div className="text-gray-500 mt-1 text-lg">Motos creadas</div>
          </div>
        </div>
      </div>
    </>
  );
}
