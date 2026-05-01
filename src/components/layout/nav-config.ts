import {
  LayoutDashboard,
  Brain,
  Network,
  BookOpen,
  CalendarDays,
  Library,
  Settings,
  FileText,
  Pencil,
} from "lucide-react"
import { NavGroup } from "@/types/nav"

export const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Plan",
    items: [
      { label: "Study Plan", href: "/studyplan", icon: CalendarDays },
    ],
  },
  {
    title: "Library",
    items: [
      { label: "Notes",    href: "/notes",    icon: FileText },
      { label: "Subjects", href: "/subjects", icon: Library  },
    ],
  },
  {
    title: "Study",
    items: [
      { label: "Study Session", href: "/session",    icon: BookOpen },
      { label: "Whiteboard",    href: "/whiteboard", icon: Pencil   },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Progress",        href: "/progress", icon: Brain   },
      { label: "Knowledge Graph", href: "/graph",    icon: Network },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
]
