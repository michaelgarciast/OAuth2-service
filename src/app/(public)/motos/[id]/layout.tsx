'use client';

import { ReactNode } from 'react';

export default function MotorcycleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
