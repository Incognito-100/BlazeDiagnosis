'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

import { FormActions, FormField } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { VehicleFormState } from '@/types/vehicles';

const initialState: VehicleFormState = {
  color: '',
  customerId: '',
  engineType: '',
  fuelType: '',
  make: '',
  model: '',
  odometer: '',
  registrationNumber: '',
  transmission: '',
  variant: '',
  vin: '',
  year: '',
};

export function VehicleForm() {
  const [vehicle, setVehicle] = useState<VehicleFormState>(initialState);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setVehicle((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(`${vehicle.registrationNumber || 'Vehicle'} is ready to be saved once the vehicle mutation is connected.`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capture vehicle</CardTitle>
        <CardDescription>
          Record vehicle identity and service intake metadata in a responsive, workshop-friendly form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField id="customerId" label="Customer ID">
              <Input
                id="customerId"
                name="customerId"
                onChange={handleChange}
                required
                value={vehicle.customerId}
              />
            </FormField>
            <FormField id="registrationNumber" label="Registration number">
              <Input
                id="registrationNumber"
                name="registrationNumber"
                onChange={handleChange}
                required
                value={vehicle.registrationNumber}
              />
            </FormField>
            <FormField id="vin" label="VIN">
              <Input id="vin" name="vin" onChange={handleChange} value={vehicle.vin} />
            </FormField>
            <FormField id="make" label="Make">
              <Input id="make" name="make" onChange={handleChange} required value={vehicle.make} />
            </FormField>
            <FormField id="model" label="Model">
              <Input id="model" name="model" onChange={handleChange} required value={vehicle.model} />
            </FormField>
            <FormField id="variant" label="Variant">
              <Input id="variant" name="variant" onChange={handleChange} value={vehicle.variant} />
            </FormField>
            <FormField id="year" label="Year">
              <Input id="year" inputMode="numeric" name="year" onChange={handleChange} value={vehicle.year} />
            </FormField>
            <FormField id="odometer" label="Odometer">
              <Input id="odometer" inputMode="numeric" name="odometer" onChange={handleChange} value={vehicle.odometer} />
            </FormField>
            <FormField id="color" label="Color">
              <Input id="color" name="color" onChange={handleChange} value={vehicle.color} />
            </FormField>
            <FormField id="engineType" label="Engine type">
              <Input id="engineType" name="engineType" onChange={handleChange} value={vehicle.engineType} />
            </FormField>
            <FormField id="fuelType" label="Fuel type">
              <select
                className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                id="fuelType"
                name="fuelType"
                onChange={handleChange}
                value={vehicle.fuelType}
              >
                <option value="">Select fuel type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </FormField>
            <FormField id="transmission" label="Transmission">
              <select
                className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                id="transmission"
                name="transmission"
                onChange={handleChange}
                value={vehicle.transmission}
              >
                <option value="">Select transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </FormField>
          </div>

          {statusMessage ? (
            <p aria-live="polite" className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
              {statusMessage}
            </p>
          ) : null}

          <FormActions>
            <Button type="submit" variant="accent">
              Save vehicle
            </Button>
            <Button onClick={() => setVehicle(initialState)} type="button" variant="outline">
              Reset
            </Button>
          </FormActions>
        </form>
      </CardContent>
    </Card>
  );
}
