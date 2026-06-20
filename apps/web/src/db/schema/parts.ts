import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const partsRequests = pgTable("parts_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id").notNull(),
  jobCardId: uuid("job_card_id").notNull(),
  requestedByUserId: uuid("requested_by_user_id").notNull(),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const partsRequestItems = pgTable("parts_request_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  requestId: uuid("request_id").notNull().references(() => partsRequests.id, { onDelete: "cascade" }),
  partId: text("part_id").notNull(),
  quantity: integer("quantity").notNull(),
  notes: text("notes"),
});