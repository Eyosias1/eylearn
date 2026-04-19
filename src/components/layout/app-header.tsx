"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/layout/theme-toggle"

export function AppHeader() {
  return (
    <header className="flex items-center gap-2 px-4 py-5 border-b">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4" />
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
