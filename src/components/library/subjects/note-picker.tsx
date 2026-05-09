"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getNotesForPicker } from "@/lib/actions/subtopics"

type NoteOption = { id: string; title: string; subject: string; slug: string }

interface Props {
  onSelect: (note: NoteOption) => void
  onCancel: () => void
}

export function NotePicker({ onSelect, onCancel }: Props) {
  const [notes,  setNotes]  = useState<NoteOption[]>([])
  const [query,  setQuery]  = useState("")

  useEffect(() => {
    getNotesForPicker().then(setNotes)
  }, [])

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(query.toLowerCase()) ||
    n.subject.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input
          autoFocus
          placeholder="Search notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8 h-8 text-xs"
        />
      </div>
      <div className="flex flex-col max-h-48 overflow-y-auto rounded-md border">
        {filtered.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">No notes found</p>
        ) : filtered.map((n) => (
          <Button
            variant="ghost"
            key={n.id}
            onClick={() => onSelect(n)}
            className={cn(
              // layout
              "flex flex-col items-start text-left",
              // sizing
              "w-full h-auto",
              // spacing
              "px-3 py-2",
              // border
              "border-b last:border-b-0 rounded-none",
              // hover
              "hover:bg-muted/50 transition-colors",
            )}
          >
            <p className="text-xs font-medium truncate w-full">{n.title}</p>
            <p className="text-[10px] text-muted-foreground">{n.subject}</p>
          </Button>
        ))}
      </div>
      <Button variant="ghost" onClick={onCancel} className="text-xs text-muted-foreground hover:text-foreground h-auto px-0 flex items-center gap-1">
        <X className="size-3" /> Cancel
      </Button>
    </div>
  )
}
