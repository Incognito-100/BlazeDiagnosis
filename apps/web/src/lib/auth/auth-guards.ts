// apps/web/src/lib/auth/auth-guards.ts
// TEMPORARY MOCK - Will be replaced with real auth

export async function requireTenantContext() {
  console.log("Mock tenant context called");
  
  // Use the tenant ID you just created
  const tenantId = "efb29b83-c510-44bb-a74a-e3b0c5d1349b";
  
  console.log("Using tenant ID:", tenantId);
  
  return { 
    tenantId: tenantId,
    userId: "temp-user-id"
  };
}

export async function requireTenantPermission(tenantId: string, permission: string) {
  console.log("Mock permission check:", { tenantId, permission });
  return true;
}