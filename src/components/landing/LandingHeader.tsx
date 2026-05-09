import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/landing/ThemeToggle"
import { cn } from "@/lib/utils"

export function LandingHeader() {
  return (
    <header
      className={cn(
        // layout
        "sticky top-0 z-40 flex items-center justify-between",
        // sizing
        "w-full",
        // spacing
        "px-4 py-3",
        // colors
        "border-b bg-background/95 backdrop-blur",
        // desktop
        "lg:px-10",
      )}
    >
      <Link href="/" className={cn("flex items-center gap-2 font-semibold")}>
        <Image src="/eyLearnLogo.svg" alt="eyLearn" width={32} height={32} />
        eyLearn
      </Link>
      <nav className={cn("hidden items-center gap-6 text-sm text-muted-foreground md:flex")}>
        <Link href="#loop">How it works</Link>
        <Link href="#features">Features</Link>
        <Link href="#science">Science</Link>
      </nav>
      <div className={cn("flex items-center gap-2")}>
        <ThemeToggle />
        <Button asChild variant="ghost" size="sm">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/sign-up">Start studying</Link>
        </Button>
      </div>
    </header>
  )
}
