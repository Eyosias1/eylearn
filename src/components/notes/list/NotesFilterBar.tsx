"use client"

import React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { NotesSortKey } from "@/components/notes/list/NotesShell"

const trigger = "!h-11 rounded-md bg-muted/50 border-border/50 hover:bg-muted text-sm font-medium"
const content = "rounded-md min-w-[160px]"
const item    = "py-1.5 px-2.5 text-sm rounded-sm"

interface Props {
  query:      string
  subject:    string
  status:     string
  difficulty: string
  sort:       NotesSortKey
  subjects:   string[]
  action:     React.ReactNode
  onQuery:      (v: string)       => void
  onSubject:    (v: string)       => void
  onStatus:     (v: string)       => void
  onDifficulty: (v: string)       => void
  onSort:       (v: NotesSortKey) => void
}

export function NotesFilterBar({
  query, subject, status, difficulty, sort, subjects, action,
  onQuery, onSubject, onStatus, onDifficulty, onSort,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input
          placeholder="Search notes…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          className="pl-8 h-11 rounded-md text-sm"
        />
      </div>

      <Select value={subject} onValueChange={onSubject}>
        <SelectTrigger className={trigger}><SelectValue placeholder="All subjects" /></SelectTrigger>
        <SelectContent className={content} position="popper">
          <SelectItem className={item} value="all">All subjects</SelectItem>
          {subjects.map((s) => <SelectItem className={item} key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={onStatus}>
        <SelectTrigger className={trigger}><SelectValue placeholder="All statuses" /></SelectTrigger>
        <SelectContent className={content} position="popper">
          <SelectItem className={item} value="all">All statuses</SelectItem>
          <SelectItem className={item} value="learning">Learning</SelectItem>
          <SelectItem className={item} value="reviewing">Reviewing</SelectItem>
          <SelectItem className={item} value="mastered">Mastered</SelectItem>
        </SelectContent>
      </Select>

      <Select value={difficulty} onValueChange={onDifficulty}>
        <SelectTrigger className={trigger}><SelectValue placeholder="All difficulties" /></SelectTrigger>
        <SelectContent className={content} position="popper">
          <SelectItem className={item} value="all">All difficulties</SelectItem>
          <SelectItem className={item} value="easy">Easy</SelectItem>
          <SelectItem className={item} value="medium">Medium</SelectItem>
          <SelectItem className={item} value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={(v) => onSort(v as NotesSortKey)}>
        <SelectTrigger className={trigger}><SelectValue /></SelectTrigger>
        <SelectContent className={content} position="popper">
          <SelectItem className={item} value="recent">Most recent</SelectItem>
          <SelectItem className={item} value="az">A to Z</SelectItem>
          <SelectItem className={item} value="difficulty">By difficulty</SelectItem>
        </SelectContent>
      </Select>

      <div className="ml-auto">{action}</div>
    </div>
  )
}
