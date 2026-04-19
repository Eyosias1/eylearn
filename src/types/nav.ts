import { LucideIcon } from "lucide-react"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

export type NavGroup = {
  title: string
  items: NavItem[]
}
