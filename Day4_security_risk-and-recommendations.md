### Task2 Risk level linked to relevant app areas
### 1. Blaze Diagnostic 

1. Risk Vector: Multi-Tenant Logical Bypass and Cross-Tenant Data Injection
    * Assigned Severity: CRITICAL (CVSS v3.1 Score: 9.8)
    * Vulnerability Breakdown: Because this application operates on a shared-database, multi-tenant architecture, the lack of strict logical boundaries represents a severe vulnerability. If the backend fails to validate the scope of a request, an attacker can manipulate parameters or inject forged tenant IDs into API request bodies. This bypasses the isolation layer completely.
    * Operational Impact: A compromise here causes a total breakdown of data confidentiality and integrity. An authenticated user from "Shop A" could view, alter, or completely delete vehicle records, customer PII, and financial transaction histories belonging to "Shop B." This type of exposure exposes the parent company to severe legal liabilities, data protection violations, and immediate loss of business trust.

2. Risk Vector: Broken Object Level Authorization (BOLA / IDOR) on Financial and Invoicing Enclaves
    * Assigned Severity: HIGH (CVSS v3.1 Score: 8.5)
    * Vulnerability Breakdown: This flaw stems from a failure to verify object ownership during state changes or data retrieval. The endpoint routing structures for invoices (/api/invoices/[id]) rely on predictable, sequential, or guessable identifiers. If the application checks only that a user is logged in, but not which specific data they own, an attacker can use automated script loops to guess IDs (changing id=5001 to id=5002).
    * Operational Impact: This allows unauthorized parties to harvest massive amounts of data, leading to the exposure of corporate financial metrics, itemized parts costs, and sensitive customer data. Competitors could scrape pricing strategies, and threat actors could use leaked invoice data to conduct highly targeted phishing and social engineering attacks against customers.

3. Risk Vector: Plaintext Credential Spraying and Automated Brute-Force Vulnerabilities
    * Assigned Severity: MEDIUM (CVSS v3.1 Score: 6.5)
    * Vulnerability Breakdown: The primary authentication route (/api/auth/login) lacks automated rate-limiting policies and IP throttling. This leaves the system highly vulnerable to credential stuffing, dictionary attacks, and automated brute-force scripts. Threat actors can use distributed botnets to test thousands of compromised password combinations against employee accounts.
    * Operational Impact: A successful attack leads to complete account takeover. If an administrative or technician account is breached, attackers gain an unmonitored foothold inside the backend system. From there, they can extract sensitive data or pivot to more destructive internal exploits.

4. Risk Vector: JWT Secret Key Hardcoding and Insufficient Token Expiry Windows
    * Assigned Severity: HIGH (CVSS v3.1 Score: 8.1)
    * Vulnerability Breakdown: If developers hardcode fallback secrets or leave variables like JWT_ACCESS_SECRET set to defaults (e.g., replace_me_access_secret) in production files, the entire cryptographic foundation collapses. Furthermore, if access tokens possess indefinite lifespan settings without proper token revocation validation, intercepted tokens remain viable indefinitely.
    * Operational Impact: Compromised signing keys allow attackers to forge valid administrative JSON Web Tokens offline. This grants complete, unauthenticated administrative backend route access, rendering upstream access control layers completely useless.

5. Risk Vector: Client-Side Input Manipulation and Cross-Site Scripting (XSS) via Vehicle Notes
    * Assigned Severity: MEDIUM (CVSS v3.1 Score: 6.1)
    * Vulnerability Breakdown: Text areas within the application—such as mechanic job progress cards or customer vehicle issue descriptions—that accept unvalidated input provide a vector for script injection. If the Next.js frontend or Prisma database layer processes raw input text without strict filtering, malicious JavaScript can be permanently saved to the database.
    * Operational Impact: When other staff members or administrators view the compromised job card, the injected script executes automatically inside their browser session. This can lead to session hijacking, administrative cookie theft, and unauthorized actions performed within the application workspace.
