import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTopics, getSubjectById } from "@/lib/mock/mock-data"
import { cn } from "@/lib/utils"
import type { TopicHealth } from "@/types/study"

const healthConfig: Record<TopicHealth, { bar: string; label: string; labelColor: string; bg: string }> = {
  green:  { bar: "bg-emerald-500", label: "Strong", labelColor: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-50/40 dark:bg-emerald-950/30" },
  yellow: { bar: "bg-yellow-400",  label: "Fading", labelColor: "text-yellow-600 dark:text-yellow-400",   bg: "bg-yellow-50/40 dark:bg-yellow-950/30"  },
  red:    { bar: "bg-red-500",     label: "Weak",   labelColor: "text-red-600 dark:text-red-400",         bg: "bg-red-50/40 dark:bg-red-950/30"        },
}

export function TopicHealthBoard() {
  const topics = getTopics()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Topic Health</CardTitle>
        <p className="text-xs text-muted-foreground">Color shows memory strength per topic</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {topics.map((topic) => {
            const subject = getSubjectById(topic.subjectId)
            const config = healthConfig[topic.health]
            return (
              <div
                key={topic.id}
                className={cn(
                  "flex flex-col gap-2 rounded-lg border p-3",
                  "hover:brightness-95 transition-all cursor-default",
                  config.bg,
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-xs font-semibold", config.labelColor)}>{config.label}</span>
                  <span className="text-xs font-bold tabular-nums">{topic.retentionScore}%</span>
                </div>
                <div>
                  <p className="text-xs font-medium leading-tight">{topic.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{subject?.name}</p>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", config.bar)} style={{ width: `${topic.retentionScore}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
