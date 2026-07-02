import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Search, Users, UserCheck, AlertTriangle, DollarSign } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/dashboard/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge, statusLabel, statusTone } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription, SheetFooter,
} from "@/components/ui/sheet";
import {
  Tabs, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { customers as seed } from "@/data/mock";
import type { Customer, CustomerStatus } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";

export const Route = createFileRoute("/dashboard/customers")({
  head: () => ({ meta: [{ title: "Customers — Revora" }] }),
  component: CustomersPage,
});

const newCustomerSchema = z.object({
  name: z.string().trim().min(2, "Enter a name").max(80),
  company: z.string().trim().min(2, "Enter a company").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  plan: z.enum(["Starter", "Growth", "Scale", "Enterprise"]),
  industry: z.string().trim().min(2, "Enter an industry").max(60),
});
type NewCustomer = z.infer<typeof newCustomerSchema>;

function CustomersPage() {
  const [list, setList] = React.useState<Customer[]>(seed);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all" | CustomerStatus>("all");
  const [selected, setSelected] = React.useState<Customer | null>(null);
  const [openAdd, setOpenAdd] = React.useState(false);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter((c) => {
      const matchesStatus = status === "all" || c.status === status;
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [list, query, status]);

  const totals = React.useMemo(() => {
    const active = list.filter((c) => c.status === "active").length;
    const avg = list.length ? Math.round(list.reduce((s, c) => s + c.revenue, 0) / list.length) : 0;
    const risk = list.filter((c) => c.status === "at_risk" || c.status === "churned").length;
    return { total: list.length, active, avg, risk };
  }, [list]);

  const form = useForm<NewCustomer>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: { name: "", company: "", email: "", plan: "Growth", industry: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    const c: Customer = {
      id: `c${Date.now()}`,
      ...values,
      status: "trial",
      revenue: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      lastActivity: "Just now",
      owner: "Amelia Chen",
    };
    setList((l) => [c, ...l]);
    setOpenAdd(false);
    form.reset();
    toast.success(`${values.company} added to customers`);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Accounts, plans, and recent activity across your book of business."
        actions={
          <Sheet open={openAdd} onOpenChange={setOpenAdd}>
            <SheetTrigger asChild>
              <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Add customer</Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>New customer</SheetTitle>
                <SheetDescription>Add a customer to begin tracking revenue and activity.</SheetDescription>
              </SheetHeader>
              <form className="mt-4 space-y-4 px-4" onSubmit={onSubmit} noValidate>
                <Field label="Contact name" error={form.formState.errors.name?.message}>
                  <Input {...form.register("name")} placeholder="Ada Bello" />
                </Field>
                <Field label="Company" error={form.formState.errors.company?.message}>
                  <Input {...form.register("company")} placeholder="Bello & Co" />
                </Field>
                <Field label="Work email" error={form.formState.errors.email?.message}>
                  <Input type="email" {...form.register("email")} placeholder="ada@bello.co" />
                </Field>
                <Field label="Plan">
                  <Select value={form.watch("plan")} onValueChange={(v) => form.setValue("plan", v as NewCustomer["plan"])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(["Starter", "Growth", "Scale", "Enterprise"] as const).map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Industry" error={form.formState.errors.industry?.message}>
                  <Input {...form.register("industry")} placeholder="Design agency" />
                </Field>
                <SheetFooter className="px-0">
                  <Button type="submit" className="w-full">Save customer</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Total customers" value={String(totals.total)} icon={<Users className="h-4 w-4" />} helper="Across all plans" />
        <MetricCard label="Active" value={String(totals.active)} icon={<UserCheck className="h-4 w-4" />} delta={4.2} helper="Paying this month" />
        <MetricCard label="Avg. account value" value={formatCurrency(totals.avg)} icon={<DollarSign className="h-4 w-4" />} helper="Lifetime revenue" />
        <MetricCard label="At risk / churned" value={String(totals.risk)} icon={<AlertTriangle className="h-4 w-4" />} helper="Needs attention" />
      </div>

      <SectionCard>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, company, or email" className="h-9 pl-8" />
          </div>
          <Tabs value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="trial">Trial</TabsTrigger>
              <TabsTrigger value="at_risk">At risk</TabsTrigger>
              <TabsTrigger value="churned">Churned</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-4 overflow-x-auto">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Users className="h-4 w-4" />}
              title="No customers match these filters"
              description="Try a different search term or clear the status filter."
              action={<Button variant="outline" size="sm" onClick={() => { setQuery(""); setStatus("all"); }}>Reset filters</Button>}
            />
          ) : (
            <table className="w-full min-w-[760px] text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2.5 pr-3 text-left font-medium">Customer</th>
                  <th className="py-2.5 pr-3 text-left font-medium">Plan</th>
                  <th className="py-2.5 pr-3 text-left font-medium">Status</th>
                  <th className="py-2.5 pr-3 text-left font-medium">Owner</th>
                  <th className="py-2.5 pr-3 text-left font-medium">Last activity</th>
                  <th className="py-2.5 pl-3 text-right font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="cursor-pointer border-b last:border-b-0 hover:bg-muted/40" onClick={() => setSelected(c)}>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{initials(c.name)}</AvatarFallback></Avatar>
                        <div className="min-w-0">
                          <div className="truncate font-medium">{c.company}</div>
                          <div className="truncate text-xs text-muted-foreground">{c.name} · {c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.plan}</td>
                    <td className="py-3 pr-3"><StatusBadge tone={statusTone(c.status)}>{statusLabel(c.status)}</StatusBadge></td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.owner}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.lastActivity}</td>
                    <td className="py-3 pl-3 text-right tabular-nums font-medium">{formatCurrency(c.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </SectionCard>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.company}</SheetTitle>
                <SheetDescription>{selected.industry} · Customer since {formatDate(selected.createdAt)}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 px-4 pb-4">
                <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                  <Avatar className="h-10 w-10"><AvatarFallback>{initials(selected.name)}</AvatarFallback></Avatar>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{selected.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{selected.email}</div>
                  </div>
                  <StatusBadge tone={statusTone(selected.status)} className="ml-auto">{statusLabel(selected.status)}</StatusBadge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Plan" value={selected.plan} />
                  <Stat label="Owner" value={selected.owner} />
                  <Stat label="Lifetime revenue" value={formatCurrency(selected.revenue)} />
                  <Stat label="Last activity" value={selected.lastActivity} />
                </div>

                <SectionCard title="Recent notes">
                  <ul className="space-y-3 text-sm">
                    <li className="border-l-2 border-info pl-3"><span className="font-medium">Q3 expansion call</span> scheduled for next Tuesday.</li>
                    <li className="border-l-2 border-muted pl-3 text-muted-foreground">Renewal in 47 days. No blockers from procurement.</li>
                  </ul>
                </SectionCard>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">Log activity</Button>
                  <Button size="sm" className="flex-1">Open account</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 px-3 py-2.5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}