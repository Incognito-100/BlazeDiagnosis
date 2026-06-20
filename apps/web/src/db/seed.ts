import 'dotenv/config';

import { eq } from 'drizzle-orm';

import { db } from './seedClient';
import { partsRequestItems, partsRequests } from './schema/suppliers';
import { users } from './schema/users';

const SYSTEM_TENANT_ID = '00000000-0000-0000-0000-000000000001';
const MOCK_JOB_CARD_ID = '11111111-1111-1111-1111-111111111111';
const MOCK_USER_ID = '22222222-2222-2222-2222-222222222222';

async function main() {
  console.log('Seeding user...');
  await db
    .insert(users)
    .values({
      email: 'mechanic@blazediagnosis.local',
      id: MOCK_USER_ID,
      name: 'Dev Mechanic Account',
      role: 'mechanic',
      tenantId: SYSTEM_TENANT_ID,
    })
    .onConflictDoNothing();

  console.log('Seeding parts request...');
  let [request] = await db
    .insert(partsRequests)
    .values({
      id: '99999999-9999-9999-9999-999999999999',
      jobCardId: MOCK_JOB_CARD_ID,
      requestedByUserId: MOCK_USER_ID,
      status: 'draft',
      tenantId: SYSTEM_TENANT_ID,
    })
    .onConflictDoNothing()
    .returning();

  if (!request) {
    [request] = await db
      .select()
      .from(partsRequests)
      .where(eq(partsRequests.jobCardId, MOCK_JOB_CARD_ID))
      .limit(1);
  }

  if (request) {
    await db
      .insert(partsRequestItems)
      .values({
        notes: 'Seeded test part',
        partName: 'Starter motor',
        partNumber: 'SM-001',
        partsRequestId: request.id,
        quantity: '2',
        tenantId: SYSTEM_TENANT_ID,
      })
      .onConflictDoNothing();
  }

  console.log('Seeding complete.');
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
