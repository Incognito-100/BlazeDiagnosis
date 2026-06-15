## Task 2: Customer-Facing Access & Tracking Link Risk Review

Opening a portal for customers to track their vehicle status online introduces critical exposure vectors. Below is an analysis of the primary risks, structural visibility metrics, and recommended mitigations.

## 1. Architecture Flow for Client Progress Tracking
To balance frictionless customer convenience with core data safety, access to real-time vehicle repair milestones must be governed through two options:
* **Authenticated Dashboard Access (Recommended):** The client navigates to the platform, authenticates via standard credentials or passwordless Magic Links, and securely views their unified dashboard.
* **Tokenized Single-Purpose Tracking Links:** If unauthenticated entry is chosen for simplicity, access must rely on a cryptographically random, high-entropy unique token appended as a URL parameter (e.g., `/track/job?token=6f8e2a3b9c...`).

## 2. Information Visibility Matrices

| Feature/Data Point | Customer Visibility Status | Security Rationale |
| :--- | :--- | :--- |
| **Current Progress Milestones** | **ALLOWED** | Operational necessity; reduces service desk inbound inquiries. |
| **Itemized Customer Quote / Invoice** | **ALLOWED** | Essential for digital review, signature capture, and payment. |
| **Assigned Technician / Mechanic Names** | **BLOCKED** | Protects employee privacy and mitigates social engineering targets. |
| **Internal Workflow Notes** | **BLOCKED** | Contains sensitive diagnostic remarks or private company assessments. |
| **Wholesale Component Markup Costs** | **BLOCKED** | Proprietary commercial financial metrics. |

## 3. Exploitation Scenarios & Risk Mitigations
* **Link Leakage Scenarios:** If an unauthenticated tracking link is sent over SMS or Email, it risks being cached in local browser histories, forward-shared with unauthorized entities, or scraped by network adversaries operating on open public Wi-Fi networks.
* **Link Expiration Architectures:** Tokenized links must incorporate strict time-to-live (TTL) limits. Tracking parameters should automatically expire within **48 to 72 hours** of final invoice compilation.
* **Identity Escalation Protections:** Before executing high-stakes financial operations—such as approving a costly quote or processing a payment change—the application must trigger an additional verification challenge, such as a temporary One-Time Password (OTP) sent to the customer's registered mobile number.
 ## Roles:
* **Owner:** Gerrit Dry
* **Reviewer:** Ruvan de Klerk
* **Lead:** JW Blignaut
