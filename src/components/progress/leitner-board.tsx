"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { LeitnerCard } from "@/types/progress"

const BOX_CONFIG = [
  { box: 1, label: "Box 1", interval: "Daily" },
  { box: 2, label: "Box 2", interval: "Every 3 Days" },
  { box: 3, label: "Box 3", interval: "Weekly" },
  { box: 4, label: "Box 4", interval: "Bi-weekly" },
  { box: 5, label: "Box 5", interval: "Mastered" },
] as const

interface Props {
  cards: LeitnerCard[]
}

function MasteryBar({ cards }: { cards: LeitnerCard[] }) {
  const total = cards.length
  if (total === 0) return <p className="text-[10px] text-muted-foreground">Empty</p>

  const subjectGroups = cards.reduce<Record<string, { color: string; count: number }>>((acc, card) => {
    if (!acc[card.subject]) acc[card.subject] = { color: card.subjectColor, count: 0 }
    acc[card.subject].count++
    return acc
  }, {})

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex h-2 w-full rounded-full overflow-hidden gap-px">
        {Object.values(subjectGroups).map((s, i) => (
          <div
            key={i}
            className={cn("h-full rounded-full", s.color)}
            style={{ width: `${(s.count / total) * 100}%` }}
          />
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">{total} cards mastered</p>
    </div>
  )
}

export function LeitnerBoard({ cards }: Props) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-5 gap-3">
      {BOX_CONFIG.map(({ box, label, interval }) => {
        const boxCards = cards.filter((c) => c.box === box)
        const count = boxCards.length
        const displayCount = count < 10 ? String(count).padStart(2, "0") : String(count)

        return (
          <div
            key={box}
            className={cn(
              // layout
              "flex flex-col items-center justify-center gap-3",
              // sizing
              "min-h-[160px]",
              // spacing
              "rounded-xl border p-4",
              // colors
              "bg-card",
              // mastered box
              box === 5 && "border-emerald-500/30 bg-emerald-500/5",
            )}
          >
            <div className="flex flex-col items-center gap-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {label}
              </p>
              <p className="text-[10px] text-muted-foreground">{interval}</p>
            </div>

            <p className="text-5xl font-bold tabular-nums leading-none">
              {displayCount}
            </p>

            <div className="flex items-center justify-center w-full">
              {box === 5 ? (
                <MasteryBar cards={boxCards} />
              ) : boxCards.length === 0 ? (
                <p className="text-[10px] text-muted-foreground">Empty</p>
              ) : (
                <div className="grid grid-cols-4 gap-1">
                  {boxCards.map((card) => (
                    <div
                      key={card.id}
                      className="relative flex items-center justify-center"
                      onMouseEnter={() => setHoveredCard(card.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <span className={cn(
                        "block size-2.5 rounded-full cursor-pointer hover:scale-125 transition-transform",
                        card.subjectColor,
                      )} />
                      {hoveredCard === card.id && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-10 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs shadow-md">
                          <p className="font-medium">{card.topic}</p>
                          <p className="text-muted-foreground">{card.subject}</p>
                          <p className="text-muted-foreground">{card.lastReviewed}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
