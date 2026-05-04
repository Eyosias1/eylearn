"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QUESTION_TYPES } from "@/types/QuestionType"
import type { Subtopic } from "@/types/SubtopicType"
import type { QuestionType } from "@/types/QuestionType"

type Props = {
  subtopics:          Subtopic[]
  filter:             string | null
  typeFilter:         QuestionType | null
  onFilterChange:     (v: string | null) => void
  onTypeFilterChange: (v: QuestionType | null) => void
  onAddClick:         () => void
}

export function QuestionsGridFilters({ subtopics, filter, typeFilter, onFilterChange, onTypeFilterChange, onAddClick }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Select value={filter ?? "all"} onValueChange={(v) => onFilterChange(v === "all" ? null : v)}>
        <SelectTrigger className="w-48 h-9 text-sm rounded-sm px-3.5">
          <SelectValue placeholder="All subtopics" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="pl-3 py-2 cursor-pointer">All subtopics</SelectItem>
          {subtopics.map((s) => (
            <SelectItem key={s.id} value={s.id} className="pl-3 py-2 cursor-pointer">{s.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-1">
        {QUESTION_TYPES.map((t) => (
          <Button key={t.value} size="sm"
            variant={typeFilter === t.value ? "secondary" : "ghost"}
            onClick={() => onTypeFilterChange(typeFilter === t.value ? null : t.value)}
            className="h-9 rounded-sm text-sm px-3"
          >
            {t.label}
          </Button>
        ))}
      </div>
      <Button size="sm" variant="outline" onClick={onAddClick}>
        <Plus className="size-3.5" />Add Question
      </Button>
    </div>
  )
}
