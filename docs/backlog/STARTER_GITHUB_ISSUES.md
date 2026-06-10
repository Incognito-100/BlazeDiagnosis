# Starter GitHub Issues for Blaze Diagnostics

Use these as starter issues for the first implementation phase.

## Issue 1: Document current project structure

**Group:** Software Engineering 1 / Software Development 1

### Checklist

- Review top-level folders
- Identify frontend and backend folders
- Identify configuration files
- Identify where environment variables are documented
- Add notes to project documentation

## Issue 2: Create first dashboard summary card component

**Group:** Software Development 1

### Checklist

- Create reusable card component
- Support title and value
- Support short description
- Style with Tailwind CSS
- Add example usage

## Issue 3: Define core database entities

**Group:** Software Engineering 2

### Checklist

- List users, workshops, customers, vehicles, jobs, quotes, quote items, parts, invoices, notifications, activity logs
- Describe relationships
- Identify required fields
- Compare with current schema
- Document gaps

## Issue 4: Create role access matrix

**Group:** Cyber Security / Software Engineering 2

### Checklist

- List user roles
- List pages or actions
- Mark allowed and disallowed actions
- Identify customer-facing risks
- Recommend route protection rules

## Issue 5: Draft deployment readiness checklist

**Group:** Cloud Administration

### Checklist

- Identify environment variables
- Confirm `.env.example` files
- Identify database requirements
- Document dev/staging/prod differences
- Add backup and monitoring notes

## Issue 6: Create customer tracking page risk review

**Group:** Cyber Security

### Checklist

- Review customer data shown
- Review access method options
- Identify unauthorized access risks
- Recommend expiry/login/security controls
- Document findings

## Issue 7: Build job status badge component

**Group:** Software Development 1 / 2

### Checklist

- List statuses
- Create reusable badge component
- Add readable labels
- Keep styling simple
- Add examples for key statuses

## Issue 8: Draft API contracts for customers and vehicles

**Group:** Software Engineering 2 / Software Development 2

### Checklist

- Define create customer request
- Define update customer request
- Define list customers response
- Define create vehicle request
- Define vehicle response
- Add error response examples

## Issue 9: Job card status workflow & quote approval (recommended first feature)

**Group:** Software Engineering 2 / Software Development 2

### Observations

- Backend contains a `prisma/schema.prisma` with `JobStatus` and `QuoteStatus` enums and full models for `Job`, `Quote`, `Customer`, `Vehicle`, etc.
- Current repository implementations under `backend/src/modules/*/repositories` use an in-memory store (`shared/store/in-memory-db`) for data access; Prisma is present for production seeding and migration scripts.
- API contracts in `docs/api-contracts.md` already specify endpoints for job status updates, quote creation, public quote approve/reject flows, and job lifecycle actions.

### Proposed work & clarifications needed

- Implement job status transition endpoints and enforce allowed transitions (e.g., QUOTATION_IN_PROGRESS -> AWAITING_CUSTOMER_APPROVAL -> APPROVED -> IN_PROGRESS -> COMPLETED -> INVOICED -> PAID -> CLOSED).
- Implement quote lifecycle endpoints: create quote, send (mark SENT), public token access, public approve/reject which should update `Quote.status` and related `Job.status` where applicable.
- Ensure status history is recorded (`JobStatusHistory`) whenever a job status changes.
- Decide and document which transitions require notifications to customers (email/WhatsApp) and who can trigger them (role-based checks).
- Plan migration from in-memory repositories to Prisma-backed repositories (or adapter pattern) for persistence; identify which repository implementations need to be added or swapped.

### Acceptance criteria / Deliverables

- API endpoints implemented and covered by basic tests: job status update, create/send quote, public quote approve/reject.
- `JobStatusHistory` entries created on status change.
- Role checks applied for status-changing actions (Service Advisor vs Mechanic vs Admin distinctions documented).
- Short migration guide or adapter showing how to switch repositories from in-memory to Prisma client for these modules.

### Notes for assignee

- Start by reviewing `backend/prisma/schema.prisma`, `backend/prisma/seed.ts`, and the existing repositories in `backend/src/modules/{jobs,quotes,customers,vehicles}`.
- Use `docs/api-contracts.md` as the API surface contract; propose any missing fields required by the frontend.
- If time-limited, prioritize: (1) status update endpoint with history, (2) quote create/send + public approve flow, (3) notifications hooks.

