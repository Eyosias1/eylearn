"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { PlanTopic } from "@/types/studyplan"

interface Props {
  dateStr: string | null
  topics: PlanTopic[]
  onClose: () => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  })
}

export function DaySessionsDialog({ dateStr, topics, onClose }: Props) {
  return (
    <Dialog open={!!dateStr} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogDescription className="sr-only">Study sessions scheduled for this day</DialogDescription>
          <DialogTitle className="text-sm font-semibold">
            {dateStr ? formatDate(dateStr) : ""}
          </DialogTitle>
        </DialogHeader>

        {topics.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No sessions scheduled</p>
        ) : (
          <Table variant="ruled">
            <TableHeader>
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topics.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5">
                      <span className={cn("size-2 rounded-full shrink-0", t.subjectColor)} />
                      {t.subject}
                    </span>
                  </TableCell>
                  <TableCell className="tabular-nums">{t.startTime}</TableCell>
                  <TableCell className="text-muted-foreground">{t.durationMinutes}m</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  )
}
