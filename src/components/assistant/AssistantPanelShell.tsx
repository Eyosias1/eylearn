import { AssistantComposer } from '@/components/assistant/AssistantComposer'
import { AssistantHeader } from '@/components/assistant/AssistantHeader'
import { AssistantMessages } from '@/components/assistant/AssistantMessages'
import { cn } from '@/lib/utils'

export function AssistantPanelShell() {
  return (
    <aside className={cn(
      // layout
      "flex h-full flex-col",
      // colors
      "bg-sidebar text-sidebar-foreground",
      // border
      "border-l border-border",
      // animation
      "overflow-hidden transition-[opacity,transform] duration-200 ease-linear",
    )}>
      <AssistantHeader />
      <div className="min-h-0 flex-1">
        <AssistantMessages />
      </div>
      <AssistantComposer />
    </aside>
  )
}
