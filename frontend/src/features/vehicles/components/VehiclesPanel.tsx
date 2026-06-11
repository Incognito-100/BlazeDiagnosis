'use client';

import { useEffect, useState } from 'react';
import { customersApi } from '../../customers/api/customers.api';
import type { CustomerRecord } from '../../customers/types/customers.types';
import { vehiclesApi } from '../api/vehicles.api';
import type { VehicleCreatePayload, VehicleRecord } from '../types/vehicles.types';

const DEFAULT_TENANT_ID = 'tenant_demo';

const initialForm: VehicleCreatePayload = {
  tenantId: DEFAULT_TENANT_ID,
  customerId: 'cust_demo_1',
  registrationNumber: '',
  vin: '',
  make: '',
  model: '',
  variant: '',
  year: undefined,
  engineType: '',
  fuelType: '',
  transmission: '',
  odometer: undefined,
  color: '',
};

export function VehiclesPanel() {
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<VehicleCreatePayload>(initialForm);

  async function loadVehicles(query?: string) {
    setLoading(true);
    setError(undefined);
    try {
      const [vehicleResults, customerResults] = await Promise.all([
        vehiclesApi.list(DEFAULT_TENANT_ID, query),
        customersApi.list(DEFAULT_TENANT_ID),
      ]);
      setVehicles(vehicleResults);
      setCustomers(customerResults);
      if (!editingId && customerResults[0] && !form.customerId) {
        setForm((current) => ({ ...current, customerId: customerResults[0].id }));
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to load vehicles.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadVehicles();
  }, []);

  function resetForm() {
    setEditingId(null);
    setForm((current) => ({ ...initialForm, customerId: customers[0]?.id || current.customerId || 'cust_demo_1' }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(undefined);
    try {
      const payload = {
        ...form,
        year: form.year ? Number(form.year) : undefined,
        odometer: form.odometer ? Number(form.odometer) : undefined,
      };

      if (editingId) {
        await vehiclesApi.update(editingId, payload);
      } else {
        await vehiclesApi.create(payload);
      }
      resetForm();
      await loadVehicles(search || undefined);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to save vehicle.');
    }
  }

  async function handleArchive(id: string) {
    try {
      await vehiclesApi.archive(id);
      if (editingId === id) resetForm();
      await loadVehicles(search || undefined);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to archive vehicle.');
    }
  }

  function startEdit(vehicle: VehicleRecord) {
    setEditingId(vehicle.id);
    setForm({
      tenantId: vehicle.tenantId,
      customerId: vehicle.customerId,
      registrationNumber: vehicle.registrationNumber,
      vin: vehicle.vin || '',
      make: vehicle.make,
      model: vehicle.model,
      variant: vehicle.variant || '',
      year: vehicle.year,
      engineType: vehicle.engineType || '',
      fuelType: vehicle.fuelType || '',
      transmission: vehicle.transmission || '',
      odometer: vehicle.odometer,
      color: vehicle.color || '',
    });
  }

  function customerNameFor(vehicle: VehicleRecord) {
    return customers.find((customer) => customer.id === vehicle.customerId)?.fullName || vehicle.customerId;
  }

  return (
    <section className="grid gap-4 rounded-xl bg-gradient-to-bl from-[#08101c] via-[#0f1f53] to-[#0d1728] p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold  text-white">Vehicles</h2>
          <p className="text-gray-400">Create, edit, archive, and search vehicle records.</p>
        </div>
        <div className="flex gap-2">
          <input className="rounded border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search reg, VIN, make, model" />
          <button className="rounded bg-blue-600 px-4 py-1.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50" type="button" onClick={() => void loadVehicles(search || undefined)} disabled={loading}>Search</button>
          <button className="rounded border border-gray-300 bg-white px-4 py-1.5 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" type="button" onClick={() => { setSearch(''); void loadVehicles(); }} disabled={loading}>Clear</button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(320px,420px)_1fr] gap-4">
        <form className="grid gap-2.5 rounded-xl border border-[#3B82F6] font-extrabold border-opacity-45 p-4 bg-gradient-to-r from-[#2563eb] to-[#38bdf8]" onSubmit={(event) => void handleSubmit(event)}>
          <strong className="text-lg font-bold  text-white">{editingId ? 'Edit vehicle' : 'Add vehicle'}</strong>
          <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.customerId} onChange={(event) => setForm((current) => ({ ...current, customerId: event.target.value }))} required>
            {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.fullName}</option>)}
          </select>
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.registrationNumber} onChange={(event) => setForm((current) => ({ ...current, registrationNumber: event.target.value.toUpperCase() }))} placeholder="Registration number" required />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.vin || ''} onChange={(event) => setForm((current) => ({ ...current, vin: event.target.value.toUpperCase() }))} placeholder="VIN" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.make} onChange={(event) => setForm((current) => ({ ...current, make: event.target.value }))} placeholder="Make" required />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.model} onChange={(event) => setForm((current) => ({ ...current, model: event.target.value }))} placeholder="Model" required />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.variant || ''} onChange={(event) => setForm((current) => ({ ...current, variant: event.target.value }))} placeholder="Variant" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.year || ''} onChange={(event) => setForm((current) => ({ ...current, year: event.target.value ? Number(event.target.value) : undefined }))} placeholder="Year" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.engineType || ''} onChange={(event) => setForm((current) => ({ ...current, engineType: event.target.value }))} placeholder="Engine type" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.fuelType || ''} onChange={(event) => setForm((current) => ({ ...current, fuelType: event.target.value }))} placeholder="Fuel type" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.transmission || ''} onChange={(event) => setForm((current) => ({ ...current, transmission: event.target.value }))} placeholder="Transmission" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.odometer || ''} onChange={(event) => setForm((current) => ({ ...current, odometer: event.target.value ? Number(event.target.value) : undefined }))} placeholder="Odometer" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.color || ''} onChange={(event) => setForm((current) => ({ ...current, color: event.target.value }))} placeholder="Color" />
          <div className="flex items-center gap-2 text-sm  text-white">
            <button className="w-full rounded-lg bg-gradient-to-bl from-[#08101c] via-[#0f1f53] to-[#0d1728]  px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-350 hover:-translate-y-1" 
            type="submit">{editingId ? 'Save changes' : 'Create vehicle'}</button>
            {editingId ? <button type="button" onClick={resetForm}>Cancel</button> : null}
          </div>
        </form>

        <div className="grid gap-3 auto-rows-start">
          {loading ? <div className="rounded-xl border border-gray-200 p-4 text-center text-gray-500">Loading vehicles…</div> : null}
          {!loading && vehicles.length === 0 ? <div className="rounded-xl border border-gray-200 p-4 text-center text-gray-400">No vehicles found.</div> : null}
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="grid gap-1.5 rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-base font-semibold text-gray-900">{vehicle.registrationNumber}</strong>
                <div className="flex gap-2">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800" type="button" onClick={() => startEdit(vehicle)}>Edit</button>
                  <button className="text-sm font-medium text-red-600 hover:text-red-800" type="button" onClick={() => void handleArchive(vehicle.id)}>Archive</button>
                </div>
              </div>
              <div className="text-sm text-gray-500">{vehicle.make} {vehicle.model}{vehicle.variant ? ` ${vehicle.variant}` : ''}</div>
              <div className="text-sm text-gray-500">Owner: {customerNameFor(vehicle)}</div>
              <div className="text-sm text-gray-500">{vehicle.year || 'Year n/a'} · {vehicle.odometer || 0} km</div>
              <div className="text-sm text-gray-500">{vehicle.vin || 'No VIN'} · {vehicle.fuelType || 'Fuel n/a'} · {vehicle.transmission || 'Transmission n/a'}</div>
            </div>
          ))}
        </div>
      </div>

      {error ? <div style={{ padding: 12, background: '#fef2f2', borderRadius: 8 }}>{error}</div> : null}
    </section>
  );
}
