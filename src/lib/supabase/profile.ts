import 'server-only'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import type { ProfileSettingsDTO, AuthContextDTO } from '@/types/profile'

export async function getProfileForSettings(): Promise<ProfileSettingsDTO | null> {
  const supabase = createClient(await cookies())

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('first_name, last_name, username, product_updates, marketing')
    .eq('id', user.id)
    .maybeSingle()

  if (error || !data) return null

  return {
    email: user.email ?? '',
    firstName: data.first_name ?? '',
    lastName: data.last_name ?? '',
    username: data.username ?? '',
    productUpdates: data.product_updates ?? 'all',
    marketing: data.marketing ?? 'off',
  }
}

export async function getAuthContext(): Promise<AuthContextDTO> {
  const supabase = createClient(await cookies())

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      user: null,
      session: null,
      isAuthenticated: false,
      isAdmin: false,
    }
  }

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  return {
    user,
    session: null,
    isAuthenticated: true,
    isAdmin: data?.role === 'admin',
  }
}
