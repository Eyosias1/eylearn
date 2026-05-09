import {
  Brain,
  BookOpen,
  BookMarked,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  Network,
  Pencil,
  Settings,
} from "lucide-react"
import { NavItem } from "@/types/nav"

export const navItems: NavItem[] = [
  {
    label: "Learn",
    href: "#learn",
    icon: GraduationCap,
    children: [
      { label: "Dashboard",     href: "/dashboard", icon: LayoutDashboard },
      { label: "Progress",      href: "/progress",  icon: Brain           },
      { label: "Study Session", href: "/session",   icon: BookOpen        },
      { label: "Plan",          href: "/plan", icon: CalendarDays    },
    ],
  },
  {
    label: "Workspace",
    href: "#workspace",
    icon: BriefcaseBusiness,
    children: [
      { label: "Library",         href: "/library",    icon: BookMarked },
      { label: "Knowledge Graph", href: "/graph",      icon: Network    },
      { label: "Whiteboard",      href: "/whiteboard", icon: Pencil     },
    ],
  },
  { label: "Settings", href: "/settings", icon: Settings },
]

export const navSearchItems: NavItem[] = [
  { label: "Dashboard",       href: "/dashboard", icon: LayoutDashboard },
  { label: "Progress",        href: "/progress",  icon: Brain           },
  { label: "Study Session",   href: "/session",   icon: BookOpen        },
  { label: "Plan",            href: "/plan", icon: CalendarDays    },
  { label: "Library",         href: "/library",   icon: BookMarked      },
  { label: "Knowledge Graph", href: "/graph",     icon: Network         },
  { label: "Whiteboard",      href: "/whiteboard",icon: Pencil          },
  { label: "Settings",        href: "/settings",  icon: Settings        },
]
