"use client"

import Link from "next/link"
import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { GraphNode, GraphDataNode, GraphDataEdge, NodeHealth } from "@/types/graph"

const TODAY = new Date().toISOString().slice(0, 10)

const healthBar: Record<NodeHealth, string> = {
  green: "bg-emerald-500", yellow: "bg-yellow-400", red: "bg-red-500", gray: "bg-muted",
}
const healthLabel: Record<NodeHealth, string> = {
  green: "Mastered", yellow: "Needs Review", red: "Overdue", gray: "Not Started",
}

function dueLabel(d: string) {
  const n = Math.floor((new Date(d).getTime() - new Date(TODAY).getTime()) / 86400000)
  if (n < 0) return "Overdue ⚠️"
  if (n === 0) return "Today"
  return `In ${n} day${n > 1 ? "s" : ""}`
}

interface Props {
  node:         GraphNode | null
  graphNodes:   GraphDataNode[]
  graphEdges:   GraphDataEdge[]
  onClose:      () => void
  onSelectNode: (id: string) => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      {children}
    </div>
  )
}

export function TopicSidePanel({ node, graphNodes, graphEdges, onClose, onSelectNode }: Props) {
  const nodeMap = new Map(graphNodes.map(n => [n.id, n]))

  const neighbors = node
    ? graphEdges
        .filter(e => e.source === node.id || e.target === node.id)
        .map(e => nodeMap.get(e.source === node.id ? e.target : e.source))
        .filter(Boolean) as GraphDataNode[]
    : []

  const leitnerBox = node?.meta?.leitnerBox as number | null | undefined
  const nextReview = node?.meta?.nextReview  as string | null | undefined
  const slug       = node?.meta?.slug        as string | undefined

  return (
    <div className={cn(
      // layout
      "absolute top-0 right-0 z-30 flex h-full w-72 flex-col",
      // colors
      "border-l bg-background",
      // animation
      "transition-transform duration-300 ease-out",
      // conditional
      node ? "translate-x-0" : "translate-x-full",
    )}>
      {node && (
        <>
          <div className="flex items-start justify-between border-b p-5">
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-foreground leading-snug">{node.label}</p>
              <p className="text-xs text-muted-foreground capitalize">{node.nodeType}</p>
            </div>
            <Button variant="ghost" onClick={onClose} className="mt-0.5 cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
              <X className="size-4" />
            </Button>
          </div>

          <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
            {node.nodeType === "subtopic" && (
              <Section title="Leitner Status">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{healthLabel[node.health]}</span>
                    {leitnerBox && <span className="font-semibold">Box {leitnerBox}</span>}
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={cn("h-full rounded-full", healthBar[node.health])} style={{ width: `${Math.min((leitnerBox ?? 0) / 5 * 100, 100)}%` }} />
                  </div>
                  {nextReview && (
                    <p className="text-xs text-muted-foreground">
                      Next review:{" "}
                      <span className={cn("font-medium", nextReview < TODAY ? "text-red-500" : "text-foreground")}>
                        {dueLabel(nextReview)}
                      </span>
                    </p>
                  )}
                </div>
              </Section>
            )}

            {node.nodeType === "note" && slug && (
              <Section title="Open Note">
                <Button variant="outline" size="sm" asChild className="gap-2">
                  <Link href={`/notes/${slug}`}>
                    <ExternalLink className="size-3.5" />
                    Open note
                  </Link>
                </Button>
              </Section>
            )}

            {neighbors.length > 0 && (
              <Section title="Connected">
                <div className="flex flex-col gap-1.5">
                  {neighbors.map(n => (
                    <Button
                      key={n.id}
                      variant="ghost"
                      onClick={() => onSelectNode(n.id)}
                      className="flex items-center justify-between gap-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="truncate">{n.label}</span>
                      <span className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-muted-foreground capitalize">{n.type}</span>
                        <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: n.color }} />
                      </span>
                    </Button>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </>
      )}
    </div>
  )
}
