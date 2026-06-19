## Pod 5 – Day 3 Progress Report
## Date: Week 2, Day 3

## Focus: Localized Drizzle ORM setup, PostgreSQL table generation, and Relational API Implementation

## Name: Tyrique Prince

## 1. Environment & Setup
Isolated and installed Drizzle ORM and the pg driver strictly within the apps/web workspace directory.

Kept all dependencies localized to ensure no breaking changes or side effects impact the rest of the Blaze monorepo.

Confirmed that the server-only Drizzle client initialization loads schema definitions seamlessly.

Verified through terminal tracking that configuration files containing sensitive credentials remain perfectly ignored by version control.

## 2. Database & Schema Architecture
Provisioned the core workflow tables directly in the PostgreSQL database using the pgAdmin Query Tool.

Designed and mapped out the relational table structures:

parts_requests: Serves as the main request header tracking customer, staff, and status.

parts_request_items: Handles individual requested parts, quantities, and notes linked via foreign keys.

Verified the newly created tables using raw SQL INSERT and SELECT queries to confirm database integrity.

## 3. Backend API Implementation
Refactored and cleaned up /api/parts-request/route.ts by removing dead placeholder imports to ensure a green, error-free production build.

Added an array validation guard to the parts request payload to protect server stability.

Built out the fully functional Supplier Response API Route (/api/supplier-response/route.ts) supporting:

GET: Requests to accurately fetch existing supplier responses filtered by a specific request ID.

POST: Requests executing relational transactions that insert the response header, retrieve the generated primary ID, and batch-insert sub-items.

Successfully verified the backend endpoints using Thunder Client, achieving a clean 200 OK status and confirming successful PostgreSQL writes.

## 4. Workflow Notes
Confirmed that Drizzle ORM and the PostgreSQL driver are strictly contained to the apps/web environment.

Maintained strict folder isolation by placing backend logic, schemas, and configurations inside the designated app folder to protect other sub-teams.

Followed clean production coding standards by stripping out unneeded dependencies and adding route catch guards before committing.

## 5. Key Outcomes
Dependency isolation finalized (Drizzle ORM operational exclusively for Pod 5 work).

PostgreSQL relational schemas successfully generated, integrated, and verified via pgAdmin.

Fully functional backend endpoints (/api/parts-request and /api/supplier-response) confirmed writing live data with a 200 OK status.

