# Customer and Vehicle Relationship Requirements

## Purpose
Define the required behavior, data integrity, and security rules for the customer-to-vehicle relationship in Blaze Diagnostics.

## Scope
This document covers:
- customer and vehicle ownership rules
- relationship integrity
- tenant and access scope
- workflow behavior
- security and visibility
- acceptance criteria

## 1. Relationship rules
- A customer may have multiple vehicles.
- A vehicle must be linked to exactly one customer.
- A vehicle cannot exist without a valid `customerId`.
- A customer may exist without any vehicles.

## 2. Data integrity
- `Vehicle.customerId` is required and must reference an active customer record.
- When a customer is archived, associated vehicles must remain linked and auditable.
- Vehicles must use soft-delete / archive semantics (`isArchived`, `archivedAt`) rather than hard deletion, preserving customer association for history and audit.

## 3. Tenant and access scope
- Customer and vehicle records must belong to the same tenant.
- A vehicle may only be created, read, updated, or archived within the tenant that owns its customer.
- Customers may only see vehicles belonging to their own customer record or company account context.

## 4. Customer / vehicle behavior
- Creating a vehicle requires at minimum:
  - `customerId`
  - `registrationNumber`
  - `make`
  - `model`
- Vehicle details may optionally include:
  - `vin`
  - `variant`
  - `year`
  - `engineType`
  - `fuelType`
  - `transmission`
  - `odometer`
  - `color`

## 5. Workflow implications
- Job cards and inspections must link to a vehicle, which in turn links to the customer.
- Customer-facing views should present vehicle details in the context of that customer’s jobs and quotes.
- Staff-facing workflows should allow selecting an existing customer and associating one or more vehicles to new jobs.

## 6. Security / visibility
- Customers cannot access vehicles belonging to other customers.
- Staff may search vehicles by registration number or VIN, but returned vehicles must be filtered by tenant and permitted customer association.
- Sensitive customer fields (for example, tax number and marketing consent) are separate from vehicle-specific data.

## 7. Acceptance criteria
- Given a customer record, the system can create, update, archive, and list that customer’s vehicles.
- Given a vehicle record, the system can resolve the owning customer and tenant.
- If a vehicle’s customer is archived, the vehicle remains visible to workshop staff for historical purposes.
- If a vehicle is archived, it is excluded from active customer vehicle lists unless explicitly requested.
