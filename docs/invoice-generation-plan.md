# Invoice Generation Plan

## Overview
This plan documents the invoice generation workflow, schema review, and implementation steps for Blaze POS.

## Schema Review

### Invoice schema (`apps/web/src/db/schema/invoices.ts`)
- `invoices`
  - `tenantId`, `jobCardId`, `customerId`
  - `invoiceNumber`
  - `status` enum: `draft`, `issued`, `partially_paid`, `paid`, `overdue`, `cancelled`, `refunded`
  - monetary fields: `subtotal`, `taxTotal`, `discountTotal`, `total`, `amountPaid`
  - timestamp fields: `issuedAt`, `dueAt`, `paidAt`, `createdAt`, `updatedAt`
- `invoiceLineItems`
  - links to `invoiceId`
  - optional `quoteLineItemId`
  - stores `category`, `description`, `quantity`, `unitPrice`, `taxRate`, `total`
- `payments`
  - `invoiceId`, `amount`, `method`, `status`, `provider`, `providerReference`, `paidAt`

### Notification schema (`apps/web/src/db/schema/communication.ts`)
- `notifications`
  - `tenantId`, `recipientUserId`
  - `type`, `channel` (default `in_app`)
  - `title`, `body`
  - `status` enum: `queued`, `sent`, `read`, `failed`
  - `readAt`, `createdAt`
- service functions in `apps/web/src/features/notifications/services/notification.service.ts`
  - `createInAppNotification`
  - `listUserNotifications`
  - `markNotificationRead`

### Audit schema (`apps/web/src/db/schema/audit.ts`)
- `auditLogs`
  - `tenantId`, `actorUserId`
  - `action`, `entityType`, `entityId`
  - `previousValue`, `newValue`
  - request metadata: `ipAddress`, `userAgent`, `requestId`
  - `createdAt`
- service functions in `apps/web/src/features/audit/services/audit.service.ts`
  - `writeAuditLog`
  - `searchAuditLogs`

## Current Invoice Generation Status
- There is an existing service: `createInvoiceFromApprovedQuote`
- It validates tenant permission
- It loads a quote and approved/billable quote line items
- It calculates `subtotal`, `discountTotal`, `taxTotal`, and `total`
- It inserts a draft invoice and invoice line items

### Draft: Invoice creation service from approved quote
- `createInvoiceFromApprovedQuote(tenantId, quoteId)`
  - validate tenant and user permissions
  - load quote and ensure quote status is `approved`
  - fetch approved, billable quote line items
  - compute each line item total: `quantity * unitPrice`, `lineTax`, `lineDiscount`
  - aggregate invoice totals: `subtotal`, `discountTotal`, `taxTotal`, `total`
  - create invoice record with `status: 'draft'`
  - create invoice line items with `quoteLineItemId` references
  - return created invoice summary and line items

### Draft: Notification record helper
- `createInvoiceNotificationRecord(tenantId, invoiceId, recipientUserId, eventType)`
  - map `eventType` to `title`, `body`, and `channel`
  - create notification record in `notifications` table
  - set `status` to `queued`
  - support `invoice_created`, `invoice_issued`, `invoice_paid`, `invoice_overdue`
  - optionally enqueue delivery or signal processing for in-app channel

## Gaps and Next Steps
- Add audit logging for invoice creation and status changes
- Add notification creation for invoice events
- Implement invoice issuance and payment lifecycle helpers
- Add due date handling and status transitions
- Add customer and station invoice listing APIs
- Add invoice document rendering for export/print view

## Invoice Generation Plan

### 1. Requirements
- Invoice generation only from approved or billable quote items
- Totals must include discounts and tax
- `invoice` status must be tracked through lifecycle
- Notifications should be generated for invoice events
- Audit records should be written for invoice creation and key state changes
- Customers must be able to view invoice history

### 2. Workflow Extension
- Keep `createInvoiceFromApprovedQuote(tenantId, quoteId)` as the core generation path
- Validate tenant permission at the start
- Fetch the quote and approved quote line items
- Compute line-level totals and aggregate invoice totals
- Insert invoice with `status: 'draft'`
- Insert invoice line items with `quoteLineItemId` references
- Add audit entry after creation
- Add notification entry after creation

### 3. Invoice Lifecycle Helpers
- `markInvoiceIssued(tenantId, invoiceId)`
  - set `status` to `issued`
  - set `issuedAt` and `dueAt`
  - write audit log and notification
- `markInvoicePaid(tenantId, invoiceId, paymentInput)`
  - create payment record
  - update invoice `amountPaid`
  - update invoice `status` to `partially_paid` or `paid`
  - set `paidAt` when fully paid
  - write audit log and notification
- `voidInvoice(tenantId, invoiceId, reason)`
  - set `status` to `cancelled`
  - write audit log with cancellation reason

### 4. Read APIs and UX
- `getCustomerInvoices(tenantId, customerId)`
- `getStationInvoices(tenantId, filters)`
- `renderInvoiceDocument(tenantId, invoiceId)`
- Add invoice list and detail pages for staff and customers
- Add in-app notification bell and notification list
- Add audit log viewer for tenant admin/staff review

### 5. Validation and Acceptance
- Invoice totals must match approved quote item calculations
- `invoiceStatusEnum` transitions must follow expected states
- Notifications must be created for invoice creation and status changes
- Audit logs must record invoice creation and updates
- Add tests for:
  - invoice generation from approved quote
  - draft -> issued -> paid lifecycle
  - audit record writes
  - notification creation for invoice events

## Recommended Implementation Order
1. extend `createInvoiceFromApprovedQuote` with audit and notification hooks
2. implement `markInvoiceIssued` and `markInvoicePaid`
3. add list/detail fetch APIs and document rendering helper
4. add tests for generation, lifecycle, notifications, and audit
5. wire UI entry points for invoice generation and history
