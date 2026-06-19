import { pgTable, serial, text, integer, timestamp, numeric } from "drizzle-orm/pg-core";

export const partsRequests = pgTable("parts_requests", {
  id: serial("id").primaryKey(),
  tenantId: text("tenant_id").notNull(),
  jobCardId: text("job_card_id").notNull(),
  requestedByUserId: integer("requested_by_user_id").notNull(),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const partsRequestItems = pgTable("parts_request_items", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").notNull(),
  partId: integer("part_id").notNull(),
  quantity: integer("quantity").notNull(),
  notes: text("notes"),
});




export const supplierResponses = pgTable("supplier_responses", {
  id: serial("id").primaryKey(),
  supplierId: text("supplier_id").notNull(),
  partsRequestId: text("parts_request_id").notNull(),
  subtotal: numeric("subtotal"),
  tax: numeric("tax"),
  deliveryFee: numeric("delivery_fee"),
  grandTotal: numeric("grand_total"),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const supplierResponseItems = pgTable("supplier_response_items", {
  id: serial("id").primaryKey(),
  responseId: integer("response_id").notNull(),
  partId: integer("part_id").notNull(),
  brand: text("brand"),
  unitPrice: numeric("unit_price"),
  availability: text("availability"),
  eta: text("eta"),
});