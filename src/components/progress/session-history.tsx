import { cn } from "@/lib/utils"
import type { SessionRecord } from "@/types/progress"

interface Props {
  sessions: SessionRecord[]
}

export function SessionHistory({ sessions }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Session History</p>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">View All Records</button>
      </div>
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              {["Date", "Mode", "Subject", "Duration", "Cards", "Avg Conf"].map((h) => (
                <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors">
                <td className="px-3 py-2.5 text-muted-foreground">
                  {new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </td>
                <td className="px-3 py-2.5 font-medium">{s.mode}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{s.subjects.join(", ")}</td>
                <td className="px-3 py-2.5 tabular-nums text-muted-foreground">{s.durationMinutes}m</td>
                <td className="px-3 py-2.5 tabular-nums text-muted-foreground">{s.cardsReviewed}</td>
                <td className="px-3 py-2.5">
                  <span className={cn(
                    "text-xs font-semibold tabular-nums",
                    s.avgConfidence >= 80 ? "text-emerald-600 dark:text-emerald-400" :
                    s.avgConfidence >= 60 ? "text-yellow-600 dark:text-yellow-400" :
                    "text-red-600 dark:text-red-400",
                  )}>
                    {s.avgConfidence}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
