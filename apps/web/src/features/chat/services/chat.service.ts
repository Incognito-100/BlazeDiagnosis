import { and, asc, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { chatMessages, chatThreads } from '@/db/schema';

export async function createJobChatThread(
  tenantId: string,
  jobCardId: string,
  customerId?: string,
) {
  const [thread] = await db
    .insert(chatThreads)
    .values({ tenantId, jobCardId, customerId, threadType: 'job_customer' })
    .returning();

  return thread;
}

export async function sendChatMessage(input: {
  tenantId: string;
  threadId: string;
  senderUserId: string;
  body: string;
  visibility: 'internal' | 'customer' | 'supplier';
}) {
  const [message] = await db.insert(chatMessages).values(input).returning();
  return message;
}

export async function listChatMessages(tenantId: string, threadId: string) {
  return db
    .select()
    .from(chatMessages)
    .where(
      and(
        eq(chatMessages.tenantId, tenantId),
        eq(chatMessages.threadId, threadId),
      ),
    )
    .orderBy(asc(chatMessages.createdAt));
}
