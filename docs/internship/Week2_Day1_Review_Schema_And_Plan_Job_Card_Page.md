# Pod 3 – Day 1 Progress Report  
**Date:** Week 2, Day 1  
**Focus:** Review job card schema and statuses, prepare job card creation page plan
**Name** Tyrique Prince
---

## 1. Schema Review – Job Cards
- **Tables confirmed:**
  - `job_cards` → core record for each workshop job.
  - `job_status_events` → tracks every status change.
  - `job_notes` → supports internal vs. customer‑visible notes.
- **Key fields:**
  - `jobNumber`, `customerId`, `vehicleId`, `internalStatus`, `customerStatus`, `priority`, `assignedMechanicId`, `expectedCompletionAt`.
- **Default statuses:**
  - Internal: `request_received`
  - Customer: `request_received`
- **Enums:**
  - `jobInternalStatusEnum` → detailed workshop flow (diagnostics, work in progress, quality control, etc.).
  - `jobCustomerStatusEnum` → simplified customer‑facing flow (inspection, awaiting approval, ready for collection).
- **Supporting features:**
  - Audit logs record job card creation and updates.
  - Notifications trigger on customer‑facing status changes.

---

## 2. Job Card Creation Page Plan
### Form Inputs
- Customer selector (from `customers` table).
- Vehicle selector (from `vehicles` table).
- Requested service / customer concern.
- Priority (default: normal).
- Assigned mechanic / floor manager.
- Preferred date (optional).

### Default Values
- Internal status → `request_received`.
- Customer status → `request_received`.

### Validation
- Required fields: `customerId`, `vehicleId`, `jobNumber`.
- Use Zod schema for type safety.

### Submission Flow
1. Insert new record into `job_cards`.
2. Create initial `job_status_events` entry.
3. Trigger audit log (`job_card_created`).
4. Optionally queue notification for customer (if visibility = customer).

### Placement
- Component: `apps/web/src/components/forms/job-card-form.tsx`
- Service function: `apps/web/src/features/job-cards/services/jobs.ts`

---

## 3. Next Steps (Day 2)
- Implement the Job Card Creation Form component.
- Connect backend service to insert job cards via `db` client.
- Test insertion with default statuses and audit log entry.
- Prepare Workshop Board layout to display job cards with customer + vehicle details.

---
