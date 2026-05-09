"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarNavSubmenu } from "@/components/layout/sidebar-nav-submenu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import type { NavItem } from "@/types/nav"

export function SidebarNavCollapsible(props: {
  item: NavItem
  pathname: string
  isSectionActive: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { item, pathname, isSectionActive, isOpen, onOpenChange } = props

  return (
    <Collapsible
      asChild
      open={isOpen}
      onOpenChange={onOpenChange}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={false}
            tooltip={item.label}
            className={cn(
              navButtonClassName,
              isSectionActive && sectionActiveClassName,
            )}
          >
            <item.icon className="size-5 shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              {item.label}
            </span>
            <ChevronRight
              className={cn(
                // spacing
                "ml-auto",
                // sizing
                "size-5",
                // animation
                "transition-transform duration-200 ease-in-out",
                // conditional
                "group-data-[state=open]/collapsible:rotate-90",
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className={contentClassName}>
          <SidebarNavSubmenu items={item.children ?? []} pathname={pathname} />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

const navButtonClassName = cn(
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

const sectionActiveClassName =
  "bg-sidebar-primary/10 text-sidebar-primary font-semibold hover:bg-sidebar-primary/15 hover:text-sidebar-primary"

const contentClassName = cn(
  // layout
  "overflow-hidden",
  // spacing
  "pt-1",
  // animation
  "duration-150 ease-out",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-1",
)
