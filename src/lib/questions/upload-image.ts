import { createClient } from "@/lib/supabase/client"

const BUCKET = "question-images"

// Returns the storage path (e.g. "1234567890.jpg"), not a URL.
// Store this path in the DB — resolve to a signed URL only for display.
export async function uploadQuestionImage(file: File): Promise<string> {
  const supabase = createClient()
  const ext  = file.name.split(".").pop()
  const path = `${Date.now()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file)
  if (error) throw new Error(error.message)

  return path
}

// Accepts either a raw path ("1234567890.jpg") or a legacy public URL.
export function extractStoragePath(value: string): string {
  return value.includes(`${BUCKET}/`) ? value.split(`${BUCKET}/`)[1] : value
}

export async function deleteQuestionImage(value: string): Promise<void> {
  const supabase = createClient()
  const path = extractStoragePath(value)
  if (!path) return
  await supabase.storage.from(BUCKET).remove([path])
}

export async function getSignedImageUrl(value: string): Promise<string | null> {
  const supabase = createClient()
  const path = extractStoragePath(value)
  if (!path) return null
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 86400)
  if (error) console.error("[getSignedImageUrl] path:", path, "error:", error)
  return data?.signedUrl ?? null
}
