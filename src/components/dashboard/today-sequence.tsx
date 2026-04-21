import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TodaySession } from "@/types/dashboard"

interface RowProps {
  session: TodaySession
}

function SequenceRow({ session }: RowProps) {
  return (
    <div className={cn(
      // layout
      "flex items-center gap-3",
      // spacing
      "rounded-lg px-3 py-2",
      // conditional
      session.inProgress && "bg-primary/5 border border-primary/20",
      session.completed && "opacity-50",
    )}>
      {session.completed
        ? <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
        : session.inProgress
          ? <Loader2 className="size-4 shrink-0 text-primary animate-spin" />
          : <Circle className="size-4 shrink-0 text-muted-foreground" />
      }
      <div className="flex flex-1 items-center justify-between min-w-0">
        <div className="min-w-0">
          <p className={cn("text-sm font-medium leading-none", session.completed && "line-through")}>
            {session.subject}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{session.topic}</p>
        </div>
        <p className="text-xs text-muted-foreground shrink-0 ml-3">{session.time}</p>
      </div>
    </div>
  )
}

interface Props {
  sessions: TodaySession[]
}

export function TodaySequence({ sessions }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-semibold">Today&apos;s Sequence</CardTitle>
          <p className="text-xs text-muted-foreground">{sessions.length} sessions planned</p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs h-7">Adjust Plan</Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        {sessions.length === 0
          ? <p className="text-sm text-muted-foreground text-center py-4">No sessions planned today</p>
          : sessions.map((s) => <SequenceRow key={s.id} session={s} />)
        }
      </CardContent>
    </Card>
  )
}
