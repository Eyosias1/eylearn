import { Suspense } from "react";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider className={cn("h-svh overflow-hidden")}>
        <Suspense>
          <AppSidebar />
        </Suspense>
        <div id="notes-sidebar-slot" className={cn("flex h-svh shrink-0")} />
        <SidebarInset>
          <div className={cn("flex flex-1 flex-col overflow-hidden")}>
            <AppHeader />
            <main className={cn("relative flex-1 overflow-auto p-6")}>
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
