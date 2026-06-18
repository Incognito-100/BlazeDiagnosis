# Pod 5 – Day 1 Progress Report

**Date:** Week 2, Day 1  
**Focus:** Review supplier and parts schema, prepare supplier response flow plan  
**Name:** Tyrique Prince

---

## 1. Schema Review – Suppliers & Parts

**Tables confirmed:**
- `suppliers` → global supplier records.
- `tenant_suppliers` → link suppliers to tenants, mark preferred suppliers.
- `parts_requests` → created when a job card needs parts.
- `parts_request_items` → individual part lines (name, number, quantity, notes).
- `supplier_responses` → supplier quotes with totals, ETA, expiry.
- `supplier_response_items` → detailed offers (brand, unit price, availability, alternatives).
- `parts_orders` → created when a supplier response is accepted.
- `parts_deliveries` → track delivery status, courier, driver, proof of delivery.

**Key Enums:**
- `partsRequestStatusEnum` → draft, submitted, approved.
- `partsOrderStatusEnum` → pending_approval, ordered, cancelled.
- `deliveryStatusEnum` → awaiting_dispatch, in_transit, delivered.

---

## 2. Supplier Response Flow Plan

**Lifecycle:**
1. **Job Card → Parts Request**  
   - Mechanic/floor manager creates a request linked to a job card.  
   - Items specify required parts, quantities, and notes.

2. **Supplier Response**  
   - Supplier submits a quote with totals (subtotal, tax, delivery fee, grand total).  
   - Items detail brand, availability, unit price, ETA, and alternatives.

3. **Tenant Acceptance → Parts Order**  
   - Tenant accepts one supplier response.  
   - Order tied to job card + supplier.  
   - Status moves through `pending_approval → ordered → dispatched → delivered`.

4. **Parts Delivery**  
   - Delivery record created with courier, driver, ETA, and tracking reference.  
   - Status moves through `awaiting_dispatch → in_transit → delivered`.  
   - Proof file can be attached for audit.

---

## 3. Demo Panels (MVP Showcase)

- **MarketplacePanel** → supplier stock & ETA comparison.  
- **PartsPanel** → internal inventory cards with SKU, category, quantity, and status.  

These panels serve as the **visual kickoff outputs** for Pod 5.

---

## 4. Next Steps (Day 2)

- Wire supplier workflows into UI:  
  - Select part in Marketplace → add to Parts Request.  
  - Show supplier responses linked to requests.  
- Begin integration with job cards so Workshop Board can reflect jobs waiting on parts.  
- Prepare schema notes for audit and testing with demo data.