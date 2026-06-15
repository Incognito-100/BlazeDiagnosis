# Task 5: Advanced Threat Modeling & API Security Hardening

This document establishes the security engineering threat model for the newly reworked Blaze Diagnostics application endpoints, identifying potential threat vectors and outlining architectural mitigations before production deployment.

## 1. STRIDE Threat Analysis for Reworked Operational Modules
With the repository recently reorganized, the primary operational modules (`customers`, `vehicles`, `jobs`, `quotes`, and `invoices`) must be systematically guarded against critical threat vectors using the STRIDE methodology.



### A. Spoofing & Tampering (Authentication Layer)
* **Threat Vector:** An adversary attempts to forge HTTP headers, modify session cookies, or intercept unauthenticated client tracking parameters to alter data states within active mechanical `jobs` or vehicle configuration tables.
* **Architectural Mitigation:** Enforce mandatory cryptographic verification on all inbound Bearer tokens via `auth.ts`. Ensure that token signatures are securely validated against a high-entropy symmetric secret (`JWT_ACCESS_SECRET`) stored inside an isolated environment configuration container.

### B. Information Disclosure / BOLA (Tenant Isolation Layer)
* **Threat Vector:** A malicious user authenticated under Shop A intentionally alters data inputs or crafts specific JSON request variables (`requestedTenantId`) targeting resource IDs belonging exclusively to Shop B, seeking a Broken Object Level Authorization (BOLA/IDOR) leak to harvest private customer invoices or contact records.
* **Architectural Mitigation:** Consistent execution of the `enforceTenantScope()` and `ensureRecordInTenant()` validation helpers inside `backend/src/shared/middleware/tenant-scope.ts`. The backend engine must immediately dump the execution frame and issue a `403 Forbidden` block if the tokenized payload tenant context fails to match the queried record's underlying parent database index.

### C. Elevation of Privilege (RBAC Layer)
* **Threat Vector:** An internal employee mapped to a lower-clearance role (such as a `MECHANIC` or `POS_OPERATOR`) explicitly bypasses frontend client-side validation rules to directly dispatch structured API payloads to administration endpoints, attempting unauthorized `user.create` or `tenant.update` actions.
* **Architectural Mitigation:** Uphold the Principle of Least Privilege by binding every module entry point to the structural `requirePermission()` or `requireAnyPermission()` middleware controls from `authorization.ts` ahead of route execution.

---

## 2. Technical API Route Hardening Blueprint
To eliminate temporary placeholder structures and successfully implement this multi-layered defensive pipeline across the newly reworked routes, the backend configurations must align with this standardized middleware pattern:

## Roles
* **Owner:** Gerrit Dry
* **Lead:** JW Blignaut
* **Reviewer:** Ruvan de Klerk

```typescript
import { Router } from 'express';
import { authenticateToken } from '../../../shared/middleware/auth';
import { requirePermission } from '../../../shared/middleware/authorization';
import { enforceTenantScope } from '../../../shared/middleware/tenant-scope';
import { CustomerController } from '../controllers/customer.controller';

const router = Router();

// Applying the 3-Layer Security Pipeline to Reworked Routes
router.get(
  '/:id',
  authenticateToken,                      // Layer 1: Verify token signature and expiry
  requirePermission('customer.read'),     // Layer 2: Assert specific user capability
  enforceTenantScope,                     // Layer 3: Block cross-tenant access attempts
  CustomerController.getById
);

export default router;
