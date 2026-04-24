import { SettingsNav } from "@/components/settings/settings-nav"
import { SettingsContent } from "@/components/settings/settings-content"

export default function SettingsPage() {
  return (
    <div className="flex gap-10">
      <SettingsNav />
      <div className="ml-[18rem] flex min-w-0 flex-1 flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account, preferences, and how EyLearn shows up for you.
          </p>
        </div>
        <SettingsContent />
      </div>
    </div>
  )
}
