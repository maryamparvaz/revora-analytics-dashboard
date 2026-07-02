import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText, Plus, Search } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/dashboard/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge, statusLabel, statusTone } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { invoices as seed } from "@/data/mock";
import type { Invoice, InvoiceStatus } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";

export const Route = createFileRoute("/dashboard/invoices")({
  head: () => ({ meta: [{ title: "Invoices — Revora" }] }),
  component: InvoicesPage,
});

const invoiceSchema = z.object({
  customerName: z.string().trim().min(2, "Enter a customer").max(80),
  service: z.string().trim().min(2, "Add a service description").max(80),
  amount: z.coerce.number().positive("Amount must be greater than 0").max(1_000_000),
  dueDate: z.string().min(1, "Pick a due date"),
  notes: z.string().max(500).optional(),
});
type InvoiceForm = z.infer<typeof invoiceSchema>;

function InvoicesPage() {
  const [list, setList] = React.useState<Invoice[]>(seed);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all" | InvoiceStatus>("all");
  const [selected, setSelected] = React.useState<Invoice | null>(null);
  const [open, setOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter((i) => {
      const matchStatus = status === "all" || i.status === status;
      const matchQuery = !q || i.invoiceNumber.toLowerCase().includes(q) || i.customerName.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [list, query, status]);

  const totals = React.useMemo(() => {
    const sum = (s: InvoiceStatus) => list.filter((i) => i.status === s).reduce((a, b) => a + b.amount, 0);
    return {
      total: list.reduce((a, b) => a + b.amount, 0),
      paid: sum("paid"),
      pending: sum("pending"),
      overdue: sum("overdue"),
    };
  }, [list]);

  const form = useForm<InvoiceForm>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { customerName: "", service: "", amount: 0, dueDate: "", notes: "" },
  });

  const onSubmit = form.handleSubmit((v) => {
    const id = `i${Date.now()}`;
    const num = `INV-2026-${String(150 + list.length).padStart(4, "0")}`;
    setList((arr) => [{
      id,
      invoiceNumber: num,
      customerName: v.customerName,
      amount: v.amount,
      status: "draft",
      issuedDate: new Date().toISOString().slice(0, 10),
      dueDate: v.dueDate,
      paymentMethod: "—",
      service: v.service,
      notes: v.notes,
    }, ...arr]);
    form.reset();
    setOpen(false);
    toast.success(`${num} created as draft`);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Track outstanding amounts, payment status, and recent activity."
        actions={
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New invoice</Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Create invoice</SheetTitle>
                <SheetDescription>Drafts can be edited before sending to the customer.</SheetDescription>
              </SheetHeader>
              <form className="mt-4 space-y-4 px-4" onSubmit={onSubmit} noValidate>
                <Field label="Customer" error={form.formState.errors.customerName?.message}>
                  <Input {...form.register("customerName")} placeholder="Verge Capital" />
                </Field>
                <Field label="Service" error={form.formState.errors.service?.message}>
                  <Input {...form.register("service")} placeholder="Quarterly retainer" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Amount (USD)" error={form.formState.errors.amount?.message}>
                    <Input type="number" min={0} step="100" {...form.register("amount")} />
                  </Field>
                  <Field label="Due date" error={form.formState.errors.dueDate?.message}>
                    <Input type="date" {...form.register("dueDate")} />
                  </Field>
                </div>
                <Field label="Notes (optional)">
                  <Textarea rows={3} {...form.register("notes")} placeholder="Add a private note for your team." />
                </Field>
                <SheetFooter className="px-0">
                  <Button type="submit" className="w-full">Save draft</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Total invoiced" value={formatCurrency(totals.total)} helper="Last 90 days" />
        <MetricCard label="Paid" value={formatCurrency(totals.paid)} delta={9.2} helper="Cleared payments" />
        <MetricCard label="Pending" value={formatCurrency(totals.pending)} helper="Awaiting payment" />
        <MetricCard label="Overdue" value={formatCurrency(totals.overdue)} delta={-1.4} helper="Past due date" />
      </div>

      <SectionCard>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by invoice number or customer" className="h-9 pl-8" />
          </div>
          <Tabs value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-4 overflow-x-auto">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-4 w-4" />}
              title="No invoices match these filters"
              description="Try a different search or clear the status filter."
              action={<Button size="sm" variant="outline" onClick={() => { setQuery(""); setStatus("all"); }}>Reset filters</Button>}
            />
          ) : (
            <table className="w-full min-w-[760px] text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2.5 pr-3 text-left font-medium">Invoice</th>
                  <th className="py-2.5 pr-3 text-left font-medium">Customer</th>
                  <th className="py-2.5 pr-3 text-left font-medium">Status</th>
                  <th className="py-2.5 pr-3 text-left font-medium">Payment</th>
                  <th className="py-2.5 pr-3 text-left font-medium">Due</th>
                  <th className="py-2.5 pl-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((i) => (
                  <tr key={i.id} className="cursor-pointer border-b last:border-b-0 hover:bg-muted/40" onClick={() => setSelected(i)}>
                    <td className="py-3 pr-3">
                      <div className="font-medium">{i.invoiceNumber}</div>
                      <div className="text-xs text-muted-foreground">{i.service}</div>
                    </td>
                    <td className="py-3 pr-3 text-muted-foreground">{i.customerName}</td>
                    <td className="py-3 pr-3"><StatusBadge tone={statusTone(i.status)}>{statusLabel(i.status)}</StatusBadge></td>
                    <td className="py-3 pr-3 text-muted-foreground">{i.paymentMethod}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{formatDate(i.dueDate)}</td>
                    <td className="py-3 pl-3 text-right tabular-nums font-medium">{formatCurrency(i.amount)}</td>
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
                <SheetTitle>{selected.invoiceNumber}</SheetTitle>
                <SheetDescription>{selected.customerName} · {selected.service}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 px-4 pb-4">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Amount due</div>
                      <div className="mt-1 text-2xl font-semibold tabular-nums">{formatCurrency(selected.amount)}</div>
                    </div>
                    <StatusBadge tone={statusTone(selected.status)}>{statusLabel(selected.status)}</StatusBadge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <KV label="Issued" value={formatDate(selected.issuedDate)} />
                  <KV label="Due" value={formatDate(selected.dueDate)} />
                  <KV label="Payment method" value={selected.paymentMethod} />
                  <KV label="Service" value={selected.service} />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">Download PDF</Button>
                  <Button size="sm" className="flex-1">Send reminder</Button>
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
function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 px-3 py-2.5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}