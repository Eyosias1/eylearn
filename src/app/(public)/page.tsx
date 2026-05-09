import { AudienceSection } from "@/components/landing/AudienceSection"
import { CoreLoopSection } from "@/components/landing/CoreLoopSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { FinalCtaSection } from "@/components/landing/FinalCtaSection"
import { HeroSection } from "@/components/landing/HeroSection"
import { LandingHeader } from "@/components/landing/LandingHeader"
import { ProblemSection } from "@/components/landing/ProblemSection"
import { ProductPreviewSection } from "@/components/landing/ProductPreviewSection"
import { ScienceSection } from "@/components/landing/ScienceSection"
import { TrustStripSection } from "@/components/landing/TrustStripSection"
import { cn } from "@/lib/utils"

export default function PublicHomePage() {
  return (
    <main
      className={cn(
        // layout
        "flex flex-col",
        // sizing
        "min-h-svh",
        // colors
        "bg-background text-foreground",
      )}
    >
      <LandingHeader />
      <HeroSection />
      <TrustStripSection />
      <CoreLoopSection />
      <FeaturesSection />
      <ProblemSection />
      <ScienceSection />
      <ProductPreviewSection />
      <AudienceSection />
      <FinalCtaSection />
    </main>
  )
}
