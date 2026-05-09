"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function signIn(data: { email: string; password: string }) {
  const supabase = createClient(await cookies())

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signOut() {
  const supabase = createClient(await cookies())
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/")
}
