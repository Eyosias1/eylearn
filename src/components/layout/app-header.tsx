"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { cn } from "@/lib/utils"

export function AppHeader() {
  return (
    <header className={cn(
      // layout
      "sticky top-0 z-20 flex items-center gap-2",
      // sizing — CSS variable shared with SidebarHeader
      "h-(--header-height) px-4",
      // colors
      "bg-background",
      // border
      "border-b",
    )}>
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
