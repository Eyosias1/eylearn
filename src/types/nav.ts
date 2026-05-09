import { LucideIcon } from "lucide-react"

export type NavChildItem = {
  label: string
  href: string
  icon?: LucideIcon
  badge?: number
}

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
  children?: NavChildItem[]
}

export type NavGroup = {
  title: string
  items: NavItem[]
}
