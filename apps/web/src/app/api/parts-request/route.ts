import { NextResponse } from "next/server";
import { partsRequestItems, partsRequests } from "@/db/schema/parts";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";

// 🔍 FETCH PARTS REQUESTS BY JOBCARD ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobCardId = searchParams.get("jobCardId");

  if (!jobCardId) {
    return NextResponse.json({ error: "Missing required 'jobCardId'" }, { status: 400 });
  }

  try {
    const requests = await db
      .select()
      .from(partsRequests)
      .where(eq(partsRequests.jobCardId, jobCardId));

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching parts requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ➕ CREATE NEW PARTS REQUEST DRAFT WITH ITEMS
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tenantId, jobCardId, staffId, items } = body;

    if (!tenantId || !jobCardId || !staffId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid request payload. Ensure 'items' is a non-empty array." },
        { status: 400 }
      );
    }

    // 1️⃣ Create parent request
    const [request] = await db.insert(partsRequests).values({
      tenantId,
      jobCardId,
      requestedByUserId: staffId,
      status: "draft",
    }).returning();

    // 2️⃣ Insert child items
    const itemValues: (typeof partsRequestItems.$inferInsert)[] = items.map((item: any) => ({
      requestId: request.id,
      partId: String(item.partId || item.partNumber || ""), // ✅ cast to text
      quantity: Number(item.quantity) || 1,
      notes: item.notes || null,
    }));

    await db.insert(partsRequestItems).values(itemValues);

    return NextResponse.json({ success: true, requestId: request.id }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Critical API Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to process parts request" },
      { status: 500 }
    );
  }
}
