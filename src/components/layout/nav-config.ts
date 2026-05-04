import {
  LayoutDashboard,
  Brain,
  Network,
  BookOpen,
  CalendarDays,
  Settings,
  FileText,
  Pencil,
  BookMarked,
} from "lucide-react"
import { NavItem } from "@/types/nav"

export const navItems: NavItem[] = [
  { label: "Dashboard",       href: "/dashboard",  icon: LayoutDashboard },
  { label: "Study Plan",      href: "/studyplan",  icon: CalendarDays    },
  { label: "Notes",           href: "/notes",      icon: FileText        },
  { label: "Library",         href: "/library",    icon: BookMarked      },
  { label: "Study Session",   href: "/session",    icon: BookOpen        },
  { label: "Whiteboard",      href: "/whiteboard", icon: Pencil          },
  { label: "Progress",        href: "/progress",   icon: Brain           },
  { label: "Knowledge Graph", href: "/graph",      icon: Network         },
  { label: "Settings",        href: "/settings",   icon: Settings        },
]
