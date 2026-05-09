"use client"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import type { RetroTopic } from "@/types/progress"

interface Props {
  topics:        RetroTopic[]
  emptyMessage?: string
}

const PERF_DOT: Record<string, string> = {
  strong:  "bg-emerald-500",
  partial: "bg-amber-400",
  poor:    "bg-red-400",
}

function formatDate(date: string): string {
  const [, m, d] = date.split("-")
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(m)-1]} ${parseInt(d)}`
}

export function RetroTable({ topics, emptyMessage = "No topics found." }: Props) {
  const router = useRouter()

  return (
    <Table variant="ruled">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[160px]">Subtopic</TableHead>
          <TableHead className="w-[140px]">Topic</TableHead>
          <TableHead className="w-[120px]">Subject</TableHead>
          <TableHead className="w-[80px]">Box</TableHead>
          <TableHead className="w-[100px]">Last Review</TableHead>
          <TableHead className="w-[80px]">Recent</TableHead>
          <TableHead className="w-[100px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {topics.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          topics.map((t) => {
            const href = `/session-history/${encodeURIComponent(t.subtopic)}`
            const lastRating = [...t.sessions].reverse().find(s => s.rating !== null)?.rating
            return (
              <TableRow
                key={`${t.subject}-${t.topic}-${t.subtopic}`}
                onClick={() => router.push(href)}
                className={cn(
                  // animation
                  "transition-colors",
                  // hover
                  "cursor-pointer hover:bg-muted/60",
                )}
              >
                <TableCell className="font-medium text-sm">{t.subtopic}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{t.topic}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{t.subject}</TableCell>
                <TableCell className="text-sm text-muted-foreground">Box {t.box}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(t.lastReview)}</TableCell>
                <TableCell>
                  {lastRating && (
                    <div className="flex items-center gap-1.5">
                      <span className={cn("size-2 rounded-full inline-block", PERF_DOT[lastRating])} />
                      <span className="text-xs text-muted-foreground capitalize">{lastRating}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <span className={cn(
                    // layout
                    "flex items-center gap-1",
                    // typography
                    "text-xs text-muted-foreground",
                    // hover
                    "hover:text-foreground",
                  )}>
                    View details
                    <ChevronRight className="size-3" />
                  </span>
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}
