import { cn } from "@/lib/utils"

const RATING_DOT: Record<string, string> = {
  strong:  "bg-emerald-500",
  partial: "bg-yellow-400",
  poor:    "bg-red-500",
}

export type DayEntry = {
  subtopic:    string
  rating:      "strong" | "partial" | "poor"
  confidence?: number
}

interface Props {
  date:    string
  entries: DayEntry[]
}

export function HistoryDayDetail({ date, entries }: Props) {
  const label = new Date(date).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  })

  return (
    <div className={cn(
      // layout
      "flex flex-col",
      // spacing
      "gap-2 p-4",
      // border
      "rounded-xl",
      // colors
      "bg-muted/40",
    )}>
      <p className="text-xs font-semibold">{label}</p>
      <div className="flex flex-col gap-1.5">
        {entries.map((e, i) => (
          <div key={i} className={cn("flex items-center justify-between gap-2")}>
            <div className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full flex-none", RATING_DOT[e.rating])} />
              <span className="text-sm">{e.subtopic}</span>
            </div>
            {e.confidence != null && (
              <span className="text-xs text-muted-foreground">{e.confidence}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
