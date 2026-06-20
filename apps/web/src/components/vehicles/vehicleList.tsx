'use client';

import { useMemo, useState } from 'react';

import { StatusBadge } from '@/components/common/statusBadge';
import {
  EmptyState,
  ResponsiveTable,
  tableCellClassName,
  tableHeadClassName,
} from '@/components/data-display';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import type { VehicleRecord } from '@/types/vehicles';

const demoVehicles: VehicleRecord[] = [
  {
    fuel: 'Petrol',
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    registration: 'ABC 123 GP',
    status: 'Pending',
    transmission: 'Automatic',
    variant: 'LE',
    vin: '1HGBH41JXMN109186',
    year: '2020',
  },
  {
    fuel: 'Petrol',
    id: '2',
    make: 'Honda',
    model: 'Civic',
    registration: 'DEF 456 GP',
    status: 'Completed',
    transmission: 'Manual',
    variant: 'EX',
    vin: '2T1BURHE9JC234567',
    year: '2019',
  },
  {
    fuel: 'Diesel',
    id: '3',
    make: 'Ford',
    model: 'Ranger',
    registration: 'GHI 789 GP',
    status: 'In service',
    transmission: 'Automatic',
    variant: 'XLT',
    vin: '3N1AB6AP5BL789012',
    year: '2021',
  },
];

const statusTone: Record<VehicleRecord['status'], 'neutral' | 'success' | 'warning'> = {
  Completed: 'success',
  'In service': 'neutral',
  Pending: 'warning',
};

export function VehicleList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return demoVehicles;
    }

    return demoVehicles.filter((vehicle) =>
      [
        vehicle.registration,
        vehicle.vin,
        vehicle.make,
        vehicle.model,
        vehicle.variant,
        vehicle.fuel,
        vehicle.transmission,
        vehicle.year,
        vehicle.status,
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [searchQuery]);

  return (
    <Card>
      <CardHeader className="gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <CardTitle>Vehicle directory</CardTitle>
          <CardDescription>
            Search active vehicles by registration, VIN, make, model, fuel type, or status.
          </CardDescription>
        </div>
        <div className="w-full md:max-w-sm">
          <Input
            aria-label="Search vehicles"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search registration, VIN, make..."
            value={searchQuery}
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredVehicles.length === 0 ? (
          <EmptyState
            description="No vehicles match the current search. Clear the filter or capture a new vehicle."
            title="No vehicles found"
          />
        ) : (
          <ResponsiveTable>
            <thead>
              <tr className={tableHeadClassName}>
                <th className={tableCellClassName}>Vehicle</th>
                <th className={tableCellClassName}>Registration</th>
                <th className={tableCellClassName}>VIN</th>
                <th className={tableCellClassName}>Fuel</th>
                <th className={tableCellClassName}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredVehicles.map((vehicle) => (
                <tr className="transition hover:bg-muted/40" key={vehicle.id}>
                  <td className={tableCellClassName}>
                    <div className="font-semibold text-foreground">
                      {vehicle.make} {vehicle.model}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {vehicle.variant} • {vehicle.year} • {vehicle.transmission}
                    </div>
                  </td>
                  <td className={`${tableCellClassName} font-mono text-sm`}>
                    {vehicle.registration}
                  </td>
                  <td className={`${tableCellClassName} font-mono text-xs text-muted-foreground`}>
                    {vehicle.vin}
                  </td>
                  <td className={`${tableCellClassName} text-muted-foreground`}>
                    {vehicle.fuel}
                  </td>
                  <td className={tableCellClassName}>
                    <StatusBadge tone={statusTone[vehicle.status]}>
                      {vehicle.status}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </ResponsiveTable>
        )}
      </CardContent>
    </Card>
  );
}
