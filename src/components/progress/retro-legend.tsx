import { cn } from "@/lib/utils"

const items = [
  { color: "bg-emerald-500",    label: "Strong"      },
  { color: "bg-yellow-400",     label: "Partial"     },
  { color: "bg-red-500",        label: "Poor"        },
  { color: "bg-muted border",   label: "Not studied" },
] as const

export function RetroLegend() {
  return (
    <div className="flex items-center gap-4">
      {items.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className={cn("size-3 rounded-full shrink-0", color)} />
          {label}
        </div>
      ))}
    </div>
  )
}
