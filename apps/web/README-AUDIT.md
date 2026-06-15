# Pod 6: Audit Logging & Database Seeding Guide

This guide outlines the architectural updates made to implement enterprise-grade system auditing and provides instructions 
on how to initialize and view seed data in your local development environment.

---

## What Changed?

1. **Isolated Seeding Architecture (`apps/web/src/db/seed.ts`)**
   * Built a custom, standalone database seeding script using a raw PostgreSQL `Pool` connection via Drizzle ORM.
   * **Next.js Bypass:** Solved the framework environment clash (`Error: This module cannot be imported from a Client Component module`)
   * by completely bypassing `client.ts` and its `server-only` constraint during terminal execution.
   * **Data Injected:** Seeded a default global development workspace Tenant (`00000000-0000-0000-0000-000000000001`), mock customer
   * profiles (Pod 2), and a baseline initialization system audit log (Pod 6).

2. **Asynchronous Background Logger Utility (`apps/web/src/lib/audit.ts`)**
   * Implemented a reusable, type-safe utility function: `createAuditLog(options)`.
   * **Fail-Safe Design:** Wrapped in background `try/catch` safeguards so that if an audit log save fails, the core user transaction
   * (checkout, profile update) continues uninterrupted.
   * **Delta Snapshots:** Configured to accept `previousValue` and `newValue` data objects stored as `jsonb` matrices to log
   * clear "before-and-after" records.

3. **Live System Activity Trail View UI**
   * Converted the static audit log view into an asynchronous **Next.js Server Component**.
   * Fetches fresh records directly from PostgreSQL on every page render (`export const revalidate = 0`), listing records
   * chronologically with responsive badges for actions and expandable JSON code blocks for metadata mutations.

---

## How to Set Up & Access the Seeded Data Locally

Follow these steps to replicate this exact setup on your local machine:

### 1. Pull the Latest Code
Ensure you have switched to this feature branch and pulled down all updates:
```powershell
git pull origin <feature-branch-name>
```
2. Inject Environment Variables and Run the Seed
Because Windows PowerShell sometimes loads localized environment files (.env.local) as UTF-16, causing standard Node parsers 
to read zero lines, pass your connection string explicitly inline.

If your local PostgreSQL setup uses a custom username, password, or database name, swap out the placeholders in the connection 
string below before hitting Enter:

Run this command from the root directory (\BlazeDiagnosis) of the project:

PowerShell
```
$env:DATABASE_URL="postgres://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/YOUR_DB_NAME"; pnpm --filter @blaze-pos/web db:seed
```
3. Verify via Drizzle Studio (Optional)
If you want to view the raw database tables visually without opening the web application interface:

PowerShell
```
pnpm --filter @blaze-pos/web db:studio
```
 Chrome/Chromium Security Tip: If Drizzle Studio spins infinitely, open "Site Information" in your browser URL address bar and 
ensure "Local network access" is toggled to Allow.

4. Boot Up the Application
Start your local monorepo development server:

PowerShell
```
pnpm dev
```
Navigate to your localized platform dashboard URL to see the live records mapping beautifully onto the UI table.

## How to Use the Logger Utility in Other Pods
For team members working on Pod 2 (Customers & Vehicles) or any transaction mutations, you can import and call this background utility 
without interacting with schema layouts:

TypeScript
```
import { createAuditLog } from '@/lib/audit';

await createAuditLog({
  tenantId: '00000000-0000-0000-0000-000000000001',
  action: 'CUSTOMER_PHONE_UPDATED',
  entityType: 'CUSTOMER',
  entityId: customer.id,
  actorUserId: currentUser.id, // Leave blank/omitted for default 'System Engine' attribution
```
  previousValue: { phone: '082-555-0000' },
  newValue: { phone: '082-555-9999' }
});
