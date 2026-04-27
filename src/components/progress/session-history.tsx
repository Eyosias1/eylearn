import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
      <Table variant="ruled">
        <TableHeader>
          <TableRow>
            {["Date", "Mode", "Subject", "Duration", "Cards", "Avg Conf"].map((h) => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="text-muted-foreground">
                {new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </TableCell>
              <TableCell className="font-medium">{s.mode}</TableCell>
              <TableCell className="text-muted-foreground">{s.subjects.join(", ")}</TableCell>
              <TableCell className="tabular-nums text-muted-foreground">{s.durationMinutes}m</TableCell>
              <TableCell className="tabular-nums text-muted-foreground">{s.cardsReviewed}</TableCell>
              <TableCell>
                <span className={cn(
                  // typography
                  "text-xs font-semibold tabular-nums",
                  // conditional
                  s.avgConfidence >= 80 ? "text-emerald-600 dark:text-emerald-400" :
                  s.avgConfidence >= 60 ? "text-yellow-600 dark:text-yellow-400" :
                  "text-red-600 dark:text-red-400",
                )}>
                  {s.avgConfidence}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
