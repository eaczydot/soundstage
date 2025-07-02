# Fey Finance UI – Screenshot Analysis & Adaptation Plan for Soundstage

## 1. Global Aesthetic & Design Language

**Observed**
• Deep-black backgrounds (#0D0D0D – #131313) with subtle gradients.<br>
• High-contrast accent colours (electric green, purple, cyan).<br>
• Thin sans-serif typography with generous letter-spacing.<br>
• Dense shadows + glass-morphism hover states.<br>
• Fixed, floating navigation dock at the bottom for primary sections.

**Adaptation**
• Adopt the same monochrome foundation for all Soundstage surfaces, reserving vibrant accents for primary CTAs (e.g. "Create Booking", "Send Invoice").<br>
• Implement a global **`<BottomDock />`** component that houses Home, Bookings, Calendar, Payments, Messages and Settings.

---

## 2. Home Dashboard

| Fey Element | Purpose | Soundstage Counter-Part |
|-------------|---------|-------------------------|
| Greeting card ("Hello, Evan") + market sentiment headline | Immediate context + daily snapshot | "Hello, *ArtistName*" + "You have _n_ upcoming shows this week" |
| S&P500 spark-line + time-frame switcher | Quick visual momentum | Revenue (or Ticket Sales) over selectable ranges (1M/3M/YTD) |
| Sector performance list | Drill-down into segment specifics | **Gig categories** or **Venue types** list showing booking ratio (+ colour-coded bar) |
| Daily recap card | News summarisation | **"Daily tasks"** or **"Industry recap"** (AI-generated tips, contract reminders) |

Implementation tasks:
1. Create `DashboardRevenueChart` mirroring the spark-line component (use **Recharts** / **VisX** + Tailwind dark theme).
2. Build `CategoryPerformanceList` styled as Fey's sector table.
3. Introduce `DailyRecapCard` fed by `openai.chatCompletion` summarising recent bookings/contracts.

---

## 3. Bookings Finder (Inspired by "Stock Finder")

**Observed**
• Sticky table header, compact rows, pill-badges, sortable columns, top-right "Start searching" CTA.

**Adaptation**
• Rename to **"Gig Finder"**. Columns:  
  • **Venue** (avatar + name)  
  • **Location**  
  • **Date**  
  • **Status** (pill)  
  • **Fee**  
  • **1-Day Change** → remove / replace with **Urgency** %.
• Top CTA becomes **"New enquiry"** opening the global command menu.
• Build `GigTable` component extending existing `Table` in `app/components/ui/table.tsx` with dark row hover.

---

## 4. Portfolio Sync Page

Fey shows two large, centred cards ("Add your portfolio" & "Sync with Plaid").

**Adaptation**
• "Add your portfolio" → **"Add your repertoire"** (manual song list upload).  
• "Sync with Plaid" → **"Import from Spotify/Apple Music"** – OAuth flow saved in `services/integrations.ts`.
• Use same centred layout to keep onboarding frictionless.

---

## 5. Graph Comparison

**Observed**
• Left sidebar with suggested symbols, multi-select pills, responsive line graph, timeframe toggle (1D…10Y).

**Adaptation**
• Build **`PerformanceComparison`** allowing artists to overlay metrics (Ticket Sales vs. Merch Sales vs. Social Media Engagement).
• Use timeframe chips identical to Fey.
• Keep mini-series legend below with min/avg/max + spark-lines.

---

## 6. Earnings Page

• Replace "Confirmed events" calendar with **upcoming payout milestones**.
• Keep bar chart for **recent payouts vs. expected** (brown vs. white bars → paid vs. pending).
• List "Latest popular events" becomes **recent high-value gigs**.

---

## 7. Settings & Billing

Fey combines account info, options toggles, billing summary & "wallet" card.

**Adaptation**
• Use same tiling for subscription tier (Pro/Agency) + payment method.
• Add toggle to **hide navigation hints** and **dark-light switch**.
• Incorporate referral program card identical to Fey's design.

---

## 8. Stock Detail → Booking Detail

Elements to port:
1. Hero price chart → **Gig timeline** (soundcheck → doors → set time).  
2. Dividend graph → **Past payout amounts** (bar = amount, white line = payout yield).  
3. Peer analysis → **Similar venues** table (EV/sales ↔ capacity utilisation).

Implementation tasks:
• Build `VenuePeerAnalysis` utilising current `venue-analytics.tsx` but styled after Fey.
• Introduce `PayoutYieldChart` (Stacked bars + line overlay) using car-like colour palette.

---

## 9. Navigation & Micro-Interactions

• Hover shadows (RGBA(255,255,255,0.05)) and scale-up 1.03 on cards.
• Command-K search overlays with blurred backdrop like Fey's stock search modal.
• Keyboard navigation hints shown bottom-left (`⌘1`, `⌘2` ...) replicating Fey's.

---

## 10. Implementation Road-map (0-2 Weeks)

1. **Theme Layer**: Configure `tailwind.config.ts` with new colour tokens (`fey-bg`, `fey-card`, `fey-accent`).
2. **Bottom Dock**: Create responsive dock, hide on desktop (use `use-mobile.tsx`).
3. **Dashboard Widgets**: Build *RevenueChart*, *CategoryPerformanceList*, *DailyRecapCard*.
4. **Gig Finder Table** with column definitions + sorting.
5. **PerformanceComparison** page with multi-select graph.
6. **Refactor Settings** to mimic Fey's panel design.

After completion, run UX audit with 3 musicians for feedback.

---

*This adaptation plan draws heavily on Fey Finance's minimalist finance-dashboard aesthetic while staying true to Soundstage's core mission: simplifying bookings, payments & analytics for musicians and venues.*