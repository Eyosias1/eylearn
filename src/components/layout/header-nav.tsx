"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Network } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeaderNav() {
  const pathname = usePathname()

  const items = [
    { label: "Study Session",   href: "/session", icon: BookOpen },
    { label: "Knowledge Graph", href: "/graph",   icon: Network  },
  ]

  return (
    <div className="flex items-center gap-1">
      {items.map(({ label, href, icon: Icon }) => (
        <Button
          key={href}
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            // spacing
            "gap-2 px-2 sm:px-3",
            // colors
            pathname === href && "bg-accent text-accent-foreground",
          )}
        >
          <Link href={href}>
            <Icon className="size-4" />
            <span className="hidden sm:inline text-sm font-medium">{label}</span>
          </Link>
        </Button>
      ))}
    </div>
  )
}
