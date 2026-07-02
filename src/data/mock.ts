import type {
  Customer, Invoice, Project, Transaction, TeamMember, ActivityItem, Insight, Service,
} from "@/types";

export const team: TeamMember[] = [
  { id: "u1", name: "Amelia Chen", role: "Account lead", initials: "AC" },
  { id: "u2", name: "Marcus Hale", role: "Operations", initials: "MH" },
  { id: "u3", name: "Priya Natarajan", role: "Designer", initials: "PN" },
  { id: "u4", name: "Jonas Weber", role: "Engineer", initials: "JW" },
  { id: "u5", name: "Sara Okafor", role: "Customer success", initials: "SO" },
  { id: "u6", name: "Theo Laurent", role: "Engineer", initials: "TL" },
];

export const customers: Customer[] = [
  { id: "c1", name: "Rachel Lim", company: "Northwind Studio", email: "rachel@northwind.co", status: "active", revenue: 48200, plan: "Growth", createdAt: "2024-02-11", lastActivity: "2 hours ago", industry: "Design agency", owner: "Amelia Chen" },
  { id: "c2", name: "David Okeke", company: "Helix Robotics", email: "d.okeke@helix.io", status: "active", revenue: 124500, plan: "Scale", createdAt: "2023-09-04", lastActivity: "Yesterday", industry: "Hardware", owner: "Marcus Hale" },
  { id: "c3", name: "Eva Lindqvist", company: "Aurora Press", email: "eva@aurorapress.se", status: "trial", revenue: 0, plan: "Starter", createdAt: "2026-06-14", lastActivity: "Today", industry: "Publishing", owner: "Sara Okafor" },
  { id: "c4", name: "Hiroshi Tanaka", company: "Mori Logistics", email: "h.tanaka@morilog.jp", status: "at_risk", revenue: 31800, plan: "Growth", createdAt: "2024-11-22", lastActivity: "12 days ago", industry: "Logistics", owner: "Amelia Chen" },
  { id: "c5", name: "Camille Royer", company: "Petit Atelier", email: "camille@petitatelier.fr", status: "active", revenue: 9600, plan: "Starter", createdAt: "2025-03-30", lastActivity: "3 hours ago", industry: "Retail", owner: "Sara Okafor" },
  { id: "c6", name: "Daniel Park", company: "Verge Capital", email: "dpark@verge.vc", status: "active", revenue: 215000, plan: "Enterprise", createdAt: "2022-08-18", lastActivity: "1 hour ago", industry: "Finance", owner: "Marcus Hale" },
  { id: "c7", name: "Lucia Romero", company: "Sol & Sand", email: "lucia@solandsand.com", status: "churned", revenue: 14200, plan: "Growth", createdAt: "2023-05-12", lastActivity: "2 months ago", industry: "Hospitality", owner: "Amelia Chen" },
  { id: "c8", name: "Noah Friedman", company: "Granite Legal", email: "noah@granitelegal.com", status: "active", revenue: 67400, plan: "Scale", createdAt: "2024-01-08", lastActivity: "Today", industry: "Legal", owner: "Marcus Hale" },
  { id: "c9", name: "Ines Ahmadi", company: "Cedar Health", email: "ines@cedarhealth.io", status: "trial", revenue: 0, plan: "Starter", createdAt: "2026-06-20", lastActivity: "Today", industry: "Healthcare", owner: "Sara Okafor" },
  { id: "c10", name: "Oliver Brandt", company: "Pinegrove Build", email: "oliver@pinegrove.co", status: "active", revenue: 38900, plan: "Growth", createdAt: "2024-07-19", lastActivity: "5 hours ago", industry: "Construction", owner: "Amelia Chen" },
  { id: "c11", name: "Yuki Sato", company: "Kanso Studio", email: "yuki@kansostudio.jp", status: "at_risk", revenue: 22100, plan: "Growth", createdAt: "2024-04-02", lastActivity: "8 days ago", industry: "Design agency", owner: "Sara Okafor" },
  { id: "c12", name: "Aisha Bello", company: "Vela Media", email: "aisha@velamedia.co", status: "active", revenue: 54300, plan: "Scale", createdAt: "2023-12-01", lastActivity: "Yesterday", industry: "Media", owner: "Marcus Hale" },
];

