import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import type { NavItem } from "@/types/nav"

export function SidebarNavButton({
  item,
  isActive,
}: {
  item: NavItem
  isActive: boolean
}) {
  const Icon = item.icon

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={item.label}
      className={buttonClassName}
    >
      <Link
        href={item.href}
        className={cn(
          // layout
          "flex items-center",
          // spacing
          "gap-3",
          // conditional
          "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0",
        )}
      >
        <Icon className="size-5 shrink-0" />
        <span className="group-data-[collapsible=icon]:hidden">
          {item.label}
        </span>
        {item.badge && (
          <Badge
            variant="secondary"
            className="ml-auto px-1.5 py-0 text-xs group-data-[collapsible=icon]:hidden"
          >
            {item.badge}
          </Badge>
        )}
      </Link>
    </SidebarMenuButton>
  )
}

const buttonClassName = cn(
  // interaction
  "cursor-pointer",
  // sizing
  "group-data-[collapsible=icon]:size-10!",
  // colors
  "hover:bg-sidebar-primary/10 hover:text-sidebar-primary",
  "data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground",
  // typography
  "data-active:font-semibold",
  // effects
  "data-active:shadow-sm",
  // conditional
  "data-active:hover:bg-sidebar-primary data-active:hover:text-sidebar-primary-foreground",
  "[&_svg]:size-5! group-data-[collapsible=icon]:[&_svg]:size-6!",
)
