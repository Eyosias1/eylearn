"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { settingsNavItems } from "./settings-nav-items"

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-[88px] z-10 h-[calc(100vh-104px)] w-56 overflow-auto">
      <div className="flex flex-col gap-0.5">
        <p className="px-2.5 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Settings
        </p>
        {settingsNavItems.map((section) => {
          const Icon = section.icon
          const isActive = pathname === section.href

          return (
            <Link
              key={section.href}
              href={section.href}
              className={cn(
                // layout
                "flex items-center",
                // spacing
                "gap-3 px-2.5 py-2",
                // typography
                "text-left",
                // colors
                "text-muted-foreground",
                // border
                "rounded-lg",
                // animation
                "transition-colors",
                // hover
                "hover:bg-muted/50 hover:text-foreground",
                // conditional
                isActive && "bg-muted text-foreground",
              )}
            >
              <Icon
                className={cn(
                  // layout
                  "shrink-0",
                  // sizing
                  "size-4",
                  // conditional
                  section.destructive && "text-destructive",
                )}
              />
              <span className="flex-1 text-sm font-medium text-foreground">{section.label}</span>
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
