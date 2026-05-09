"use client"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type Props = {
  enabled: boolean
  onChange: (val: boolean) => void
}

export function RequeueToggle({ enabled, onChange }: Props) {
  return (
    <div className={cn(
      // layout
      "flex items-center justify-between",
      // spacing
      "px-4 py-3",
      // border
      "rounded-xl border border-border",
    )}>
      <div>
        <p className="text-sm font-medium">Requeue round</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Repeat missed questions at the end of the session.
        </p>
      </div>
      <Switch checked={enabled} onCheckedChange={onChange} />
    </div>
  )
}
