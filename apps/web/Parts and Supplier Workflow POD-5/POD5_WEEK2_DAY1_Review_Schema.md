### Pod 5 Day 1 – Parts Schema Review 

---

#### **Entities**
- **suppliers** → global supplier records (name, email, phone, status).
- **tenant_suppliers** → link suppliers to tenants, mark preferred suppliers.
- **parts_requests** → created when a job card needs parts; linked to tenant + job card.
- **parts_request_items** → individual part lines (name, number, quantity, notes).
- **supplier_responses** → supplier quotes with totals, ETA, expiry.
- **supplier_response_items** → detailed offers (brand, unit price, availability, alternatives).
- **parts_orders** → created when a supplier response is accepted; linked to job card + supplier.
- **parts_deliveries** → track delivery status, courier, driver, proof of delivery.

---

#### **Relationships**
- **JobCard → PartsRequest → PartsRequestItems**  
  Each job card can trigger one or more parts requests.  
  Each request contains multiple items.

- **SupplierResponse → SupplierResponseItems**  
  Each supplier responds to a request with a quote.  
  Items reference the original request items, allowing comparison.

- **Accepted Response → PartsOrder → PartsDelivery**  
  Tenant accepts one supplier response → creates a parts order.  
  Deliveries track fulfillment until proof of delivery is uploaded.

---

#### **Flow **
1. **Mechanic/Floor Manager creates parts request**  
   - Linked to a job card.  
   - Items specify required parts, quantities, and notes.

2. **Suppliers respond**  
   - Each response includes totals (subtotal, tax, delivery fee, grand total).  
   - Items detail brand, availability, unit price, ETA, and whether alternatives are offered.

3. **Tenant accepts one response**  
   - Creates a parts order tied to the job card and supplier.  
   - Order status moves through `pending_approval → ordered → dispatched → delivered`.

4. **Delivery tracked until completion**  
   - Delivery record created with courier, driver, ETA, and tracking reference.  
   - Status moves through `awaiting_dispatch → in_transit → delivered`.  
   - Proof file can be attached for audit.

---

#### **Key Notes**
- **Enums** (`partsRequestStatusEnum`, `partsOrderStatusEnum`, `deliveryStatusEnum`) ensure consistent workflow states.  
- **Audit trail**: timestamps (`createdAt`, `updatedAt`, `deliveredAt`) provide traceability.  
- **Tenant isolation**: every table includes `tenantId` for multi‑tenant separation.  
- **Integration points**: job cards trigger requests, invoices later reference accepted supplier responses.
