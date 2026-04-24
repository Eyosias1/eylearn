import type { Session, User } from "@supabase/supabase-js"

export type AuthContextDTO = {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
  isAdmin: boolean
}

export type ProfileSettingsDTO = {
  email: string
  firstName: string
  lastName: string
  username: string
  productUpdates: string
  marketing: string
}
