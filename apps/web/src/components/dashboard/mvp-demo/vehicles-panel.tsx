'use client';

import { FormEvent, useMemo, useState } from 'react';

import { FormActions, FormField } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type CustomerRecord = {
  id: string;
  fullName: string;
};

type VehicleRecord = {
  id: string;
  customerId: string;
  registrationNumber: string;
  vin?: string;
  make: string;
  model: string;
  year?: number;
  odometer?: number;
};

type VehicleForm = Omit<VehicleRecord, 'id' | 'year' | 'odometer'> & {
  year?: string;
  odometer?: string;
};

const demoCustomers: CustomerRecord[] = [
  { id: 'cust_demo_1', fullName: 'John Doe' },
  { id: 'cust_demo_2', fullName: 'Sarah Lee' },
];

const demoVehicles: VehicleRecord[] = [
  {
    id: 'veh_demo_1',
    customerId: 'cust_demo_1',
    registrationNumber: 'CA 123-456',
    vin: 'DEMO123456789',
    make: 'Toyota',
    model: 'Camry',
    year: 2018,
    odometer: 74210,
  },
  {
    id: 'veh_demo_2',
    customerId: 'cust_demo_2',
    registrationNumber: 'GP 987-654',
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    odometer: 50230,
  },
];

const initialForm: VehicleForm = {
  customerId: demoCustomers[0].id,
  registrationNumber: '',
  vin: '',
  make: '',
  model: '',
  year: '',
  odometer: '',
};

export function VehiclesPanel() {
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(demoVehicles);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<VehicleForm>(initialForm);

  const filteredVehicles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return vehicles;
    }

    return vehicles.filter((vehicle) =>
      [
        vehicle.registrationNumber,
        vehicle.vin,
        vehicle.make,
        vehicle.model,
      ].some((value) => value?.toLowerCase().includes(normalizedSearch)),
    );
  }, [search, vehicles]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const vehicle: VehicleRecord = {
      id: `veh_demo_${Date.now()}`,
      customerId: form.customerId,
      registrationNumber: form.registrationNumber.toUpperCase(),
      vin: form.vin || undefined,
      make: form.make,
      model: form.model,
      year: form.year ? Number(form.year) : undefined,
      odometer: form.odometer ? Number(form.odometer) : undefined,
    };

    setVehicles((currentVehicles) => [vehicle, ...currentVehicles]);
    setForm(initialForm);
  }

  function customerNameFor(vehicle: VehicleRecord) {
    return (
      demoCustomers.find((customer) => customer.id === vehicle.customerId)
        ?.fullName ?? vehicle.customerId
    );
  }

  return (
    <section aria-labelledby="mvp-vehicles-title" className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold" id="mvp-vehicles-title">
          Vehicles
        </h2>
        <p className="text-sm text-neutral-600">
          Client-side demo panel migrated from the legacy frontend.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Add demo vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <FormField id="vehicle-customer" label="Customer">
                <select
                  className="h-10 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
                  id="vehicle-customer"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      customerId: event.target.value,
                    }))
                  }
                  value={form.customerId}
                >
                  {demoCustomers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.fullName}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField id="vehicle-registration" label="Registration number">
                <Input
                  id="vehicle-registration"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      registrationNumber: event.target.value,
                    }))
                  }
                  required
                  value={form.registrationNumber}
                />
              </FormField>
              <FormField id="vehicle-vin" label="VIN">
                <Input
                  id="vehicle-vin"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      vin: event.target.value,
                    }))
                  }
                  value={form.vin}
                />
              </FormField>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField id="vehicle-make" label="Make">
                  <Input
                    id="vehicle-make"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        make: event.target.value,
                      }))
                    }
                    required
                    value={form.make}
                  />
                </FormField>
                <FormField id="vehicle-model" label="Model">
                  <Input
                    id="vehicle-model"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        model: event.target.value,
                      }))
                    }
                    required
                    value={form.model}
                  />
                </FormField>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField id="vehicle-year" label="Year">
                  <Input
                    id="vehicle-year"
                    inputMode="numeric"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        year: event.target.value,
                      }))
                    }
                    value={form.year}
                  />
                </FormField>
                <FormField id="vehicle-odometer" label="Odometer">
                  <Input
                    id="vehicle-odometer"
                    inputMode="numeric"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        odometer: event.target.value,
                      }))
                    }
                    value={form.odometer}
                  />
                </FormField>
              </div>
              <FormActions>
                <Button type="submit">Create demo vehicle</Button>
              </FormActions>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle records</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input
              aria-label="Search vehicles"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search registration, VIN, make, or model"
              value={search}
            />
            <div className="grid gap-3">
              {filteredVehicles.map((vehicle) => (
                <article className="rounded-lg border p-4" key={vehicle.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {vehicle.registrationNumber}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {vehicle.make} {vehicle.model}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-500">
                      Owner: {customerNameFor(vehicle)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    {vehicle.year ?? 'Year n/a'} ·{' '}
                    {vehicle.odometer?.toLocaleString() ?? 0} km ·{' '}
                    {vehicle.vin ?? 'No VIN'}
                  </p>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
