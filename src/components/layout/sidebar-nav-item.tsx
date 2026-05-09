"use client"

import { SidebarNavButton } from "@/components/layout/sidebar-nav-button"
import { SidebarNavCollapsible } from "@/components/layout/sidebar-nav-collapsible"
import { SidebarMenuItem } from "@/components/ui/sidebar"
import { NavItem } from "@/types/nav"

export function SidebarNavItem({
  item,
  pathname,
  isExactActive,
  isSectionActive,
  isOpen,
  onOpenChange,
}: {
  item: NavItem
  pathname: string
  isExactActive: boolean
  isSectionActive: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const hasChildren = Boolean(item.children?.length)

  return hasChildren ? (
    <SidebarNavCollapsible
      key={`${item.href}-${isSectionActive}`}
      item={item}
      pathname={pathname}
      isSectionActive={isSectionActive}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  ) : (
    <SidebarMenuItem>
      <SidebarNavButton item={item} isActive={isExactActive} />
    </SidebarMenuItem>
  )
}
