# Revora Analytics

> Revenue, customers, invoices, and team work in one calm dashboard.

Revora is a portfolio-grade revenue analytics and operations dashboard for small businesses, sales teams, freelancers, and agencies. It demonstrates a realistic, production-quality SaaS UI built with React, TypeScript, and a modern UI stack — no marketing fluff, no AI gimmicks, just a calm, data-first product.

## Live demo

- **Demo:** _add your deployed URL here_
- **Demo credentials:** any email / any password (UI only, no real auth)

## Screenshots

_Add screenshots of the following views to `/docs/screenshots/` and link them here:_

- Business overview (`/dashboard`)
- Customers (`/dashboard/customers`)
- Invoices (`/dashboard/invoices`)
- Projects kanban (`/dashboard/projects`)
- Revenue analytics (`/dashboard/analytics`)
- Settings (`/dashboard/settings`)
- Login (`/login`)

## Key features

- Calm, mature, finance-first visual style — clearly different from generic purple "AI SaaS" templates.
- Full responsive dashboard shell with collapsible sidebar, topbar search, notifications, and user menu.
- Light and dark mode with carefully tuned chart, status, and surface tokens.
- Realistic mock data: customers, invoices, transactions, projects, team, services, insights, and time-series analytics.
- Business overview with 6 KPI cards, revenue/expenses chart, customer growth, conversion funnel, cash flow, recent transactions, top services, team activity, and insights.
- Customers page with searchable, status-filterable table, detail drawer, and validated "Add customer" form.
- Invoices page with status filters, search, summary metrics, detail drawer, and validated "Create invoice" form.
- Kanban-style projects board with priority badges, team avatars, progress, budgets, and a project detail drawer.
- Revenue analytics with multiple Recharts visualisations (area, bar, horizontal bar, line, donut).
- Settings with tabbed Profile, Workspace, Notifications, and Billing sections — all forms validated with Zod.
- Empty states for every filtered surface.
- Accessible labels, keyboard-friendly navigation, semantic landmarks, and `prefers-reduced-motion`-friendly transitions.

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **TanStack Router** (file-based routing) and **TanStack Start**
- **Tailwind CSS v4** with a custom design-token theme
- **shadcn/ui** primitives on top of **Radix UI**
- **Lucide React** icons
- **Recharts** for data visualisation
- **React Hook Form** + **Zod** for forms and validation
- **Sonner** for toasts
- Mock data only — no backend required

> The project description mentions React Router; this app uses TanStack Router (the same patterns: file-based routes, `<Link>`, active-route detection). Either is appropriate for portfolio work.

## Pages

| Route                     | Purpose                                                                 |
| ------------------------- | ----------------------------------------------------------------------- |
| `/`                       | Welcome page with links to the dashboard and the login screen.          |
| `/login`                  | Premium login UI with email/password, "Continue with Google", demo note. |
| `/dashboard`              | Business overview: KPIs, revenue chart, cash flow, transactions, team activity, insights. |
| `/dashboard/customers`    | Customer directory with search, status filter, detail drawer, add form. |
| `/dashboard/invoices`     | Invoice ledger with status filter, search, detail drawer, create form.  |
| `/dashboard/projects`     | Kanban board across Discovery / In progress / Review / Completed.       |
| `/dashboard/analytics`    | Revenue analytics with multiple charts and KPI cards.                   |
| `/dashboard/settings`     | Profile, Workspace, Notifications, and Billing tabs.                    |

## Component architecture

```
src/
├─ components/
│  ├─ charts/          # Recharts wrappers (RevenueAreaChart, CustomerGrowthChart, CategoryDonut)
│  ├─ dashboard/       # AppSidebar, Topbar, PageHeader, MetricCard, StatusBadge, EmptyState, …
│  └─ ui/              # shadcn/ui primitives
├─ data/mock.ts        # Realistic seed data used across the app
├─ lib/                # theme provider, formatters, utils
├─ routes/             # File-based routes (TanStack Router)
├─ types/              # Domain interfaces (Customer, Invoice, Project, Transaction, …)
└─ styles.css          # Tailwind v4 theme tokens (light + dark)
```

Every page consumes the same primitives:

- **PageHeader / SectionCard** for consistent spacing and chrome.
- **MetricCard** for KPI tiles with delta indicators.
- **StatusBadge** for semantically toned status pills (success / info / warning / destructive / neutral).
- **EmptyState** for "no results" surfaces.

## Mock data architecture

All data lives in `src/data/mock.ts` and is typed by `src/types/index.ts`:

- `customers`, `invoices`, `transactions`, `projects`, `team`, `services`, `insights`, `activity`
- `revenueByMonth`, `customerGrowth`, `conversionFunnel`, `leadSources`, `revenueByCategory`, `invoiceStatusBreakdown`

Filters, search, and forms operate fully client-side on these arrays — there is no backend or fetch layer to mock.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build locally
```

Node 18+ is recommended.

## Deployment

The app builds to a static bundle and deploys cleanly to Vercel, Netlify, Cloudflare Pages, or any static host.

- **Vercel:** import the repo; framework preset "Vite". Build command `npm run build`, output `dist/`.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Cloudflare Pages:** same as above.

## Engineering highlights

- **Reusable dashboard shell** — `AppSidebar` + `Topbar` + `SectionCard` cleanly compose every page.
- **Typed mock data architecture** — every dataset has an interface; pages destructure typed records.
- **Recharts with theme tokens** — charts read from `var(--color-chart-*)` so light/dark mode just works.
- **Tables with filters** — Customers and Invoices filter and search on the client without re-renders or re-fetches.
- **Forms with React Hook Form + Zod** — Add customer, Create invoice, Profile, and Workspace all share the same pattern.
- **Responsive layout** — sidebar collapses below `lg`, tables scroll horizontally on narrow screens, kanban stacks on mobile.
- **Dark mode** — full second palette via a CSS-variable theme with a persistent `localStorage`-backed toggle.
- **Accessibility** — semantic landmarks, labelled inputs, accessible Radix primitives, focus-visible rings.

## What I learned

- How to design a calm, mature B2B aesthetic that does **not** look like a generic AI SaaS template.
- How to structure a multi-page dashboard with shared primitives so every page reads the same way.
- How to wire Recharts to a token-based theme so charts look intentional in both light and dark mode.
- How to keep forms, drawers, filters, and tables small and composable instead of growing one mega-component.

## Suggested future improvements

- Replace mock data with a real API layer (TanStack Query is already wired up).
- Add server-side pagination and column sorting to the data tables.
- Persist UI state (filters, theme, sidebar) per user.
- Add a command palette (`cmdk`) for fast navigation.
- Add export-to-CSV for tables and reports.
- Add unit tests around filters, formatters, and form schemas.

## License

MIT — use freely for learning, portfolios, and starting points.