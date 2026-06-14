import { and, desc, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { notifications } from '@/db/schema';

export async function createInAppNotification(input: {
  tenantId: string;
  recipientUserId: string;
  type: string;
  title: string;
  body: string;
}) {
  const [notification] = await db
    .insert(notifications)
    .values({ ...input, channel: 'in_app' })
    .returning();
  return notification;
}

export async function listUserNotifications(
  tenantId: string,
  recipientUserId: string,
) {
  return db
    .select()
    .from(notifications)
    .where(
      and(
        eq(notifications.tenantId, tenantId),
        eq(notifications.recipientUserId, recipientUserId),
      ),
    )
    .orderBy(desc(notifications.createdAt));
}

export async function markNotificationRead(
  tenantId: string,
  notificationId: string,
) {
  const [notification] = await db
    .update(notifications)
    .set({ status: 'read', readAt: new Date() })
    .where(
      and(
        eq(notifications.tenantId, tenantId),
        eq(notifications.id, notificationId),
      ),
    )
    .returning();

  return notification;
}
