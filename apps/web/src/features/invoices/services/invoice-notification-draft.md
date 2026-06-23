# Invoice Creation and Notification Helper Draft

## What was added

- Added a draft invoice creation service in `apps/web/src/features/invoices/services/invoice.service.ts`.
- Added a draft notification helper in `apps/web/src/features/notifications/services/notification.service.ts`.

## Invoice creation service

The `createInvoiceFromApprovedQuote` service:

- Verifies tenant permission for `invoices.create`.
- Loads the approved quote by `quoteId` and `tenantId`.
- Loads approved or billable quote line items.
- Calculates invoice totals: subtotal, discount, tax, and total.
- Creates an invoice record with `draft` status.
- Creates invoice line items linked to the created invoice.
- Writes an audit log event for the invoice creation.
- Enqueues an invoice notification for the recipient if provided.

## Notification helper

The notification draft adds:

- `createInvoiceNotificationRecord(...)` to insert a notification record for invoice events.
- `createInvoiceNotification(...)` as a convenience wrapper that accepts explicit arguments.

This helper supports transaction sharing via the optional `client` parameter, so the notification record can be created inside an existing transaction.

## Notes

- The notification helper currently supports invoice events: `invoice_created`, `invoice_issued`, `invoice_paid`, and `invoice_overdue`.
- The invoice creation draft uses the `invoice_created` event type by default.
- The helper writes notifications with `channel: 'in_app'` and status `queued`.
