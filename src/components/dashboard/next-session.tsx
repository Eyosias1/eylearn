import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getUpcomingSessions } from "@/lib/mock/mock-data"
import { cn } from "@/lib/utils"

function formatSession(dateStr: string): { day: string; time: string } {
  const d = new Date(dateStr)
  const day = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  return { day, time }
}

const barColors: Record<string, string> = {
  Biology:     "bg-emerald-400",
  Chemistry:   "bg-blue-400",
  Mathematics: "bg-violet-400",
}

function barColor(subjects: string[]): string {
  return barColors[subjects[0]] ?? "bg-muted-foreground"
}

export function NextSession() {
  const sessions = getUpcomingSessions()

  return (
    <Card className="flex-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Upcoming Sessions</CardTitle>
        <p className="text-xs text-muted-foreground">AI-scheduled study blocks</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {sessions.map((session, i) => {
          const { day, time } = formatSession(session.scheduledFor)
          return (
            <div key={session.id} className={cn("flex items-center gap-3", i === 0 && "opacity-100", i > 0 && "opacity-70")}>
              <div className={cn("w-0.5 self-stretch rounded-full shrink-0", barColor(session.subjects))} />
              <div className="flex flex-1 items-center justify-between min-w-0">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-medium">{session.subjects.join(", ")}</p>
                  <p className="text-xs text-muted-foreground truncate">{session.topics.join(" · ")}</p>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0 ml-4">
                  <p className="text-xs font-medium">{day} · {time}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    <span>{session.estimatedMinutes} min</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
