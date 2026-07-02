export type CustomerStatus = "active" | "trial" | "at_risk" | "churned";
export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  status: CustomerStatus;
  revenue: number;
  plan: "Starter" | "Growth" | "Scale" | "Enterprise";
  createdAt: string;
  lastActivity: string;
  industry: string;
  owner: string;
}

export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
  paymentMethod: "Card" | "Bank transfer" | "ACH" | "Wire" | "—";
  service: string;
  notes?: string;
}

export type ProjectStatus = "discovery" | "in_progress" | "review" | "completed";
export type Priority = "low" | "medium" | "high";
export interface Project {
  id: string;
  title: string;
  client: string;
  budget: number;
  status: ProjectStatus;
  priority: Priority;
  progress: number;
  dueDate: string;
  assignedTeam: string[];
  type: string;
  description: string;
}

export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  type: "subscription" | "one-time" | "refund";
  date: string;
  status: "succeeded" | "pending" | "failed";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
}

export interface Insight {
  id: string;
  title: string;
  body: string;
  tone: "positive" | "neutral" | "warning";
}

export interface Service {
  id: string;
  name: string;
  revenue: number;
  customers: number;
}