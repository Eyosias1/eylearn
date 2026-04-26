'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface NewFolderInputProps {
  onCreate: (name: string) => Promise<void>
  onCancel: () => void
}

export function NewFolderInput({ onCreate, onCancel }: NewFolderInputProps) {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const committedRef = useRef(false)

  async function commit() {
    if (committedRef.current) return
    const trimmed = name.trim()
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
        value={name}
        disabled={saving}
        placeholder="Folder name"
        onChange={event => setName(event.target.value)}
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
