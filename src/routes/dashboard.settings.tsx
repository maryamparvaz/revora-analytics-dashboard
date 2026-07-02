import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, CreditCard, Users } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — Revora" }] }),
  component: SettingsPage,
});

const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email"),
  role: z.string().trim().min(2, "Enter your role"),
  bio: z.string().max(280).optional(),
});
type ProfileForm = z.infer<typeof profileSchema>;

const companySchema = z.object({
  companyName: z.string().trim().min(2, "Enter a company name"),
  website: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  currency: z.enum(["USD", "EUR", "GBP", "JPY"]),
  timezone: z.string().min(1),
});
type CompanyForm = z.infer<typeof companySchema>;

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your profile, workspace, notifications, and billing." />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileCard />
        </TabsContent>
        <TabsContent value="workspace" className="space-y-6">
          <CompanyCard />
          <TeamCard />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-6">
          <NotificationsCard />
        </TabsContent>
        <TabsContent value="billing" className="space-y-6">
          <BillingCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileCard() {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "Amelia Chen", email: "amelia@revora.app", role: "Account lead", bio: "Revenue operator. Loves clean dashboards and short meetings." },
  });

  const onSubmit = form.handleSubmit((v) => {
    toast.success("Profile updated", { description: `Saved for ${v.fullName}` });
  });

  return (
    <SectionCard title="Profile" description="This information is shown to your team across the workspace.">
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14"><AvatarFallback>AC</AvatarFallback></Avatar>
          <div className="space-y-1">
            <Button type="button" variant="outline" size="sm">Upload photo</Button>
            <p className="text-xs text-muted-foreground">PNG or JPG, up to 2 MB.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" error={form.formState.errors.fullName?.message}>
            <Input {...form.register("fullName")} />
          </Field>
          <Field label="Work email" error={form.formState.errors.email?.message}>
            <Input type="email" {...form.register("email")} />
          </Field>
          <Field label="Role" error={form.formState.errors.role?.message}>
            <Input {...form.register("role")} />
          </Field>
          <Field label="Bio">
            <Textarea rows={2} {...form.register("bio")} />
          </Field>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </SectionCard>
  );
}

function CompanyCard() {
  const form = useForm<CompanyForm>({
    resolver: zodResolver(companySchema),
    defaultValues: { companyName: "Revora Studio", website: "https://revora.app", currency: "USD", timezone: "America/New_York" },
  });
  const onSubmit = form.handleSubmit(() => toast.success("Workspace updated"));

  return (
    <SectionCard title="Workspace" description="Details about your company shown on invoices and reports.">
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company name" error={form.formState.errors.companyName?.message}>
            <Input {...form.register("companyName")} />
          </Field>
          <Field label="Website" error={form.formState.errors.website?.message}>
            <Input placeholder="https://" {...form.register("website")} />
          </Field>
          <Field label="Currency">
            <Select value={form.watch("currency")} onValueChange={(v) => form.setValue("currency", v as CompanyForm["currency"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(["USD", "EUR", "GBP", "JPY"] as const).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Timezone">
            <Select value={form.watch("timezone")} onValueChange={(v) => form.setValue("timezone", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Berlin", "Asia/Tokyo"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </SectionCard>
  );
}

function NotificationsCard() {
  const [prefs, setPrefs] = React.useState({
    weeklyDigest: true,
    invoicePaid: true,
    invoiceOverdue: true,
    trialEnding: false,
    teamMentions: true,
  });
  return (
    <SectionCard title="Notifications" description="Choose what you want to be alerted about.">
      <div className="divide-y">
        {[
          { id: "weeklyDigest", title: "Weekly digest", body: "A Monday morning summary of revenue and outstanding work." },
          { id: "invoicePaid", title: "Invoice paid", body: "Notify when a customer pays an outstanding invoice." },
          { id: "invoiceOverdue", title: "Invoice overdue", body: "Daily reminder for invoices past their due date." },
          { id: "trialEnding", title: "Trial ending soon", body: "Alert two days before any active trial ends." },
          { id: "teamMentions", title: "Team mentions", body: "When someone @-mentions you on a customer or project note." },
        ].map((row) => (
          <div key={row.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="text-sm font-medium">{row.title}</p>
              <p className="text-xs text-muted-foreground">{row.body}</p>
            </div>
            <Switch
              checked={prefs[row.id as keyof typeof prefs]}
              onCheckedChange={(v) => setPrefs((p) => ({ ...p, [row.id]: v }))}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function TeamCard() {
  return (
    <SectionCard
      title="Team preferences"
      description="Default permissions for newly invited teammates."
      actions={<Button size="sm" variant="outline" className="gap-1.5"><Users className="h-4 w-4" /> Invite teammate</Button>}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <PrefRow title="Default role" value="Member" />
        <PrefRow title="Allow public sharing" value="Off" />
        <PrefRow title="Visible workspaces" value="All" />
        <PrefRow title="2FA enforcement" value="Required" />
      </div>
    </SectionCard>
  );
}

function BillingCard() {
  return (
    <SectionCard title="Billing plan" description="You are currently on the Scale plan, billed annually.">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-muted/30 p-4 lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Current plan</p>
              <p className="mt-1 text-lg font-semibold">Scale — $79 / seat / month</p>
              <p className="mt-1 text-xs text-muted-foreground">Renews on March 4, 2027 · 8 active seats</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
              <Check className="h-3 w-3" /> Active
            </span>
          </div>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Unlimited customers & invoices</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Advanced revenue analytics</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Role-based access control</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Priority support</li>
          </ul>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline">Compare plans</Button>
            <Button size="sm">Manage subscription</Button>
          </div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-2 text-sm font-medium"><CreditCard className="h-4 w-4" /> Payment method</div>
          <p className="mt-2 text-sm">Visa ending in 4242</p>
          <p className="text-xs text-muted-foreground">Expires 04 / 2028</p>
          <Button variant="outline" size="sm" className="mt-3">Update</Button>
        </div>
      </div>
    </SectionCard>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function PrefRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2.5">
      <span className="text-sm">{title}</span>
      <span className="text-xs font-medium text-muted-foreground">{value}</span>
    </div>
  );
}