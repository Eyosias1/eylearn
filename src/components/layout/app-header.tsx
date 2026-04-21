"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/layout/theme-toggle"

export function AppHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-20 flex items-center gap-2 border-b bg-background px-4 py-5 md:left-[var(--sidebar-width)]">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4" />
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
