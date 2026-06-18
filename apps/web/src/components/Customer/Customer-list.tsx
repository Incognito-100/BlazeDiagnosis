"use client";
import { useEffect, useState } from 'react';

export const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
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

                const data : Customer[] = await response.json();
                setCustomers(data);
            } catch (err : any) {
                setError(err.message || 'An error occurred while fetching customers.');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div className="p-20px font-sans">
            <h2>Customer Dictionary</h2>
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="border-b-2 border-gray-300">
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Phone</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} className="border-b border-gray-300">
                            <td className="p-2 font-bold">{customer.name}</td>
                            <td className="p-2">{customer.email}</td>
                            <td className="p-2">{customer.phone}</td>
                            <td className={`p-2 font-bold ${customer.status === 'Pending' ? 'text-orange-500' : 'text-green-500'}`}>
                                {customer.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// TODO: Don't use curly braces for CSS values unless referencing a variable — writing style={{ border: "" }} is bad practice.