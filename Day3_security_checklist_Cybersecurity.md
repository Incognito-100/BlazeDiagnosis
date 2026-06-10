### Restricted Data customers should not have access to (Workshop Internal Only)

To protect workshop profitability, staff privacy, and operational security, customers should **not** have visibility into the following data:

#### 1. Financial & Pricing Discrepancies
* **Part Cost Price:** The wholesale/purchase price the workshop pays suppliers for parts (customers should only see the retail/markup price).
* **Labor Cost Rates:** The internal hourly rate paid to the mechanics vs. the retail labor rate charged to the customer.
* **Supplier Details:** Specific names, contact info, or invoices of third-party parts suppliers and distributors.

#### 2. Internal Operations & Efficiency
* **Actual vs. Billed Time:** The exact hours a mechanic spent on a task (e.g., if a job takes 30 minutes but standard industry book time dictates a 2-hour charge).
* **Mechanic Performance Metrics:** Internal flags regarding re-work, mistakes, or efficiency ratings of individual staff members.
* **Workshop Capacity & Bottlenecks:** Internal scheduling struggles, backlog metrics, or notes about being understaffed.

#### 3. Staff & Technician Privacy
* **Technician Full Names & PII:** Personally Identifiable Information (PII) of individual mechanics (first names or generic "Technician ID" is fine for accountability, but full names or contact info should be hidden).
* **Internal Chat & Commentary:** Raw, unedited notes between mechanics and service advisors (e.g., *"Customer clearly tried to fix this themselves and stripped the bolt"*).

#### 4. System & Security Data
* **Audit Trails:** Internal logs showing who edited a quote, changed a status, or reassigned a task within the workshop team.

### Authorization and Role Based Access (RBAC) Risks

#### 1. Customers Snooping (BOLA)
* **The Risk:** A tech-savvy customer changes a number in the app’s URL or API request (e.g., from `job/101` to `job/102`) and views another customer's car details, invoices, or personal info.
* **Fix:** The server must check that the logged-in user actually owns that specific vehicle/job on **every single request**. Never rely on the frontend to block this.

#### 2. Role Skipping/Privilege Escalation
* **The Risk:** A customer finds a way to access internal workshop links, allowing them to look at hidden staff notes or change their own billing amounts.
* **Fix:** Use strict server-side permissions. Lock down all routes by default unless the user is explicitly flagged as a `Technician` or `Admin`.

#### 3. Multi-Tenant Risk
* **The Risk:** If this app is sold to multiple different mechanic businesses, a bug in the code allows Workshop A to accidentally see the customer list or financial data of Workshop B.
* **Fix:** Use Row-Level Security (RLS) in the database to automatically isolate each workshop's data.

#### 4. Shared Workshop Tablets (Session Hijacking in simple terms)
* **The Risk:** Mechanics log into shared shop tablets using admin accounts and leave them open. Customers or apprentices can then access sensitive business settings.
* **Fix:** Set short session timeouts and auto-logout features for devices used on the workshop floor.
