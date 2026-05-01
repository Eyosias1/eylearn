"use client"

import { useRef, useState, useTransition } from "react"
import { UploadCloud, CheckCircle2 } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImportDateRange } from "@/components/studyplan/import/import-date-range"
import { parseIcs } from "@/lib/studyplan/parse-ics"
import { importCalendarEvents } from "@/lib/actions/studyplan/calendar"
import { cn } from "@/lib/utils"
import type { CalendarEventInsert } from "@/types/studyplan"

type SortOrder = "asc" | "desc"
type Indexed = { event: CalendarEventInsert; idx: number }

function applyRange(rows: Indexed[], range: DateRange | undefined): Indexed[] {
  if (!range?.from) return rows
  const from = range.from.toISOString().split("T")[0]
  const to   = (range.to ?? range.from).toISOString().split("T")[0]
  return rows.filter(({ event: e }) => e.scheduledDate >= from && e.scheduledDate <= to)
}

function applySort(rows: Indexed[], order: SortOrder): Indexed[] {
  return [...rows].sort(({ event: a }, { event: b }) => {
    const cmp = a.scheduledDate.localeCompare(b.scheduledDate) || a.startTime.localeCompare(b.startTime)
    return order === "asc" ? cmp : -cmp
  })
}

interface Props { onClose: () => void }

export function ImportCalendarModal({ onClose }: Props) {
  const [allEvents, setAllEvents] = useState<CalendarEventInsert[]>([])
  const [fileName,  setFileName]  = useState<string | null>(null)
  const [dragging,  setDragging]  = useState(false)
  const [range,     setRange]     = useState<DateRange | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [year,      setYear]      = useState<string>("all")
  const [selected,  setSelected]  = useState<Set<number>>(new Set())
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  const years   = Array.from(new Set(allEvents.map(e => e.scheduledDate.slice(0, 4)))).sort((a, b) => b.localeCompare(a))
  const indexed = allEvents.map((event, idx) => ({ event, idx }))
  const visible = applySort(applyRange(indexed.filter(({ event: e }) => year === "all" || e.scheduledDate.startsWith(year)), range), sortOrder)
  const checked = visible.filter(({ idx }) => selected.has(idx))

  const allChecked  = visible.length > 0 && visible.every(({ idx }) => selected.has(idx))
  const someChecked = visible.some(({ idx }) => selected.has(idx)) && !allChecked

  function processFile(file: File) {
    setFileName(file.name)
    file.text().then(raw => {
      const parsed = parseIcs(raw)
      setAllEvents(parsed)
      setSelected(new Set(parsed.map((_, i) => i)))
    })
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.name.endsWith(".ics")) processFile(file)
  }

  function toggleOne(idx: number) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  function toggleAll() {
    setSelected(prev => {
      const next = new Set(prev)
      if (allChecked) visible.forEach(({ idx }) => next.delete(idx))
      else            visible.forEach(({ idx }) => next.add(idx))
      return next
    })
  }

  function handleImport() {
    startTransition(async () => {
      await importCalendarEvents(checked.map(({ event }) => event))
      onClose()
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl">
        <DialogHeader>
          <DialogTitle>Import Calendar</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Dropzone */}
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={cn(
              // layout
              "flex flex-col items-center justify-center gap-2",
              // sizing
              "min-h-[120px]",
              // spacing
              "p-6",
              // border
              "rounded-xl border-2 border-dashed",
              // animation
              "transition-colors",
              // hover
              "cursor-pointer",
              // conditional
              dragging
                ? "border-primary bg-primary/5"
                : fileName
                ? "border-emerald-500/50 bg-emerald-500/5"
                : "border-border hover:border-muted-foreground/50 hover:bg-muted/40",
            )}
          >
            {fileName ? (
              <>
                <CheckCircle2 className="size-8 text-emerald-500" />
                <p className="text-sm font-medium">{fileName}</p>
                <p className="text-xs text-muted-foreground">{allEvents.length} total events found</p>
              </>
            ) : (
              <>
                <UploadCloud className={cn("size-8", dragging ? "text-primary" : "text-muted-foreground")} />
                <div className="text-center">
                  <p className="text-sm font-medium">Drop your .ics file here</p>
                  <p className="text-xs text-muted-foreground mt-0.5">or <span className="text-foreground underline underline-offset-2">click to browse</span></p>
                </div>
                <p className="text-[11px] text-muted-foreground">Apple Calendar · Google Calendar · Outlook</p>
              </>
            )}
          </div>

          <input ref={inputRef} type="file" accept=".ics" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f) }} />

          {/* Filters + preview */}
          {allEvents.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImportDateRange range={range} onChange={setRange} />
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="h-8 w-28 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs">All years</SelectItem>
                      {years.map(y => (
                        <SelectItem key={y} value={y} className="text-xs">{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
                    <SelectTrigger className="h-8 w-36 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc"  className="text-xs">Date ascending</SelectItem>
                      <SelectItem value="desc" className="text-xs">Date descending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  {checked.length} of {visible.length} selected
                </p>
              </div>

              <ScrollArea className="h-72 rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">
                        <Checkbox
                          checked={someChecked ? "indeterminate" : allChecked}
                          onCheckedChange={toggleAll}
                        />
                      </TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Dur.</TableHead>
                      <TableHead>Title</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visible.map(({ event: e, idx }) => (
                      <TableRow
                        key={idx}
                        onClick={() => toggleOne(idx)}
                        className={cn(
                          "cursor-pointer",
                          !selected.has(idx) && "opacity-40",
                        )}
                      >
                        <TableCell onClick={(ev) => ev.stopPropagation()}>
                          <Checkbox checked={selected.has(idx)} onCheckedChange={() => toggleOne(idx)} />
                        </TableCell>
                        <TableCell className="tabular-nums">{e.scheduledDate}</TableCell>
                        <TableCell className="tabular-nums">{e.startTime}</TableCell>
                        <TableCell className="tabular-nums">{e.durationMinutes}m</TableCell>
                        <TableCell className="max-w-[160px] truncate">{e.title}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="default" onClick={onClose}>Cancel</Button>
          {checked.length > 0 && (
            <Button size="default" onClick={handleImport} disabled={isPending}>
              {isPending ? "Importing…" : `Import ${checked.length} event${checked.length !== 1 ? "s" : ""}`}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
