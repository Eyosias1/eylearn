'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface SidebarEmojiPickerProps {
  value: string
  options: string[]
  onChange: (emoji: string) => Promise<void>
  className?: string
}

export function SidebarEmojiPicker({ value, options, onChange, className }: SidebarEmojiPickerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-xs"
          className={cn(
            "text-base transition-all hover:scale-110 hover:bg-violet-500/20 hover:text-violet-600 hover:ring-1 hover:ring-violet-500/40",
            className,
          )}
        >
          {value}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("grid w-auto min-w-0 grid-cols-4 gap-1 p-2")}>
        {options.map(emoji => (
          <DropdownMenuItem
            key={emoji}
            onSelect={() => void onChange(emoji)}
            className="flex size-8 cursor-pointer items-center justify-center p-0 text-lg"
          >
            {emoji}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
