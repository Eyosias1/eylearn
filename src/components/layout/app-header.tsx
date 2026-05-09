"use client"

import { AssistantRobotIcon } from "@/components/icons/AssistantRobotIcon"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { AppBreadcrumb } from "@/components/layout/app-breadcrumb"
import { Button } from "@/components/ui/button"
import { useAssistant } from "@/providers/assistant-provider"
import { HeaderNav } from "@/components/layout/header-nav"
import { cn } from "@/lib/utils"

export function AppHeader() {
  const { open, toggleOpen } = useAssistant()

  return (
    <header className={cn(
      // layout
      "sticky top-0 z-20 flex items-center gap-2",
      // sizing
      "h-(--header-height) shrink-0 px-4",
      // colors
      "bg-background",
      // border
      "border-b",
    )}>
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <AppBreadcrumb />
      </div>

      <HeaderNav />

      <div className="flex flex-1 items-center justify-end gap-1">
        <ThemeToggle />
        <Separator orientation="vertical" />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={toggleOpen}
          title={open ? "Close assistant" : "Open assistant"}
          className={cn(
            // colors
            open && "bg-accent text-accent-foreground",
          )}
        >
          <AssistantRobotIcon
            className={cn(
              // sizing
              "size-6",
            )}
          />
        </Button>
      </div>
    </header>
  )
}
