import { ProfileSection } from "./profile-section"
import { NotificationsSection } from "./notifications-section"
import { AppearanceSection } from "./appearance-section"
import { BillingSection } from "./billing-section"
import { DangerSection } from "./danger-section"

export function SettingsContent() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-12">
      <section id="profile" className="scroll-mt-24">
        <ProfileSection />
      </section>
      <section id="notifications" className="scroll-mt-24">
        <NotificationsSection />
      </section>
      <section id="appearance" className="scroll-mt-24">
        <AppearanceSection />
      </section>
      <section id="billing" className="scroll-mt-24">
        <BillingSection />
      </section>
      <section id="danger" className="scroll-mt-24">
        <DangerSection />
      </section>
    </div>
  )
}
