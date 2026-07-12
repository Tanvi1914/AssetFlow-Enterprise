import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun, User, Bell, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth, useTheme } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

function initials(n: string) {
  return n.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

function SettingsPage() {
  const { user } = useAuth();
  const { dark, toggle } = useTheme();

  return (
    <>
      <PageHeader title="Settings" description="Manage your profile, appearance and preferences." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Profile">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">{initials(user?.name ?? "AF")}</AvatarFallback></Avatar>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-foreground">{user?.name}</p>
                <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
                <div className="mt-1.5"><StatusBadge status={user?.role === "Employee" ? "Good" : "Approved"} className="!bg-accent !text-accent-foreground !border-accent" /></div>
              </div>
            </div>
            <Separator className="my-5" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Full name</Label><Input defaultValue={user?.name} /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} /></div>
              <div className="space-y-2"><Label>Department</Label><Input defaultValue={user?.department} /></div>
              <div className="space-y-2"><Label>Role</Label><Input defaultValue={user?.role} disabled /></div>
            </div>
            <div className="mt-5 flex justify-end">
              <Button onClick={() => toast.success("Profile updated")}>Save changes</Button>
            </div>
          </SectionCard>

          <SectionCard title="Notification Preferences">
            <div className="space-y-4">
              {["Asset assignments", "Transfer approvals", "Maintenance updates", "Booking reminders", "Audit discrepancies"].map((p, i) => (
                <div key={p} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{p}</span>
                  </div>
                  <Switch defaultChecked={i < 4} onCheckedChange={() => toast.success("Preference updated")} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Appearance">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {dark ? <Moon className="h-4 w-4 text-muted-foreground" /> : <Sun className="h-4 w-4 text-muted-foreground" />}
                <span className="text-sm text-foreground">Dark mode</span>
              </div>
              <Switch checked={dark} onCheckedChange={toggle} />
            </div>
          </SectionCard>

          <SectionCard title="Security">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Password change flow")}><ShieldCheck className="mr-2 h-4 w-4" /> Change password</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("2FA setup")}><User className="mr-2 h-4 w-4" /> Two-factor auth</Button>
            </div>
          </SectionCard>

          <SectionCard title="Organization">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Plan</dt><dd className="font-medium text-foreground">Enterprise</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Seats</dt><dd className="font-medium text-foreground">248 / 300</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Total assets</dt><dd className="font-medium text-foreground">1,424</dd></div>
            </dl>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
