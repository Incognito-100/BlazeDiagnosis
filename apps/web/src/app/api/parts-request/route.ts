import { NextResponse } from "next/server";
import { partsRequestItems, partsRequests } from "@/db/schema/parts";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";

// 🔍 FETCH PARTS REQUESTS BY JOBCARD ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobCardId = searchParams.get("jobCardId");

  if (!jobCardId) {
    return NextResponse.json(
      { error: "Missing required 'jobCardId' parameter" }, 
      { status: 400 }
    );
  }

  try {
    const requests = await db
      .select()
      .from(partsRequests)
      .where(eq(partsRequests.jobCardId, jobCardId));
      
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching parts requests:", error);
    return NextResponse.json(
      { error: "Error fetching parts requests" }, 
      { status: 500 }
    );
  }
}

// ➕ CREATE NEW PARTS REQUEST DRAFT WITH ITEMS
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tenantId, jobCardId, staffId, items } = body;

    // Strict validation check for payload integrity
    if (!tenantId || !jobCardId || !staffId || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Missing required parameters or 'items' is not an array" }, 
        { status: 400 }
      );
    }

    // 1️ Create the main request header
    const [request] = await db.insert(partsRequests).values({
      tenantId,
      jobCardId,
      requestedByUserId: staffId,
      status: "draft",
    }).returning();

    // 2️ Map over and batch insert linked array items safely
    const itemValues = items.map((item: any) => ({
      requestId: request.id,
      partId: item.partId,
      quantity: item.quantity,
      notes: item.notes || null, // Fallback if no specific notes provided
    }));

    await db.insert(partsRequestItems).values(itemValues);

    return NextResponse.json(request);
  } catch (error) {
    console.error("Error creating parts request:", error);
    return NextResponse.json(
      { error: "Error creating parts request" }, 
      { status: 500 }
    );
  }
}