export const invoices: Invoice[] = [
  { id: "i1", invoiceNumber: "INV-2026-0142", customerName: "Verge Capital", amount: 18500, status: "paid", issuedDate: "2026-06-01", dueDate: "2026-06-15", paymentMethod: "Bank transfer", service: "Quarterly retainer" },
  { id: "i2", invoiceNumber: "INV-2026-0141", customerName: "Helix Robotics", amount: 9200, status: "paid", issuedDate: "2026-06-02", dueDate: "2026-06-16", paymentMethod: "ACH", service: "Implementation" },
  { id: "i3", invoiceNumber: "INV-2026-0140", customerName: "Granite Legal", amount: 4800, status: "pending", issuedDate: "2026-06-10", dueDate: "2026-06-30", paymentMethod: "Card", service: "Monthly subscription" },
  { id: "i4", invoiceNumber: "INV-2026-0139", customerName: "Mori Logistics", amount: 2650, status: "overdue", issuedDate: "2026-05-12", dueDate: "2026-05-26", paymentMethod: "Bank transfer", service: "Onboarding" },
  { id: "i5", invoiceNumber: "INV-2026-0138", customerName: "Vela Media", amount: 6400, status: "paid", issuedDate: "2026-06-04", dueDate: "2026-06-18", paymentMethod: "Card", service: "Monthly subscription" },
  { id: "i6", invoiceNumber: "INV-2026-0137", customerName: "Northwind Studio", amount: 3200, status: "pending", issuedDate: "2026-06-12", dueDate: "2026-06-28", paymentMethod: "Card", service: "Add-on seats" },
  { id: "i7", invoiceNumber: "INV-2026-0136", customerName: "Pinegrove Build", amount: 7500, status: "draft", issuedDate: "2026-06-25", dueDate: "2026-07-10", paymentMethod: "—", service: "Custom integration" },
  { id: "i8", invoiceNumber: "INV-2026-0135", customerName: "Cedar Health", amount: 0, status: "draft", issuedDate: "2026-06-26", dueDate: "2026-07-10", paymentMethod: "—", service: "Trial conversion" },
  { id: "i9", invoiceNumber: "INV-2026-0134", customerName: "Petit Atelier", amount: 1200, status: "paid", issuedDate: "2026-06-05", dueDate: "2026-06-19", paymentMethod: "Card", service: "Monthly subscription" },
  { id: "i10", invoiceNumber: "INV-2026-0133", customerName: "Kanso Studio", amount: 4100, status: "overdue", issuedDate: "2026-05-08", dueDate: "2026-05-22", paymentMethod: "Bank transfer", service: "Quarterly retainer" },
];

export const transactions: Transaction[] = [
  { id: "t1", customer: "Verge Capital", amount: 18500, type: "subscription", date: "2026-06-15", status: "succeeded" },
  { id: "t2", customer: "Helix Robotics", amount: 9200, type: "one-time", date: "2026-06-14", status: "succeeded" },
  { id: "t3", customer: "Vela Media", amount: 6400, type: "subscription", date: "2026-06-12", status: "succeeded" },
  { id: "t4", customer: "Northwind Studio", amount: 3200, type: "subscription", date: "2026-06-11", status: "pending" },
  { id: "t5", customer: "Petit Atelier", amount: 1200, type: "subscription", date: "2026-06-09", status: "succeeded" },
  { id: "t6", customer: "Mori Logistics", amount: -450, type: "refund", date: "2026-06-08", status: "succeeded" },
  { id: "t7", customer: "Granite Legal", amount: 4800, type: "subscription", date: "2026-06-07", status: "succeeded" },
];

export const projects: Project[] = [
  { id: "p1", title: "Brand refresh — phase 2", client: "Vela Media", budget: 28000, status: "in_progress", priority: "high", progress: 62, dueDate: "2026-07-15", assignedTeam: ["u3", "u1"], type: "Design", description: "Update brand system, motion guidelines, and customer-facing assets." },
  { id: "p2", title: "Billing portal integration", client: "Helix Robotics", budget: 42000, status: "in_progress", priority: "high", progress: 48, dueDate: "2026-07-30", assignedTeam: ["u4", "u6"], type: "Engineering", description: "Stripe billing and customer portal embed inside the operations app." },
  { id: "p3", title: "Onboarding redesign", client: "Granite Legal", budget: 16500, status: "review", priority: "medium", progress: 88, dueDate: "2026-07-05", assignedTeam: ["u3", "u5"], type: "Product", description: "Reduce first-week drop-off with a new guided onboarding flow." },
  { id: "p4", title: "Quarterly business review", client: "Verge Capital", budget: 9000, status: "discovery", priority: "medium", progress: 12, dueDate: "2026-08-12", assignedTeam: ["u1"], type: "Strategy", description: "Prepare Q3 review deck and revenue narrative." },
  { id: "p5", title: "Warehouse data pipeline", client: "Mori Logistics", budget: 36000, status: "discovery", priority: "low", progress: 5, dueDate: "2026-09-01", assignedTeam: ["u4"], type: "Engineering", description: "Migrate from batch to streaming events for shipment tracking." },
  { id: "p6", title: "Marketing site refresh", client: "Northwind Studio", budget: 12000, status: "completed", priority: "medium", progress: 100, dueDate: "2026-06-10", assignedTeam: ["u3"], type: "Design", description: "Three-page refresh with new pricing module." },
  { id: "p7", title: "Annual security review", client: "Verge Capital", budget: 22000, status: "review", priority: "high", progress: 76, dueDate: "2026-07-20", assignedTeam: ["u2", "u6"], type: "Operations", description: "SOC 2 readiness checklist and access audit." },
  { id: "p8", title: "Customer interviews", client: "Cedar Health", budget: 4500, status: "in_progress", priority: "low", progress: 35, dueDate: "2026-07-22", assignedTeam: ["u5"], type: "Research", description: "Six interviews with clinical operations leads." },
];

