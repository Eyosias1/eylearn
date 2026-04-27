"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { PerfFilter, SortKey, DateRange } from "@/components/progress/retrospective-full"

const trigger = "h-9 rounded-md bg-muted/50 border-border/50 hover:bg-muted text-sm font-medium"
const content = "rounded-md min-w-[180px]"
const item    = "py-1.5 px-2.5 text-sm rounded-sm"

interface Props {
  query:     string
  sort:      SortKey
  subject:   string
  perf:      PerfFilter
  dateRange: DateRange
  subjects:  string[]
  onQuery:     (v: string)     => void
  onSort:      (v: SortKey)    => void
  onSubject:   (v: string)     => void
  onPerf:      (v: PerfFilter) => void
  onDateRange: (v: DateRange)  => void
}

export function FilterBar({
  query, sort, subject, perf, dateRange, subjects,
  onQuery, onSort, onSubject, onPerf, onDateRange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input
          placeholder="Search topic or subject…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          className="pl-8 h-9 rounded-md text-sm"
        />
      </div>

      <Select value={subject} onValueChange={onSubject}>
        <SelectTrigger className={trigger}><SelectValue placeholder="All subjects" /></SelectTrigger>
        <SelectContent className={content} position="popper">
          <SelectItem className={item} value="all">All subjects</SelectItem>
          {subjects.map((s) => <SelectItem className={item} key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={perf} onValueChange={(v) => onPerf(v as PerfFilter)}>
        <SelectTrigger className={trigger}><SelectValue placeholder="All performance" /></SelectTrigger>
        <SelectContent className={content} position="popper">
          <SelectItem className={item} value="all">All performance</SelectItem>
          <SelectItem className={item} value="struggling">Struggling — under 50%</SelectItem>
          <SelectItem className={item} value="needs-work">Needs work — 50 to 69%</SelectItem>
          <SelectItem className={item} value="strong">Strong — 70% and above</SelectItem>
        </SelectContent>
      </Select>

      <Select value={dateRange} onValueChange={(v) => onDateRange(v as DateRange)}>
        <SelectTrigger className={trigger}><SelectValue /></SelectTrigger>
        <SelectContent className={content} position="popper">
          <SelectItem className={item} value="7">Last 7 days</SelectItem>
          <SelectItem className={item} value="15">Last 15 days</SelectItem>
          <SelectItem className={item} value="30">Last 30 days</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={(v) => onSort(v as SortKey)}>
        <SelectTrigger className={trigger}><SelectValue /></SelectTrigger>
        <SelectContent className={content} position="popper">
          <SelectItem className={item} value="recent">Most recent</SelectItem>
          <SelectItem className={item} value="weakest">Weakest first</SelectItem>
          <SelectItem className={item} value="strongest">Strongest first</SelectItem>
          <SelectItem className={item} value="name">A to Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
