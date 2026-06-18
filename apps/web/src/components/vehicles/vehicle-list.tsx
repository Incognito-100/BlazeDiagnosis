"use client";
import { useState } from 'react';

export const VehicleList: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([
        { id: '1', registration: 'ABC123', vin: '1HGBH41JXMN109186', make: 'Toyota', model: 'Camry', variant: 'LE', fuel: 'Gasoline', transmission: 'Automatic', year: '2020', status: 'Pending' },
        { id: '2', registration: 'DEF456', vin: '2T1BURHE9JC234567', make: 'Honda', model: 'Civic', variant: 'EX', fuel: 'Gasoline', transmission: 'Manual', year: '2019', status: 'Completed' },
        { id: '3', registration: 'GHI789', vin: '3N1AB6AP5BL789012', make: 'Ford', model: 'F-150', variant: 'XLT', fuel: 'Diesel', transmission: 'Automatic', year: '2021', status: 'Pending' },
        { id: '4', registration: 'JKL012', vin: '4T1BURHE9JC234567', make: 'Chevrolet', model: 'Silverado', variant: 'LT', fuel: 'Diesel', transmission: 'Automatic', year: '2020', status: 'Completed' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredVehicles = vehicles.filter((vehicle) => {
        const query = searchQuery.toLowerCase().trim();

        if (!query) return true;

        return (
            vehicle.registration.toLowerCase().includes(query) ||
            vehicle.vin.toLowerCase().includes(query) ||
            vehicle.make.toLowerCase().includes(query) ||
            vehicle.model.toLowerCase().includes(query) ||
            vehicle.variant.toLowerCase().includes(query) ||
            vehicle.fuel.toLowerCase().includes(query) ||
            vehicle.transmission.toLowerCase().includes(query)
        );
    });

    return (
        <div className="p-20px font-sans">
            <h2>Vehicle Dictionary</h2>

             <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by registration, VIN, make, model, variant, fuel, transmission..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
            </div>

            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="border-b-2 border-gray-300">
                        <th className="p-2">Make</th>
                        <th className="p-2">Model</th>
                        <th className="p-2">Year</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map((vehicle) => (
                            <tr key={vehicle.id} className="border-b border-gray-300">
                                <td className="p-2 font-bold">{vehicle.make}</td>
                                <td className="p-2">{vehicle.model}</td>
                                <td className="p-2">{vehicle.year}</td>
                            <td className={`p-2 font-bold ${vehicle.status === 'Pending' ? 'text-orange-500' : 'text-green-500'}`}>
                                {vehicle.status}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="p-2 text-center text-gray-500 italic">
                                No vehicles found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};