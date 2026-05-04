"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SetCard } from "@/components/library/exam-sets/SetCard"
import { CreateSetDialog } from "@/components/library/exam-sets/CreateSetDialog"
import { useQuestionsStore } from "@/providers/questions-store-provider"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/SubjectType"

type Props = {
  subjects: Subject[]
}

export function SetsOverview({ subjects }: Props) {
  const { sets, addSet, removeSet } = useQuestionsStore()
  const [open, setOpen]                     = useState(false)
  const [subjectFilter, setSubjectFilter]   = useState<string | null>(null)

  const filtered = subjectFilter ? sets.filter((s) => s.subject_id === subjectFilter) : sets

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={subjectFilter === null ? "secondary" : "ghost"}
            onClick={() => setSubjectFilter(null)}
            className="h-9 rounded-sm text-sm px-3"
          >
            All
          </Button>
          <Select value={subjectFilter ?? "all"} onValueChange={(v) => setSubjectFilter(v === "all" ? null : v)}>
            <SelectTrigger className="w-48 h-9 text-sm rounded-sm px-3.5">
              <SelectValue placeholder="All subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="pl-3 py-2 cursor-pointer">All subjects</SelectItem>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id} className="pl-3 py-2 cursor-pointer">{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          <Plus className="size-3.5" />
          New Set
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center min-h-48 rounded-xl border border-dashed text-muted-foreground">
          <p className="text-sm">
            {sets.length === 0 ? "No sets yet. Create one to group questions into exams or problem sets." : "No sets match this filter."}
          </p>
        </div>
      ) : (
        <div className={cn("grid grid-cols-1 gap-3", "sm:grid-cols-2", "lg:grid-cols-3")}>
          {filtered.map((s) => (
            <SetCard key={s.id} set={s} subject={subjects.find((sub) => sub.id === s.subject_id)} onDelete={removeSet} />
          ))}
        </div>
      )}

      <CreateSetDialog
        open={open}
        onOpenChange={setOpen}
        subjects={subjects}
        onCreate={(set) => addSet({ ...set, question_count: 0 })}
      />
    </div>
  )
}
