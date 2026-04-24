import { Suspense } from 'react'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { getAuthContext } from '@/lib/data/profile'
import { AuthProvider } from '@/providers/auth-provider'

async function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const serverAuth = await getAuthContext()

  return <AuthProvider serverAuth={serverAuth}>{children}</AuthProvider>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Suspense>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </Suspense>
    </ThemeProvider>
  )
}
