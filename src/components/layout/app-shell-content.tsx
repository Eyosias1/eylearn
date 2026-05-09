"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { usePathname } from "next/navigation"
import type { PanelImperativeHandle } from "react-resizable-panels"
import { AssistantPanelShell } from "@/components/assistant/AssistantPanelShell"
import { AppHeader } from "@/components/layout/app-header"
import { PageContent } from "@/components/layout/page-content"
import { NotesSidebarPanelProvider } from "@/components/notes/sidebar/notes-sidebar-panel-context"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { SidebarInset } from "@/components/ui/sidebar"
import { useAssistant } from "@/providers/assistant-provider"
import { useAnimatedPanelResize } from "@/hooks/useAnimatedPanelResize"
import { cn } from "@/lib/utils"

export function AppShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLibraryOrNotesRoute = pathname.startsWith("/library") || pathname.startsWith("/notes")
  const librarySidebarPanelRef = useRef<PanelImperativeHandle | null>(null)
  const assistantPanelRef = useRef<PanelImperativeHandle | null>(null)
  const [librarySidebarOpen, setLibrarySidebarOpen] = useState(true)
  const { open: assistantOpen } = useAssistant()

  useAnimatedPanelResize(librarySidebarPanelRef, librarySidebarOpen, 40, 320)

  useEffect(() => {
    const panel = assistantPanelRef.current
    if (!panel) return
    if (assistantOpen) panel.expand()
    else panel.collapse()
  }, [assistantOpen])

  return (
    <NotesSidebarPanelProvider value={{ open: librarySidebarOpen, setOpen: setLibrarySidebarOpen }}>
      <SidebarInset>
        <ResizablePanelGroup orientation="horizontal" className={cn("flex-1 overflow-hidden")}>
          <ResizablePanel minSize={320} className={cn("min-w-0")}>
            {isLibraryOrNotesRoute
              ? <LibraryContent librarySidebarPanelRef={librarySidebarPanelRef} librarySidebarOpen={librarySidebarOpen}>{children}</LibraryContent>
              : <div className={cn("flex h-full flex-col overflow-hidden")}>
                  <AppHeader />
                  <PageContent flush={pathname.startsWith("/whiteboard/")}>{children}</PageContent>
                </div>
            }
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            collapsible
            collapsedSize={0}
            defaultSize={420}
            minSize={320}
            maxSize={720}
            panelRef={assistantPanelRef}
            className={cn("min-w-0", "transition-[flex-basis,width] duration-200 ease-linear")}
          >
            <AssistantPanelShell />
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarInset>
    </NotesSidebarPanelProvider>
  )
}

function LibraryContent({
  children,
  librarySidebarOpen,
  librarySidebarPanelRef,
}: {
  children: React.ReactNode
  librarySidebarOpen: boolean
  librarySidebarPanelRef: RefObject<PanelImperativeHandle | null>
}) {
  return (
    <ResizablePanelGroup orientation="horizontal" className={cn("h-full overflow-hidden")}>
      <ResizablePanel
        collapsible
        collapsedSize={40}
        defaultSize={320}
        minSize={librarySidebarOpen ? 220 : 40}
        maxSize={520}
        panelRef={librarySidebarPanelRef}
        className={cn("min-w-0 transition-[flex-basis,width] duration-200 ease-linear")}
      >
        <div id="library-sidebar-slot" className={cn("flex h-full w-full")} />
      </ResizablePanel>
      {librarySidebarOpen && <ResizableHandle withHandle />}
      <ResizablePanel minSize={320} className={cn("min-w-0")}>
        <div className={cn("flex h-full flex-col overflow-hidden")}>
          <AppHeader />
          <PageContent>{children}</PageContent>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
