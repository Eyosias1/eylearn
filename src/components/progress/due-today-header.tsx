import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { DueCard } from "@/types/progress"

interface Props {
  cards: DueCard[]
  onStartReview: () => void
}

export function DueTodayHeader({ cards, onStartReview }: Props) {
  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-between rounded-xl border bg-card px-6 py-5">
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          You&apos;re all caught up · Next review: tomorrow
        </p>
      </div>
    )
  }

  return (
    <div className={cn(
      // layout
      "flex items-center justify-between gap-8",
      // spacing
      "rounded-xl px-8 py-7",
      // colors
      "bg-card text-foreground",
    )}>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-3xl font-bold">Due Today</p>
          <p className="text-sm text-muted-foreground mt-1">{cards.length} cards due for review today</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center gap-3">
              <span className={cn("size-2.5 rounded-full shrink-0", card.subjectColor)} />
              <span className="text-sm">{card.topic}</span>
              {card.isLate && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/30 text-red-300 tracking-wide">
                  LATE
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={onStartReview}
        size="lg"
        className="shrink-0 bg-white text-black hover:bg-white/90 border-none px-8"
      >
        Start Review Session
      </Button>
    </div>
  )
}
