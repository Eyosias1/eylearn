import { cn } from "@/lib/utils"

type Props = {
  label: string
  value: number
}

export function ImmediateReviewStatCard({ label, value }: Props) {
  return (
    <div className={cn(
      // layout
      "flex flex-col items-center",
      // spacing
      "gap-1 p-4",
      // border
      "rounded-xl border",
    )}>
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
