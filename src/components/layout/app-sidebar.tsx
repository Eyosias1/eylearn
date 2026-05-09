"use client"

import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { navItems } from "@/components/layout/nav-config"
import { NavUser } from "@/components/layout/nav-user"
import { SearchPalette } from "@/components/layout/search-palette"
import { SidebarNavItem } from "@/components/layout/sidebar-nav-item"
import { SidebarSearchButton } from "@/components/layout/sidebar-search-button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [openNavItems, setOpenNavItems] = useState<Record<string, boolean>>({})
  const user = {
    name: "Eyosias",
    email: "eyosias16@gmail.com",
    avatar: "",
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-(--header-height) justify-center border-b">
        <div className="flex items-center gap-3">
          <Image
            src="/eyLearnLogo.svg"
            alt="EyLearn logo"
            width={32}
            height={30}
            className={cn(
              // sizing
              "size-8 shrink-0",
              // border
              "rounded-lg",
            )}
            priority
          />
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold leading-none">EyLearn</p>
            <p className="text-xs text-muted-foreground mt-0.5">Study smarter</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent >
        <SidebarMenu className="px-2 pt-2">
          <SidebarSearchButton onClick={() => setSearchOpen(true)} />
        </SidebarMenu>
        <SidebarMenu className="gap-3 px-2 pt-2">
          {navItems.map((item) => {
            const isSectionActive = item.children?.some((child) => {
              return pathname === child.href ||
                pathname.startsWith(`${child.href}/`)
            }) ?? pathname === item.href
            const isOpen = openNavItems[item.href] ?? isSectionActive

            return (
              <SidebarNavItem
                key={item.href}
                item={item}
                pathname={pathname}
                isExactActive={pathname === item.href}
                isSectionActive={isSectionActive}
                isOpen={isOpen}
                onOpenChange={(open) => setOpenNavItems((current) => ({
                  ...current,
                  [item.href]: open,
                }))}
              />
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t">
        <NavUser user={user} />
      </SidebarFooter>

      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </Sidebar>
  )
}
