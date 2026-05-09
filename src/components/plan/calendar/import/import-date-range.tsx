"use client"

import { CalendarIcon, X } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

function formatRange(range: DateRange | undefined): string {
  if (!range?.from) return "Filter by date range"
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  if (!range.to || range.to.getTime() === range.from.getTime()) return fmt(range.from)
  return `${fmt(range.from)} → ${fmt(range.to)}`
}

interface Props {
  range: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
}

export function ImportDateRange({ range, onChange }: Props) {
  const hasRange = !!range?.from

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              // layout
              "flex items-center gap-2",
              // conditional
              hasRange && "border-primary text-primary",
            )}
          >
            <CalendarIcon className="size-3.5" />
            <span className="text-xs">{formatRange(range)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={onChange}
            numberOfMonths={2}
            captionLayout="dropdown"
            className="p-3"
          />
        </PopoverContent>
      </Popover>

      {hasRange && (
        <Button variant="ghost" size="icon-sm" onClick={() => onChange(undefined)}>
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  )
}
