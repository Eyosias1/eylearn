"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { graphEdges, getGraphNodes } from "@/lib/progress/graph-data"
import { cn } from "@/lib/utils"
import type { GraphNode } from "@/types/graph"
import type { TopicHealth } from "@/types/study"

const TODAY = "2026-04-19"
const healthBar: Record<TopicHealth, string> = {
  green: "bg-emerald-500", yellow: "bg-yellow-400", red: "bg-red-500",
}
const healthDot: Record<TopicHealth, string> = {
  green: "bg-emerald-500", yellow: "bg-yellow-400", red: "bg-red-500",
}

function daysAgo(d: string) {
  const n = Math.floor((new Date(TODAY).getTime() - new Date(d).getTime()) / 86400000)
  return n === 0 ? "Today" : n === 1 ? "Yesterday" : `${n} days ago`
}
function dueLabel(d: string) {
  const n = Math.floor((new Date(d).getTime() - new Date(TODAY).getTime()) / 86400000)
  if (n < 0) return "Overdue ⚠️"
  if (n === 0) return "Today"
  return `In ${n} day${n > 1 ? "s" : ""}`
}

interface Props {
  node: GraphNode | null
  onClose: () => void
  onSelectNode: (id: string) => void
}

export function TopicSidePanel({ node, onClose, onSelectNode }: Props) {
  const allNodes = getGraphNodes()
  const relatedIds = node
    ? graphEdges.filter((e) => e.source === node.id || e.target === node.id)
        .map((e) => (e.source === node.id ? e.target : e.source))
    : []
  const related = allNodes.filter((n) => relatedIds.includes(n.id))

  return (
    <div className={cn(
      "absolute top-0 right-0 z-30 flex h-full w-72 flex-col border-l bg-background",
      "transition-transform duration-300 ease-out",
      node ? "translate-x-0" : "translate-x-full",
    )}>
      {node && <>
        <div className="flex items-start justify-between border-b p-5">
          <div>
            <p className="font-semibold text-foreground">{node.label}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{node.subjectName}</p>
          </div>
          <button onClick={onClose} className="mt-0.5 cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Retention Score</span>
              <span className="font-semibold text-foreground">{node.retentionScore}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className={cn("h-full rounded-full", healthBar[node.health])} style={{ width: `${node.retentionScore}%` }} />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Reviewed</span>
              <span className="text-foreground">{daysAgo(node.lastReviewedAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Review</span>
              <span className={node.dueDate < TODAY ? "text-red-500" : "text-foreground"}>{dueLabel(node.dueDate)}</span>
            </div>
          </div>
          {related.length > 0 && (
            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Related Topics</p>
              <div className="flex flex-col gap-2">
                {related.map((n) => (
                  <button key={n.id} onClick={() => onSelectNode(n.id)} className="flex items-center gap-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground">
                    <span>{n.label}</span>
                    <span className={cn("ml-auto size-2 shrink-0 rounded-full", healthDot[n.health])} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-t p-5">
          <Button className="w-full" disabled>Start Review Session</Button>
        </div>
      </>}
    </div>
  )
}
