"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { ImagePlus, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { uploadQuestionImage, deleteQuestionImage, getSignedImageUrl } from "@/lib/questions/upload-image"

type Props = {
  value: string | null
  onChange: (url: string | null) => void
}

export function QuestionImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [imgState, setImgState]   = useState<{ url: string | null; resolvedFor: string | null }>({ url: null, resolvedFor: null })
  const inputRef                  = useRef<HTMLInputElement>(null)

  // Both fields updated together in the async callback — no synchronous setState in effects.
  const resolving = value !== null && imgState.resolvedFor !== value

  useEffect(() => {
    if (!value) return
    getSignedImageUrl(value).then((url) => {
      setImgState({ url, resolvedFor: value })
    })
  }, [value])

  const signedUrl = imgState.url

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const url = await uploadQuestionImage(file)
      onChange(url)
    } catch {
      setError("Upload failed — check your storage bucket.")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Image</p>
        {!value && <span className="text-xs text-muted-foreground/60">(optional)</span>}
      </div>
      <Input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {value && (
        <div className="relative rounded-lg overflow-hidden border bg-muted/30 min-h-24">
          {resolving && (
            <div className="flex items-center justify-center w-full min-h-24">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          )}
          {signedUrl && <Image src={signedUrl} alt="Question" width={800} height={224} unoptimized className="w-full object-contain max-h-56" />}
          {!resolving && !signedUrl && (
            <div className="flex flex-col items-center justify-center gap-2 w-full min-h-24">
              <p className="text-xs text-muted-foreground">Image not found</p>
              <Button
                type="button" variant="outline" size="sm"
                onClick={() => { onChange(null); inputRef.current?.click() }}
              >
                <ImagePlus className="size-3.5" />
                Replace
              </Button>
            </div>
          )}
          {!resolving && signedUrl && (
            <Button
              type="button" variant="secondary" size="icon"
              onClick={() => { deleteQuestionImage(value); onChange(null) }}
              className="absolute top-2 right-2 shadow-sm hover:bg-destructive hover:text-white transition-colors"
            >
              <Trash2 className="size-5" />
            </Button>
          )}
        </div>
      )}
      {!value && <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={cn(
          // layout
          "flex flex-col items-center justify-center gap-2 cursor-pointer",
          // sizing
          "w-full h-24",
          // border
          "rounded-lg border-2 border-dashed border-border",
          // colors
          "bg-muted/20 text-muted-foreground",
          // hover
          "hover:border-primary/40 hover:bg-muted/40 hover:text-foreground",
          // animation
          "transition-all duration-150",
          // disabled
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      >
        {uploading
          ? <Loader2 className="size-5 animate-spin" />
          : <ImagePlus className="size-5" />
        }
        <span className="text-xs font-medium">
          {uploading ? "Uploading..." : "Click to upload an image"}
        </span>
        {!uploading && <span className="text-xs opacity-60">PNG, JPG, WEBP</span>}
      </Button>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
