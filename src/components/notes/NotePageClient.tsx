'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Eye, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { NoteRenderer } from './NoteRenderer'
import { saveNote } from '@/lib/actions/save-note'
import { renderNote } from '@/lib/actions/render-note'

interface NotePageClientProps {
  slug: string
  html: string
  rawContent: string
  children: React.ReactNode
}

export function NotePageClient({ slug, html, rawContent, children }: NotePageClientProps) {
  const [raw, setRaw] = useState(false)
  const [content, setContent] = useState(rawContent)
  const [renderedHtml, setRenderedHtml] = useState(html)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const dirty = content !== rawContent
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // keep preview in sync when server sends fresh html after save
  useEffect(() => { setRenderedHtml(html) }, [html])

  // auto-resize textarea to content height
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [content, raw])

  async function handleTogglePreview() {
    if (raw) {
      // always sync preview: re-render if dirty, restore original if not
      const newHtml = dirty ? await renderNote(content) : html
      setRenderedHtml(newHtml)
    }
    setRaw(r => !r)
  }

  function handleSave() {
    startTransition(async () => {
      await saveNote(slug, content)
      router.refresh()
    })
  }

  return (
    <>
      {/* header with toggle anchored top-right */}
      <div className="relative">
        {children}
        <div className="absolute top-0 right-0 flex items-center gap-1">
          {dirty && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleSave}
              disabled={isPending}
              title="Save changes"
              className="text-muted-foreground"
            >
              <Save className="size-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="lg"
            onClick={handleTogglePreview}
            title={raw ? 'Switch to preview' : 'Edit raw markdown'}
            className="text-muted-foreground"
          >
            {raw ? <Eye className="size-5" /> : <Pencil className="size-5" />}
          </Button>
        </div>
      </div>

      {/* content */}
      <div className="mt-10">
        {raw
          ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={e => setContent(e.target.value)}
              className={cn(
                // layout
                "w-full resize-none overflow-hidden",
                // typography
                "text-sm leading-relaxed",
                // font
                "font-[family-name:var(--font-mono)]",
                // colors
                "bg-transparent text-foreground",
                // border
                "outline-none",
              )}
              spellCheck={false}
            />
          )
          : <NoteRenderer html={renderedHtml} />
        }
      </div>
    </>
  )
}
