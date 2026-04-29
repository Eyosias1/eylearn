import {
  LayoutDashboard,
  Brain,
  Network,
  BookOpen,
  PlusCircle,
  CalendarDays,
  Library,
  Settings,
  FileText,
  Pencil,
} from "lucide-react"
import { NavGroup } from "@/types/nav"

export const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard",       href: "/dashboard", icon: LayoutDashboard },
      { label: "Progress",        href: "/progress",  icon: Brain           },
      { label: "Knowledge Graph", href: "/graph",     icon: Network         },
      { label: "Study Plan",      href: "/studyplan",  icon: CalendarDays    },
    ],
  },
  {
    title: "Study",
    items: [
      { label: "Notes",         href: "/notes",       icon: FileText   },
      { label: "Subjects",      href: "/subjects",    icon: Library    },
      { label: "Study Session", href: "/session",     icon: BookOpen   },
      { label: "Whiteboard",    href: "/whiteboard",  icon: Pencil     },
      { label: "Add Content",   href: "/content/new", icon: PlusCircle },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
]
