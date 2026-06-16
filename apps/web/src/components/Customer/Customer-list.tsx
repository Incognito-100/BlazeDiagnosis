"use client";
import { useState } from 'react';

export const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([
        { id: '1', name: 'Ashley Graham', email: 'ashley.graham@example.com', phone: '0759468523', status: 'Pending' },
        { id: '2', name: 'John Doe', email: 'john.doe@example.com', phone: '0759468524', status: 'Completed' },
        { id: '3', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0759468525', status: 'Pending' },
        { id: '4', name: 'Michael Brown', email: 'michael.brown@example.com', phone: '0759468526', status: 'Completed' },
    ]);

    return (
        <div className={"p-20px font-sans"}>
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
                            <td className="p-2">
                                <span className={`font-bold ${customer.status === 'Pending' ? 'text-orange-500' : 'text-green-500'}`}>
                                    {customer.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};