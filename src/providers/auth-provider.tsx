"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"

import { createClient } from "@/lib/supabase/client"
import type { AuthContextDTO } from "@/types/profile"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
  serverAuth,
}: {
  children: ReactNode
  serverAuth: AuthContextDTO
}) {
  const [user, setUser] = useState<User | null>(serverAuth.user)
  const [session, setSession] = useState<Session | null>(serverAuth.session)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setIsLoading(false)
    router.refresh()
    router.push("/sign-in")
  }, [supabase, router])

  const value = useMemo(
    () => ({
      user,
      session,
      isLoading,
      isAuthenticated: Boolean(session),
      isAdmin: serverAuth.isAdmin,
      signOut,
    }),
    [user, session, isLoading, serverAuth.isAdmin, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
