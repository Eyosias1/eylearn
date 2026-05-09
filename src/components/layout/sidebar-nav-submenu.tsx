import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import type { NavChildItem } from "@/types/nav"

export function SidebarNavSubmenu({
  items,
  pathname,
}: {
  items: NavChildItem[]
  pathname: string
}) {
  return (
    <SidebarMenuSub>
      {items.map((child) => (
        <ChildNavItem key={child.href} child={child} pathname={pathname} />
      ))}
    </SidebarMenuSub>
  )
}

function ChildNavItem({
  child,
  pathname,
}: {
  child: NavChildItem
  pathname: string
}) {
  const Icon = child.icon

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        asChild
        isActive={pathname === child.href || pathname.startsWith(`${child.href}/`)}
        className={childButtonClassName}
      >
        <Link href={child.href}>
          {Icon && <Icon className="size-5 shrink-0" />}
          <span>{child.label}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}

const childButtonClassName = cn(
  // interaction
  "cursor-pointer",
  // sizing
  "h-10 [&>svg]:size-5!",
  // spacing
  "px-3",
  // typography
  "text-base data-active:font-semibold",
  // colors
  "hover:bg-sidebar-primary/10 hover:text-sidebar-primary",
  "data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground",
  "data-active:[&>svg]:text-sidebar-primary-foreground",
  // effects
  "data-active:shadow-sm",
  // conditional
  "data-active:hover:bg-sidebar-primary data-active:hover:text-sidebar-primary-foreground",
)
