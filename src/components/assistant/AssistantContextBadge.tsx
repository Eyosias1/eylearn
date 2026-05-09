'use client'

import { FileText, LayoutDashboard, Map, NotebookText, Settings, Workflow } from 'lucide-react'
import { useAssistantContext } from '@/hooks/useAssistantContext'
import { useAssistant } from '@/providers/assistant-provider'
import { cn } from '@/lib/utils'

function ContextIcon({ routeType }: { routeType: ReturnType<typeof useAssistantContext>['routeType'] }) {
  if (routeType === 'dashboard') return <LayoutDashboard className="size-3.5" />
  if (routeType === 'notes' || routeType === 'note') return <NotebookText className="size-3.5" />
  if (routeType === 'whiteboard') return <FileText className="size-3.5" />
  if (routeType === 'graph') return <Workflow className="size-3.5" />
  if (routeType === 'settings') return <Settings className="size-3.5" />
  return <Map className="size-3.5" />
}

function contextTone(routeType: ReturnType<typeof useAssistantContext>['routeType']) {
  if (routeType === 'note' || routeType === 'notes') return "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300"
  if (routeType === 'dashboard') return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  if (routeType === 'whiteboard') return "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300"
  if (routeType === 'graph') return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
  return "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"
}

export function AssistantContextBadge() {
  const routeContext = useAssistantContext()
  const { pageContext } = useAssistant()
  const context = pageContext ?? routeContext
  const text = pageContext?.title ?? (context.entitySlug ? `${context.label}: ${context.entitySlug}` : context.label)

  return (
    <div className={cn(
      // layout
      "flex w-fit max-w-full items-center",
      // spacing
      "gap-1.5 px-2.5 py-1",
      // typography
      "text-xs font-medium",
      // colors
      contextTone(context.routeType),
      // border
      "rounded-full border border-border",
    )}>
      <ContextIcon routeType={context.routeType} />
      <span className="truncate">{text}</span>
      {pageContext?.isDirty && <span className="text-[10px] opacity-80">draft</span>}
    </div>
  )
}
