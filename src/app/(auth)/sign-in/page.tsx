import { GalleryVerticalEnd } from "lucide-react"

import { SignInForm } from "@/components/auth/sign-in-form"
import { cn } from "@/lib/utils"

export default function SignInPage() {
  return (
    <div
      className={cn(
        // layout
        "grid",
        // sizing
        "min-h-svh",
        // desktop
        "lg:grid-cols-2",
      )}
    >
      <div
        className={cn(
          // layout
          "flex flex-col",
          // spacing
          "gap-4 p-6",
          // mobile
          "md:p-10",
        )}
      >
        <div
          className={cn(
            // layout
            "flex justify-center",
            // spacing
            "gap-2",
            // mobile
            "md:justify-start",
          )}
        >
          <a
            href="#"
            className={cn(
              // layout
              "flex items-center",
              // spacing
              "gap-2",
              // typography
              "font-medium",
            )}
          >
            <div
              className={cn(
                // layout
                "flex items-center justify-center",
                // sizing
                "size-6",
                // colors
                "bg-primary text-primary-foreground",
                // border
                "rounded-md",
              )}
            >
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div
          className={cn(
            // layout
            "flex flex-1 items-center justify-center",
          )}
        >
          <div
            className={cn(
              // sizing
              "w-full max-w-xs",
            )}
          >
            <SignInForm />
          </div>
        </div>
      </div>
      <div
        className={cn(
          // layout
          "relative hidden",
          // colors
          "bg-muted",
          // desktop
          "lg:block",
        )}
      />
    </div>
  )
}
