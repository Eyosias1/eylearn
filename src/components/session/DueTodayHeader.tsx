import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DueCard } from "@/types/progress"

interface Props {
  cards: DueCard[]
}

export function DueTodayHeader({ cards }: Props) {
  if (cards.length === 0) {
    return (
      <div className={cn(
        // layout
        "flex items-center justify-between",
        // spacing
        "rounded-xl px-6 py-5",
        // border
        "border bg-card",
      )}>
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          You&apos;re all caught up · Next review: tomorrow
        </p>
      </div>
    )
  }

  const lateCount = cards.filter((c) => c.isLate).length

  return (
    <div className={cn(
      // layout
      "flex flex-col justify-between",
      // spacing
      "p-5 gap-5",
      // colors
      "bg-primary text-primary-foreground",
      // border
      "rounded-xl",
    )}>
      <div className="flex flex-col gap-3">
        {/* <p className="text-xs font-semibold uppercase tracking-widest opacity-60">
          Review Queue
        </p> */}
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold leading-[1.1] tracking-tight">
            Due Today
          </p>
          {/* <p className="text-base opacity-80 leading-relaxed">
            {cards.length} subtopics ready for review.{lateCount > 0 && ` ${lateCount} overdue.`}
          </p> */}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">{cards.length} subtopics</Badge>
          {lateCount > 0 && <Badge className={cn("bg-red-500 text-white hover:bg-red-600")}>{lateCount} late</Badge>}
        </div>
        <div className="flex flex-wrap gap-2">
          {cards.map((card) => (
            <div key={card.id} className={cn(
              // layout
              "flex items-center gap-1.5",
              // spacing
              "px-2.5 py-1 rounded-full",
              // colors
              // "bg-white/10",
            )}>
              <span className={cn("size-2 rounded-full shrink-0", card.subjectColor)} />
              <span className="text-sm">{card.topic}</span>
              {card.isLate && (
                <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-red-500 text-white tracking-wide">
                  LATE
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <Link href="/session-history?filter=due">
        <Button size="lg" variant="secondary" className="w-full">
          View all
        </Button>
      </Link>
    </div>
  )
}
