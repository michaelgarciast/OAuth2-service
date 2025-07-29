import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/infrastructure/auth/nextauth.config';
import { redirect } from 'next/navigation';
import Sidebar from '@/app/components/layout/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex justify-center items-start bg-white p-2 sm:p-4 md:p-6 overflow-y-auto">
        <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
