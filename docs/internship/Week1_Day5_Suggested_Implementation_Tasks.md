## Day 5: Suggested Implementation Tasks 
## 1️ Data Contract & Input Verification
Files: vehicles.dto.ts and customers.dto.ts

## Establish Baseline Creation Forms:  
Define explicit data models specifying exactly which properties the network must accept to register a vehicle profile (tenantId, customerId, licensePlate, vin, make, model, year, mileage) or a new customer profile (name, phone, email, notes).

## Isolate Resource Mutation Parameters:  
Set up detached data‑transfer footprints for resource updates (e.g., UpdateVehicleDto) where properties use optional flags (?). This enables service advisors to update changing operational parameters—such as a vehicle’s odometer mileage—without forcing the client page to re‑transmit static structural elements.

## Enforce Primitive Type Safeguards:  
Implement strict primitive parameter constraints within the code contracts to reject malformed payloads at the API threshold. Guard against negative integers or invalid chronological values for fields like manufacturing year or mileage.

## 2 Relational Database Layer
File: schema.ts

## Enforce Direct Structural Foreign Keys:  
Audit your Drizzle schema to verify that tenantId is a non‑nullable column acting as a strict data‑separation anchor. Confirm that the vehicle schema points to a parent customer row via a secure foreign key.

## Configure Fleet Mapping Constants:  
Map a clean one‑to‑many relationship (Customer → Vehicles) so a single customer can own multiple active vehicle profiles.

## Embed Asset Soft‑Delete Attributes:  
Add a boolean field isArchived to the vehicle table, defaulting to false. This allows safe lifecycle changes without destructive SQL deletes.

## 3 Core Operational Logic Layer
Files: vehicles.service.ts and customers.service.ts

## Code the Case‑Insensitive Uniqueness Shield:  
Implement a lookup that matches lower‑cased strings to prevent duplicate license plates within the same tenant. Return a clear validation message on collision.

## Enforce Server‑Side Tenant Isolation Hooks:  
Ensure every query appends a strict filter:

ts
.where(eq(vehicles.tenantId, activeTenantId))
This prevents cross‑tenant data exposure.

## Inject Automatic Live Data Filters:  
Require all list queries to include

ts
eq(vehicles.isArchived, false)
so archived items remain hidden but preserved.

## Construct Deletion Safety Interceptors:  
Before archiving a vehicle, check for active job‑card links. Block deletion if any uncompleted jobs exist to maintain relational integrity.

## 4️ API Routing & Transport Handlers
Endpoints: /api/vehicles and /api/customers

## Decouple Endpoints from Core Logic:  
Route handlers should only unpack requests, validate parameters, and return JSON responses. All database work belongs in the service layer.

## Guard Input Context Thresholds:  
Reject operations lacking a valid tenantId with HTTP 400 Bad Request.

