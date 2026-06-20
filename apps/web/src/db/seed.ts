import { db } from "./seed-client"; // ✅ use Node-safe client
import { users } from "./schema/users";
import { partsRequests, partsRequestItems } from "./schema/parts";
import { eq } from "drizzle-orm";

const SYSTEM_TENANT_ID = "00000000-0000-0000-0000-000000000001";
const MOCK_JOB_CARD_ID = "11111111-1111-1111-1111-111111111111";
const MOCK_USER_ID = "22222222-2222-2222-2222-222222222222";

async function main() {
  console.log("⏳ Seeding user...");
  await db
    .insert(users)
    .values({
      id: MOCK_USER_ID,
      tenantId: SYSTEM_TENANT_ID,
      name: "Dev Mechanic Account",
      email: "mechanic@blazediagnosis.local",
      role: "mechanic",
    })
    .onConflictDoNothing();

  console.log("⏳ Seeding parts request...");
  let [request] = await db
    .insert(partsRequests)
    .values({
      id: "99999999-9999-9999-9999-999999999999",
      tenantId: SYSTEM_TENANT_ID,
      jobCardId: MOCK_JOB_CARD_ID,
      requestedByUserId: MOCK_USER_ID,
      status: "draft",
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
        requestId: request.id,
        partId: "SM-001",
        quantity: 2,
        notes: "Seeded test part",
      })
      .onConflictDoNothing();
  }

  console.log("✅ Seeding complete!");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
