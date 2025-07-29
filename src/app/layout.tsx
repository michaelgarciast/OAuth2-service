// app/layout.tsx
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth/infrastructure/auth/nextauth.config'
import { Providers } from './providers'
import './globals.css'
import GlobalLoading from '@/app/components/ui/GlobalLoading'

export const metadata = {
  title: 'Portal de Autenticación',
  description: 'Sistema de autenticación',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const themeColor = '#ffffff'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="es" className="h-full bg-white">
      <body className="h-full">
        <Providers session={session}>
          <GlobalLoading>
            <main className="min-h-[calc(100vh-4rem)]">
              {children}
            </main>
          </GlobalLoading>
        </Providers>
      </body>
    </html>
  )
}