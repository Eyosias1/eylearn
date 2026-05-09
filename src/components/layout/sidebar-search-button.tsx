import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SidebarSearchButton({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={onClick}
        tooltip="Search"
        className={cn(
          // spacing
          "px-3 py-2",
          // colors
          "text-muted-foreground",
          // border
          "border border-border",
        )}
      >
        <Search className="size-4 shrink-0" />
        <span className="group-data-[collapsible=icon]:hidden">Search</span>
        <kbd className="ml-auto text-xs group-data-[collapsible=icon]:hidden">
          ⌘K
        </kbd>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
