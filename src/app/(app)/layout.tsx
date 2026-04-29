import { Suspense } from "react";

import { AppShellContent } from "@/components/layout/app-shell-content";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider className={cn("h-svh overflow-hidden")}>
        <Suspense>
          <AppSidebar />
        </Suspense>
        <AppShellContent>{children}</AppShellContent>
      </SidebarProvider>
    </TooltipProvider>
  );
}
