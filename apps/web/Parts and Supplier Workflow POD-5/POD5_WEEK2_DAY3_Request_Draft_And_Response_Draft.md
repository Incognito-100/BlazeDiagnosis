### POD5_WEEK2_DAY3_Request_Draft_And_Response_Draft

---

#### **Environment & Setup**
* **Isolated Package Installation:** Installed Drizzle ORM and the `pg` driver strictly within the `apps/web` workspace.
* **Monorepo Protection:** Kept all dependencies localized to ensure no breaking changes or side effects impact the rest of the Blaze monorepo.
* **Client Validation:** Confirmed that the server-only Drizzle client initialization loads schema definitions seamlessly.

---

#### **Database & Schema Architecture**
* **Table Creation:** Provisioned the core workflow tables directly in the PostgreSQL database using the pgAdmin Query Tool.
* **Relational Design:** Designed and mapped out the relational table structures:
  * `parts_requests`: Serves as the main request header tracking customer, staff, and status.
  * `parts_request_items`: Handles individual requested parts, quantities, and notes linked via foreign keys.
* **Integrity Testing:** Verified the newly created tables using raw SQL `INSERT` and `SELECT` queries to confirm data integrity.

---

#### **Backend API Implementation**
* **Route Optimization:** Refactored and cleaned up `/api/parts-request/route.ts` by removing dead placeholder imports to ensure a green, error-free production build.
* **Payload Guarding:** Added an array validation guard to the parts request payload to protect server stability.
* **Supplier Response Route:** Built out the fully functional Supplier Response API Route (`/api/supplier-response/route.ts`) supporting:
  * **GET:** Requests to accurately fetch existing supplier responses filtered by a specific request ID.
  * **POST:** Requests executing relational transactions that insert the response header, retrieve the generated primary ID, and batch-insert sub-items.
* **Endpoint Verification:** Successfully verified the backend endpoints using Thunder Client, achieving a clean `200 OK` status and confirming successful PostgreSQL writes.

---

