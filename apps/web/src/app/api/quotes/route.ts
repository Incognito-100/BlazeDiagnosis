// apps/web/src/app/api/quotes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createQuoteFromJobCard, addQuoteLineItem } from "@/features/quotes";
import { requireTenantContext } from "@/lib/auth/auth-guards";

export async function POST(request: NextRequest) {
  try {
    const { tenantId } = await requireTenantContext();
    console.log("Tenant ID from context:", tenantId);
    
    if (!tenantId) {
      throw new Error("Tenant ID is required but was not provided");
    }
    
    const body = await request.json();
    console.log("Request body:", body);
    
    // Validate required fields
    if (!body.jobCardId) {
      throw new Error("Job Card ID is required");
    }
    if (!body.customerId) {
      throw new Error("Customer ID is required");
    }
    
    // Create the quote
    const quote = await createQuoteFromJobCard(
      tenantId,
      body.jobCardId,
      body.customerId
    );
    
    console.log("Quote created:", quote);
    
    // Add line items if they exist
    if (body.lineItems && body.lineItems.length > 0) {
      console.log("Adding line items:", body.lineItems);
      for (const item of body.lineItems) {
        if (item.description && item.quantity > 0 && item.unitPrice > 0) {
          await addQuoteLineItem(
            tenantId, 
            quote.id, 
            body.jobCardId, // Pass the jobCardId here
            {
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              type: item.type || 'parts',
            }
          );
        }
      }
    }
    
    return NextResponse.json({ quote }, { status: 201 });
  } catch (error) {
    console.error("Failed to create quote:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create quote" },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) {
  try {
    // TODO: Implement fetching quotes for tenant
    return NextResponse.json({ quotes: [] });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}