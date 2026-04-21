"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { DueCard } from "@/types/progress"

const dotColor = { strong: "bg-emerald-500", partial: "bg-yellow-400", poor: "bg-red-500" }

interface Props {
  cards: DueCard[]
  onStartSession: (ids: string[]) => void
}

export function DueTodayTable({ cards, onStartSession }: Props) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const toggleAll = () =>
    setSelected(selected.length === cards.length ? [] : cards.map((c) => c.id))

  if (cards.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-8">Nothing due today</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="w-8 px-3 py-2.5">
                <input
                  type="checkbox"
                  checked={selected.length === cards.length}
                  onChange={toggleAll}
                  className="rounded"
                />
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Topic</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subject</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Box</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Last Review</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">History</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr
                key={card.id}
                className={cn("border-b last:border-0 hover:bg-muted/20 transition-colors", selected.includes(card.id) && "bg-primary/5")}
              >
                <td className="px-3 py-2.5">
                  <input type="checkbox" checked={selected.includes(card.id)} onChange={() => toggle(card.id)} className="rounded" />
                </td>
                <td className="px-3 py-2.5 font-medium">
                  {card.topic}
                  {card.isLate && <span className="ml-2 text-[10px] font-semibold text-red-500">LATE</span>}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("size-2 rounded-full", card.subjectColor)} />
                    <span className="text-muted-foreground">{card.subject}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-muted-foreground">Box {card.box}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{card.lastReviewed}</td>
                <td className="px-3 py-2.5">
                  <div className="flex gap-1">
                    {card.confidenceHistory.map((r, i) => (
                      <span key={i} className={cn("size-2.5 rounded-full", dotColor[r])} />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={() => onStartSession(selected)}>
            Start Session with {selected.length} Selected →
          </Button>
        </div>
      )}
    </div>
  )
}
