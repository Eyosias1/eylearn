import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  type: "overconfident" | "underconfident"
  count: number
}

const CONFIG = {
  overconfident: {
    icon:        TrendingUp,
    iconColor:   "text-red-500",
    iconBg:      "bg-red-500/15",
    cardBg:      "bg-red-500/10",
    subtitle:    "Rated High confidence but answered Wrong",
  },
  underconfident: {
    icon:        TrendingDown,
    iconColor:   "text-blue-500",
    iconBg:      "bg-blue-500/15",
    cardBg:      "bg-blue-500/10",
    subtitle:    "Rated Low confidence but answered Correct",
  },
}

export function ImmediateReviewCalibrationCard({ type, count }: Props) {
  const { icon: Icon, iconColor, iconBg, cardBg, subtitle } = CONFIG[type]

  return (
    <div className={cn(
      // layout
      "flex items-center gap-4",
      // spacing
      "p-4",
      // border
      "rounded-xl",
      // colors
      cardBg,
    )}>
      <div className={cn("flex items-center justify-center shrink-0 size-10 rounded-lg", iconBg)}>
        <Icon className={cn("size-5", iconColor)} />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-bold">{count}× {type}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