export const services: Service[] = [
  { id: "s1", name: "Growth subscription", revenue: 184200, customers: 38 },
  { id: "s2", name: "Scale subscription", revenue: 142800, customers: 14 },
  { id: "s3", name: "Implementation", revenue: 96500, customers: 9 },
  { id: "s4", name: "Quarterly retainer", revenue: 74000, customers: 6 },
  { id: "s5", name: "Custom integration", revenue: 41200, customers: 4 },
];

export const activity: ActivityItem[] = [
  { id: "a1", actor: "Amelia Chen", action: "closed deal with", target: "Verge Capital — $18,500", time: "12 min ago" },
  { id: "a2", actor: "Marcus Hale", action: "sent invoice", target: "INV-2026-0142", time: "1 hr ago" },
  { id: "a3", actor: "Sara Okafor", action: "moved", target: "Cedar Health to trial extended", time: "3 hr ago" },
  { id: "a4", actor: "Priya Natarajan", action: "shared review for", target: "Brand refresh — phase 2", time: "Yesterday" },
  { id: "a5", actor: "Jonas Weber", action: "merged change in", target: "Billing portal integration", time: "Yesterday" },
  { id: "a6", actor: "Theo Laurent", action: "flagged", target: "Mori Logistics as at risk", time: "2 days ago" },
];

export const insights: Insight[] = [
  { id: "in1", title: "Growth plan is driving net new revenue", body: "Growth tier added $24.2k in the last 30 days, 38% more than the prior period. Two trial accounts on this plan are likely to convert this week.", tone: "positive" },
  { id: "in2", title: "Three accounts trending toward churn", body: "Mori Logistics, Kanso Studio, and one trial have logged no activity in 8+ days. Consider a check-in from the account team.", tone: "warning" },
  { id: "in3", title: "Overdue invoices stable", body: "Two invoices are overdue this month, in line with your three-month average. Average days-to-pay is 11.", tone: "neutral" },
];

export const revenueByMonth = [
  { month: "Jan", revenue: 78400, expenses: 41200 },
  { month: "Feb", revenue: 82100, expenses: 42600 },
  { month: "Mar", revenue: 88900, expenses: 44100 },
  { month: "Apr", revenue: 94200, expenses: 45800 },
  { month: "May", revenue: 102600, expenses: 47300 },
  { month: "Jun", revenue: 118400, expenses: 49600 },
];

export const customerGrowth = [
  { month: "Jan", customers: 84, churned: 3 },
  { month: "Feb", customers: 91, churned: 2 },
  { month: "Mar", customers: 98, churned: 4 },
  { month: "Apr", customers: 106, churned: 2 },
  { month: "May", customers: 117, churned: 3 },
  { month: "Jun", customers: 129, churned: 2 },
];

export const conversionFunnel = [
  { stage: "Visitors", value: 12400 },
  { stage: "Sign-ups", value: 2180 },
  { stage: "Trials", value: 612 },
  { stage: "Paid", value: 184 },
];

export const leadSources = [
  { name: "Referral", value: 38 },
  { name: "Organic search", value: 27 },
  { name: "Outbound", value: 18 },
  { name: "Events", value: 11 },
  { name: "Partners", value: 6 },
];

export const revenueByCategory = [
  { name: "Subscriptions", value: 327000 },
  { name: "Implementation", value: 96500 },
  { name: "Retainers", value: 74000 },
  { name: "Integrations", value: 41200 },
];

export const invoiceStatusBreakdown = [
  { name: "Paid", value: 42 },
  { name: "Pending", value: 11 },
  { name: "Overdue", value: 4 },
  { name: "Draft", value: 6 },
];