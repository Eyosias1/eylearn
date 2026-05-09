import { Suspense } from 'react'
import { ThemeProvider } from '@/providers/theme-provider'
import { getAuthContext } from '@/lib/data/profile'
import { AssistantProvider } from '@/providers/assistant-provider'
import { AuthProvider } from '@/providers/auth-provider'
import { BreadcrumbProvider } from '@/providers/breadcrumb-provider'

async function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const serverAuth = await getAuthContext()

  return (
    <AuthProvider serverAuth={serverAuth}>
      <AssistantProvider>
        <BreadcrumbProvider>{children}</BreadcrumbProvider>
      </AssistantProvider>
    </AuthProvider>
  )
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
