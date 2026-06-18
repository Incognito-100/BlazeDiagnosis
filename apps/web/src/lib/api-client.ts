export async function fetchCustomers(tenantId: string) {
    try {
        const response = await fetch(`/api/customers?tenantId=${tenantId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch customers: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}