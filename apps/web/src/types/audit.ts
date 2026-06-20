export type AuditLog = {
  action: string;
  actorUserId: string | null;
  createdAt: string;
  entityId: string | null;
  entityType: string;
  id: string;
  newValue: Record<string, unknown> | null;
};
