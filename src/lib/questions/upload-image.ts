import { createClient } from "@/lib/supabase/client"

const BUCKET = "question-images"

export async function uploadQuestionImage(file: File): Promise<string> {
  const supabase = createClient()
  const ext  = file.name.split(".").pop()
  const path = `${Date.now()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file)
  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteQuestionImage(url: string): Promise<void> {
  const supabase = createClient()
  const path = url.split(`${BUCKET}/`)[1]
  if (!path) return
  await supabase.storage.from(BUCKET).remove([path])
}
