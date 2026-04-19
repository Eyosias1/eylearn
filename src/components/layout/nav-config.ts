import {
  LayoutDashboard,
  Brain,
  BookOpen,
  PlusCircle,
  CalendarDays,
  Library,
  Settings,
} from "lucide-react"
import { NavGroup } from "@/types/nav"

export const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Progress", href: "/progress", icon: Brain },
      { label: "Study Plan", href: "/plan", icon: CalendarDays },
    ],
  },
  {
    title: "Study",
    items: [
      { label: "Study Session", href: "/session", icon: BookOpen },
      { label: "Add Content", href: "/content/new", icon: PlusCircle },
      { label: "Subjects", href: "/subjects", icon: Library },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
]
