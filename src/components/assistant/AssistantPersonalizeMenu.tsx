'use client'

import { BookOpen, ChevronRight, Globe, Plus, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export function AssistantPersonalizeMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          title="Personalize tools"
          className={cn(
            // spacing
            "gap-1.5 px-2",
            // typography
            "text-xs",
            // colors
            "text-muted-foreground",
          )}
        >
          <SlidersHorizontal className="size-3.5" />
          Personalize
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top" sideOffset={8} className="w-72 p-1.5">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm">
          <Globe className="size-4 text-muted-foreground" />
          <span className="flex-1">Web access</span>
          <Switch checked size="default" aria-label="Web access" />
        </div>
        <DropdownMenuItem className="gap-2 px-2 py-2">
          <BookOpen className="size-4 text-muted-foreground" />
          <span className="flex-1">My sources</span>
          <span className="text-muted-foreground">3</span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 px-2 py-2">
          <Plus className="size-4 text-muted-foreground" />
          <span>Add sources</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 px-2 py-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          <span className="flex-1">Mode</span>
          <span className="text-muted-foreground">Default</span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 px-2 py-2">
          <Sparkles className="size-4 text-muted-foreground" />
          <span>Personalize</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
