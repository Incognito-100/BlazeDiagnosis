import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { supplierResponses, supplierResponseItems } from "@/db/schema/parts";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const partsRequestId = searchParams.get("partsRequestId");

  if (!partsRequestId) {
    return NextResponse.json({ error: "Missing required 'partsRequestId' parameter" }, { status: 400 });
  }

  try {
    const responses = await db
      .select()
      .from(supplierResponses)
      .where(eq(supplierResponses.partsRequestId, partsRequestId));
    return NextResponse.json(responses);
  } catch (error) {
    console.error("Error fetching supplier responses:", error);
    return NextResponse.json({ error: "Error fetching supplier responses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { supplierId, partsRequestId, subtotal, tax, deliveryFee, grandTotal, items } = body;

    if (!supplierId || !partsRequestId || !items) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // 1️ Create the response header
    const [response] = await db.insert(supplierResponses).values({
      supplierId,
      partsRequestId,
      subtotal,
      tax,
      deliveryFee,
      grandTotal,
      status: "draft",
    }).returning();

    // 2️ Insert linked items
    const itemValues = items.map((item: any) => ({
      responseId: response.id,
      partId: item.partId,
      brand: item.brand,
      unitPrice: item.unitPrice,
      availability: item.availability,
      eta: item.eta,
    }));

    await db.insert(supplierResponseItems).values(itemValues);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating supplier response:", error);
    return NextResponse.json({ error: "Error creating supplier response" }, { status: 500 });
  }
}
