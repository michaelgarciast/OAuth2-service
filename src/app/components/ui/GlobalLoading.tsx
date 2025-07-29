'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const GlobalLoading = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Listen for route change events
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    // Clean up
    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, [pathname]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-indigo-500 border-t-transparent"></div>
            <p className="text-white font-medium">Cargando...</p>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default GlobalLoading;