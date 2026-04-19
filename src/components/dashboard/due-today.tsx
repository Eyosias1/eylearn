import { Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getDueTopics, getSubjectById } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { TopicHealth } from "@/types/study"

const healthConfig: Record<TopicHealth, { badge: string; bar: string; label: string }> = {
  red:    { badge: "bg-red-100 text-red-700",         bar: "bg-red-500",     label: "Urgent" },
  yellow: { badge: "bg-yellow-100 text-yellow-700",   bar: "bg-yellow-400",  label: "Review" },
  green:  { badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500", label: "Due"    },
}

const urgencyOrder: Record<TopicHealth, number> = { red: 0, yellow: 1, green: 2 }

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function DueToday() {
  const topics = getDueTopics().sort((a, b) => urgencyOrder[a.health] - urgencyOrder[b.health])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-semibold">Due Today</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">{topics.length} topics need review</p>
        </div>
        <Button size="sm" disabled>
          <Play className="size-3.5 mr-1.5" />
          Start Session
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {topics.map((topic) => {
          const subject = getSubjectById(topic.subjectId)
          const config = healthConfig[topic.health]
          return (
            <div key={topic.id} className="flex items-center gap-4 rounded-lg border px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{topic.name}</p>
                  <Badge className={cn("text-xs font-medium border-0 shrink-0", config.badge)}>
                    {config.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{subject?.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", config.bar)} style={{ width: `${topic.retentionScore}%` }} />
                  </div>
                  <span className="text-xs font-medium tabular-nums shrink-0">{topic.retentionScore}%</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">Last reviewed</p>
                <p className="text-xs font-medium mt-0.5">{formatDate(topic.lastReviewedAt)}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
