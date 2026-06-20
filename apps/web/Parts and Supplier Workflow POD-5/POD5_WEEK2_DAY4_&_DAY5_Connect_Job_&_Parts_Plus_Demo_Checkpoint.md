## `POD5_WEEK2_DAY4_&_DAY5_Connect_Job_&_Parts_Plus_Demo_Checkpoint.md`

---

## Pod 5 Day 5 – Database Alignment & Type Mismatch Hurdles

---

#### **Terminal & Shell Struggles**
* **Terminal Syntax Roadblocks:** Experienced friction attempting to execute native SQL management strings (`ALTER USER`) directly within Windows PowerShell rather than through an active database command shell environment.
* **Connection Lifecycle Blocks:** Spent time diagnosing repetitive `ELIFECYCLE` exit code 1 execution failures when initializing database components through the terminal pipeline.
* **Telemetry Adjustments:** Modified the tool client properties configuration inside `drizzle.config.ts` to toggle `verbose: true`, allowing exact SQL errors to surf directly to the terminal output streams for real-time debugging.

---

#### **Type Safety & Schema Mismatches**
* **Strict Data Constraints:** Encountered rigid TypeScript errors while compiling seed logic and service data objects due to structural mismatches. Specifically struggled with trying to insert alphanumeric string mock codes (like `"SM-001"`) into strict schema columns defined exclusively as numbers.
* **Service Mapping Adjustments:** Debugged code blocks within `request.ts` where runtime string wrappers (`String(item.partId)`) were conflicting with inferred insert validation rules (`$inferInsert`).

---

#### **Runtime Obstacles**
* **Port Contention Issues:** Ran into local development server execution blockages when network port `3000` remained occupied by active background processes, forcing a fallback to port `3001` or requiring manual `taskkill` process termination to free up the channel.
* **Submission Failures:** Uncovered explicit server-side runtime insert query exceptions on the live browser viewport when attempting to post new parts requests, highlighting constraint conflicts during active table row generation.

---

#### **Workflow Status**
* **Studio Interface Visibility:** Validated that foundational table structures (including `audit_logs`, `customers`, and `parts_requests`) are successfully created and tracking data internally.
* **Demo Readiness Checkpoint:** Compiled structural layouts for customer lists, job card baselines, and part request page views within the monorepo to meet the foundational criteria of the Week 2 Demo target guidelines.