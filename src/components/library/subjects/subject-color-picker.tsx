"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const SUBJECT_COLORS = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-sky-500",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-rose-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-red-500",
]

interface Props {
  value: string
  onChange: (color: string) => void
}

export function SubjectColorPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUBJECT_COLORS.map((color) => (
        <Button
          variant="ghost"
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={cn(
            // layout
            "flex items-center justify-center",
            // sizing
            "size-7 p-0",
            // border
            "rounded-full",
            // animation
            "transition-all",
            // conditional
            color,
            value === color
              ? "ring-2 ring-offset-2 ring-foreground scale-110"
              : "opacity-60 hover:opacity-100",
          )}
        />
      ))}
    </div>
  )
}
