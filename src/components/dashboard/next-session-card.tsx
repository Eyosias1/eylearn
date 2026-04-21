import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { NextSessionData } from "@/types/dashboard"

interface Props {
  session: NextSessionData
}

const statusLabel: Record<NextSessionData["status"], string> = {
  ready:   "Status: Ready",
  ahead:   "Ahead of Schedule",
  overdue: "Overdue",
}

const statusMessage: Record<NextSessionData["status"], string> = {
  ready:   "to maintain your streak.",
  ahead:   "This session is optional.",
  overdue: "This topic needs urgent review.",
}

export function NextSessionCard({ session }: Props) {
  return (
    <div className={cn(
      // layout
      "flex flex-col justify-between",
      // sizing
      "h-full min-h-[280px]",
      // spacing
      "p-7 gap-8",
      // colors
      "bg-foreground text-background",
      // border
      "rounded-xl",
      session.status === "overdue" && "border-2 border-destructive",
    )}>
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-60">
          {statusLabel[session.status]}
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold leading-[1.1] tracking-tight">
            Next Session:<br />{session.subject}
          </p>
          <p className="text-base opacity-80 leading-relaxed">
            Focus on &ldquo;{session.topic}&rdquo; for {session.durationMinutes} minutes{" "}
            {statusMessage[session.status]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{session.durationMinutes} min</Badge>
          <Badge variant="secondary">Active Recall</Badge>
          <Badge variant="secondary">Today</Badge>
        </div>
      </div>
      <Button variant="secondary" size="lg" className="w-full gap-2">
        <Play className="size-4" />
        Launch Session
      </Button>
    </div>
  )
}
