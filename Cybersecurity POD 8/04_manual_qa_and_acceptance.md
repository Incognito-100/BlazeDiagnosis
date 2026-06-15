# Task 4: Pod 8 Manual QA Plan & Acceptance Testing Checklist
 
This section establishes the Quality Assurance framework to verify that the security features implemented by developers match our operational acceptance criteria.
 
## 1. Manual QA Test Plan
* **Test Case QA-01 (Authentication Bypass):** Attempt to access `/api/customers` directly via an API client (like Postman) without providing a Bearer token. 
    * *Expected Result:* API must reject the request with a `401 Unauthorized` status code.
* **Test Case QA-02 (IDOR / Cross-Tenant Leakage):** Log in as a user assigned to Tenant A. Attempt to request an invoice ID known to belong exclusively to Tenant B.
    * *Expected Result:* Backend `enforceTenantScope()` middleware must intercept the request and return a `403 Forbidden` status code.
* **Test Case QA-03 (Least Privilege Enforcement):** Log in using a `MECHANIC` user token. Attempt to post a payload to the billing/payments route (`payment.record`).
    * *Expected Result:* The authorization middleware must block the route execution based on missing permissions.
 
## 2. User Acceptance Testing Checklist
* [ ] **UAT-1:** Verified that the login system safely accepts strong character passwords and rejects brute-force attempts after 5 failures.
* [ ] **UAT-2:** Confirmed that customers clicking an online tracking link can view their vehicle milestones but cannot see wholesale part prices or technical mechanic notes.
* [ ] **UAT-3:** Inspected recent codebase commits to guarantee no raw engineering database passwords or external API keys are saved in plain text.

## Roles 
* **Owner:** Gerrit Dry
* **Reviewer:** JW Blignaut
* **Lead:** Ruvan de Klerk
