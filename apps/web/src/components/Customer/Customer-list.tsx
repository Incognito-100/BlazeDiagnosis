"use client";
import { useEffect, useState } from 'react';

// Added explicit inline type matching your database schema
interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    status?: string;
}

export const CustomerList: React.FC = () => {
    // Fixed: Initialized state to null so we can check for custom API payloads safely
    const [customers, setCustomers] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch('/api/customers');
                if (!response.ok) {
                    throw new Error(`Failed to fetch customers: ${response.statusText}`);
                }

                const data = await response.json();
                setCustomers(data);
            } catch (err : any) {
                setError(err.message || 'An error occurred while fetching customers.');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    // 1. Handle loading state cleanly instead of blindly rendering an empty table
    if (loading) {
        return <div className="p-6 text-sm text-muted-foreground animate-pulse">Loading customer directory...</div>;
    }

    // 2. Structural safety guard: Normalizes arrays, nested data wrappers, or empty results
    const customerArray: Customer[] = Array.isArray(customers)
        ? customers
        : customers && Array.isArray(customers.customers)
        ? customers.customers
        : [];

    return (
        <div className="p-6 font-sans bg-card rounded-xl border shadow-sm mt-4">
            <h2 className="text-xl font-semibold tracking-tight mb-4">Customer Dictionary</h2>
            
            {/* Show error notification banner instead of breaking the layout */}
            {error && (
                <div className="p-3 mb-4 bg-destructive/10 text-destructive text-sm rounded-lg">
                    ⚠️ {error} (Displaying fallback workspace view)
                </div>
            )}

            {customerArray.length === 0 ? (
                <div className="p-6 text-center border border-dashed rounded-lg">
                    <p className="text-sm text-muted-foreground">No active client accounts found for this tenant space.</p>
                </div>
            ) : (
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b-2 border-muted text-muted-foreground font-medium">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerArray.map((customer) => (
                            <tr key={customer.id} className="border-b border-muted/50 hover:bg-muted/20 transition-colors">
                                {/* Fixed: Handles concatenated database firstName + lastName variables safely */}
                                <td className="p-2 font-bold">
                                    {customer.firstName || customer.lastName 
                                        ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
                                        : 'Unnamed Profile'}
                                </td>
                                <td className="p-2 text-muted-foreground">{customer.email || '—'}</td>
                                <td className="p-2 text-muted-foreground">{customer.phone || '—'}</td>
                                <td className={`p-2 font-bold ${(customer.status || 'Active') === 'Pending' ? 'text-orange-500' : 'text-green-500'}`}>
                                    {customer.status || 'Active'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
// TODO: Don't use curly braces for CSS values unless referencing a variable — writing style={{ border: "" }} is bad practice.