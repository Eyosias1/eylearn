'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface NewNoteInputProps {
  onCreate: (title: string) => Promise<void>
  onCancel: () => void
}

export function NewNoteInput({ onCreate, onCancel }: NewNoteInputProps) {
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const committedRef = useRef(false)

  async function commit() {
    if (committedRef.current) return
    const trimmed = title.trim()
    if (!trimmed) return onCancel()
    committedRef.current = true
    setSaving(true)
    try {
      await onCreate(trimmed)
      onCancel()
    } catch {
      committedRef.current = false
      setSaving(false)
    }
  }

  return (
    <div className={cn("px-3 py-1")}> 
      <Input
        autoFocus
        value={title}
        disabled={saving}
        placeholder="Note title"
        onChange={event => setTitle(event.target.value)}
        onBlur={() => onCancel()}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault()
            void commit()
          }
          if (event.key === 'Escape') {
            event.preventDefault()
            onCancel()
          }
        }}
        className={cn("h-8 text-sm")}
      />
    </div>
  )
}
