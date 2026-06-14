# Task 1: Blaze Diagnostics Advanced Web Security Checklist & RBAC
 
This checklist outlines the critical application security controls required for the Next.js, TypeScript, and PostgreSQL infrastructure.
 
## 1. Authentication & Credentials 
* **Brute-Force & Credential Stuffing Defenses:** Implement strict rate-limiting on the `/api/auth/login` endpoint using an in-memory data store like Redis. Limit attempts to a maximum of 5 failures per 15 minutes per IP address/username.
* **Password Hashing Standards:** Plain text passwords must never enter the database. Enforce a strong password complexity policy (minimum 12 characters, requiring alphanumeric and special characters). Hash all secrets asynchronously using `Argon2id` or `bcrypt` with a minimum work factor of 10, combined with unique, cryptographically secure salts.
* **Multi-Factor Authentication (MFA):** Enforce mandatory Time-based One-Time Password (TOTP) MFA for all user accounts assigned administrative or management roles.
 
## 2. Core Role-Based Access Control Matrix
Our access control model relies on centrally defined permission rules mapped to specific user tokens. Permissions are managed in `backend/src/shared/auth/permissions.ts` and enforced via backend middleware.
 
* **OWNER & ADMIN Roles:**
    * *Permissions:* Full structural clearance (`tenant.create`, `tenant.update`, `user.create`, `user.update`).
    * *Scope:* Global control over the shop's tenant environment, settings, and team profiles.
* **ADVISOR & MECHANIC Roles:**
    * *Permissions:* Workflow operational rights (`customer.read`, `job.update`).
    * *Scope:* Bound strictly to active job cards, vehicle diagnostics, and parts allocation. They are completely blocked from changing core settings or handling financial transaction records.
* **CASHIER & POS_OPERATOR Roles:**
    * *Permissions:* Transactional execution rights (`payment.record`).
    * *Scope:* Managing front-of-house checkouts, billing, and invoicing updates. They are blocked from modifying mechanical data or system-level user configurations.
* **SUPPLIER_ADMIN, SUPPLIER_SALES, & SUPPLIER_WAREHOUSE Roles:**
    * *Permissions:* Restricted inventory read-only scopes.
    * *Scope:* Limited entirely to parts supply-chain metadata. They are blocked from reading customer PII, accessing tenant configurations, or reviewing shop financial accounting.
 
## 3. Middleware Enforcement Architecture
To maintain a secure development lifecycle, every API route must execute three core sequential middleware checks:
1. **Authentication (`backend/src/shared/middleware/auth.ts`):** Parses incoming Bearer tokens, validates cryptographic signatures, checks expiration windows, and hydrates the `AuthContext` with role and permission arrays.
2. **Authorization (`backend/src/shared/middleware/authorization.ts`):** Enforces explicit route-level checking using `requirePermission()` or `requireAnyPermission()`. 
3. **Tenant Isolation (`backend/src/shared/middleware/tenant-scope.ts`):** Critical barrier running `enforceTenantScope()` and `ensureRecordInTenant()`. This prevents cross-tenant payload injection, data leakage via forged identifiers, or unauthorized database record reads across distinct shop boundaries.
 
## 4. Immediate Route Security Audit Next Steps
Starter permission metadata has already been successfully applied to the `tenants` and `users` route configurations. To complete the application security hardening process, the identical `requiredPermission` route metadata and middleware pattern must be immediately implemented across these module entry points:
* `customers` (Requires `customer.read` / `customer.update` tracking hooks)
* `vehicles` (Requires vehicle identification binding authorization)
* `jobs` (Requires strict `job.update` access limits)
* `quotes` & `invoices` (Requires transactional verification loops)
* `payments` (Requires `payment.record` execution boundaries)
* `collection` (Requires localized operational auditing metadata)
## Roles 
* **Owner:** JW Blignaut
* **Lead:** Gerrit Dry
* **Reviewer:** Ruvan de Klerk
