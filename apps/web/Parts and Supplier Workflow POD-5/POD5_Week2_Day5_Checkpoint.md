## Pod 5 – Week 2 Demo Checkpoint

####  What is working
* **Day 1: Architecture & Lifecycle Validation**
  * Fully mapped and confirmed the database table relationship paths spanning `JobCard` ->`PartsRequest` -> `SupplierResponse` -> `PartsOrder` ->`PartsDelivery`.
  * Established workflow state definitions using system enums (`partsRequestStatusEnum`, `partsOrderStatusEnum`, `deliveryStatusEnum`) to ensure consistent multi-tenant tracing.

* **Day 2: UI Skeletons & Metric Layouts**
  * Built the `PartsRequestForm` skeleton containing user inputs for Part Name, Part Number, Quantity, and Notes.
  * Constructed the `SupplierDashboard` view layout featuring status cards tracking Pending Requests, Submitted Responses, and Orders Awaiting Dispatch.
  * Mounted visual mock templates (`MarketplacePanel` and `PartsPanel`) inside the `MvpShowcase` runtime dashboard for localized prototype testing.

* **Day 3: Isolated ORM & Relational APIs**
  * Safely isolated and initialized Drizzle ORM and the `pg` driver within the `apps/web` workspace folder to insulate the rest of the monorepo.
  * Built fully operational transactional endpoints for `/api/parts-request` and `/api/supplier-response` (supporting both filtered GET lookups and relational multi-row POST executions) tested successfully via Thunder Client.

* **Days 4 & 5: Diagnostic Telemetry**
  * Configured engine telemetry inside `drizzle.config.ts` by activating `verbose: true` logging to stream raw database actions directly to the console for live schema error trapping.

---

####  What is incomplete
* **Live Vertical Slice Form Submission:** Connecting the live frontend form actions to dynamically write to the backend routes without running into table schema constraint issues on the database layer during execution.
* **Dashboard Data-Binding:** Swapping the static UI metrics on the supplier panels for live database query counts.

---

####  What was merged
* **Showcase Blueprint Structures:** Merged isolated development routes, mock framework layouts, page placeholders, and initial view templates into a dedicated demonstration workspace branch used exclusively for showing milestone progress.

---

####  What is blocked
* **Type Safety Shape Mismatches (`pnpm db:seed`):** The data-seeding workflow is temporarily blocked by strict TypeScript constraints. The engine catches errors when the code attempts to pass alphanumeric text strings (such as `"SM-001"`) into rigid database columns defined explicitly as numbers.
* **Process Port Blocks:** Occasional local shell friction where background developer processes keep an active hold over server communication channels (like port `3000`), requiring manual process clearance.

---

####  What Week 3 must focus on
* **Input Parse Alignment:** Refactor dataset loaders and request file scripts (`request.ts`) to programmatically parse text strings into exact numeric data types before they hit the database validator.
* **Relational Multi-Table Generation:** Ensure that whenever a parent request header is written, matching multi-line child array values append successfully to the tracking table.
* **Database Query Integration:** Replace the frontend static placeholders with live Drizzle select queries to read real-time totals directly from the database.