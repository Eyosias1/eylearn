"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { LeitnerCard } from "@/types/progress"

const BOX_INTERVAL: Record<number, string> = {
  1: "Daily",
  2: "Every 3 days",
  3: "Weekly",
  4: "Bi-weekly",
  5: "Mastered",
}

interface Props {
  box: number | null
  cards: LeitnerCard[]
  onClose: () => void
}

export function LeitnerBoxDialog({ box, cards, onClose }: Props) {
  if (box === null) return null
  const boxCards = cards.filter((c) => c.box === box)

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Box {box} — {BOX_INTERVAL[box]}</DialogTitle>
        </DialogHeader>
        {boxCards.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No cards in this box.</p>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto">
            <Table variant="ruled">
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Last Reviewed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boxCards.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.topic}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full shrink-0 ${c.subjectColor}`} />
                        <span className="text-muted-foreground">{c.subject}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">{c.lastReviewed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
