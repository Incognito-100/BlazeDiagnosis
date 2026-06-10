# Architecture Review and Selected Feature

## Application Architecture Summary

- The app is separated into `backend/` and `frontend/`.
- The backend uses Node.js + TypeScript with a modular structure: controllers, services, repositories, validators, DTOs, and entities.
- `backend/src/app/app.ts` constructs a simple application object with controllers for auth, customers, vehicles, jobs, quotes, tenants, and users.
- The backend current runtime data layer is an in-memory store located at `backend/src/shared/store/in-memory-db.ts`.
- `backend/prisma/schema.prisma` defines the production database schema and enums using Prisma, and `backend/prisma/seed.ts` seeds sample tenant/customer/vehicle/job/quote data.
- The backend currently has a hybrid state: Prisma is included for schema/migrations/seeding, but the actual repository implementations are still using the in-memory store.

## Database and ORM Status

- The project uses Prisma in `backend/package.json` and `backend/prisma/schema.prisma`.
- The schema includes core entities: `Tenant`, `Branch`, `User`, `Customer`, `Vehicle`, `Job`, `Quote`, `QuoteLine`, `PartRequest`, `Invoice`, `Payment`, `Notification`, and `JobStatusHistory`.
- Important workflow enums are present: `JobStatus`, `QuoteStatus`, `PartStatus`, `UserRole`, and `UserStatus`.
- The in-memory store mirrors many of the domain entities, but does not yet use Prisma client for repository operations.

## Identified Feature to Work On

### Feature: Job Card Status Workflow and Quote Approval

This feature is a strong candidate because it ties together core MVP domains: customers, vehicles, jobs, quotes, and status workflows.

### Why this feature?

- It aligns with the MVP backlog focus on job cards, quote approval workflow, and mechanic/workshop progress tracking.
- It is already partially scaffolded in the backend architecture with controllers, services, repositories, validators, and status history support.
- The Prisma schema contains the necessary models and enums, so implementation can be stabilized around the data model.

## What Needs to Be Implemented or Clarified

### Implementation needs

- Build or refine the backend endpoints for job status updates and quote lifecycle transitions.
- Enforce allowed job status transitions and record each transition in `JobStatusHistory`.
- Implement quote creation, quote sending, public quote retrieval by token, and public approval/rejection actions.
- Update job status appropriately when a quote is approved or rejected.
- Add role-based authorization rules for which users can change job status and send quotes.
- Bridge the repository layer from the current in-memory implementation to Prisma-backed persistence, or define a clear adapter strategy.

### Clarifications required

- What exact status transitions should be valid for job workflows in MVP? (e.g., `DRAFT -> AWAITING_INSPECTION -> QUOTATION_IN_PROGRESS -> AWAITING_CUSTOMER_APPROVAL -> APPROVED -> IN_PROGRESS -> COMPLETED -> INVOICED -> PAID -> CLOSED`)
- What behavior should occur when a quote is approved publicly? Should the associated `Job.status` always move to `APPROVED` or `IN_PROGRESS`?
- Which notifications should be sent on status change and who can trigger them?
- Should quote public access require additional security beyond token lookup (expiry, view tracking, single-use token)?

## Recommended Next Step

Implement a backend job status/quote workflow story with:

1. `JobsController` endpoint for status updates.
2. `QuotesController` endpoints for create/send and public approve/reject.
3. `JobStatusHistory` creation on every job status change.
4. Validation of workflow transitions and user role permissions.
5. A path toward Prisma-backed repositories, at least for these feature modules.
