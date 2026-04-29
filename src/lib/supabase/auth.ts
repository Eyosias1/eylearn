import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function getAuthenticatedSupabase() {
  const supabase = createClient(await cookies())
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    redirect('/sign-in')
  }

  return { supabase, userId: data.user.id }
}
