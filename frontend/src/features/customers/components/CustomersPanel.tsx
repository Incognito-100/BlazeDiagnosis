'use client';

import { useEffect, useMemo, useState } from 'react';
import { customersApi } from '../api/customers.api';
import type { CustomerCreatePayload, CustomerRecord } from '../types/customers.types';

const DEFAULT_TENANT_ID = 'tenant_demo';

const initialForm: CustomerCreatePayload = {
  tenantId: DEFAULT_TENANT_ID,
  fullName: '',
  mobileNumber: '',
  alternateNumber: '',
  email: '',
  address: '',
  companyName: '',
  taxNumber: '',
  preferredCommunicationChannel: 'EMAIL',
  marketingConsent: false,
};

export function CustomersPanel() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CustomerCreatePayload>(initialForm);

  async function loadCustomers(query?: string) {
    setLoading(true);
    setError(undefined);
    try {
      const response = await customersApi.list(DEFAULT_TENANT_ID, query);
      setCustomers(response);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to load customers.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCustomers();
  }, []);

  const heading = useMemo(() => editingId ? 'Edit customer' : 'Add customer', [editingId]);

  function resetForm() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(undefined);
    try {
      if (editingId) {
        await customersApi.update(editingId, form);
      } else {
        await customersApi.create(form);
      }
      resetForm();
      await loadCustomers(search || undefined);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to save customer.');
    }
  }

  async function handleArchive(id: string) {
    try {
      await customersApi.archive(id);
      if (editingId === id) resetForm();
      await loadCustomers(search || undefined);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to archive customer.');
    }
  }

  function startEdit(customer: CustomerRecord) {
    setEditingId(customer.id);
    setForm({
      tenantId: customer.tenantId,
      fullName: customer.fullName,
      mobileNumber: customer.mobileNumber,
      alternateNumber: customer.alternateNumber || '',
      email: customer.email || '',
      address: customer.address || '',
      companyName: customer.companyName || '',
      taxNumber: customer.taxNumber || '',
      preferredCommunicationChannel: customer.preferredCommunicationChannel || 'EMAIL',
      marketingConsent: customer.marketingConsent,
    });
  }

  return (
    <section className="grid gap-4 rounded-xl bg-gradient-to-bl from-[#08101c] via-[#0f1f53] to-[#0d1728] p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold  text-white">Customers</h2>
          <p className="text-gray-400">Create, edit, archive, and search customer records.</p>
        </div>
        <div className="flex gap-2">
          <input
            className="rounded border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, phone, email, company"
          />
          <button className="rounded bg-blue-600 px-4 py-1.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50" type="button" onClick={() => void loadCustomers(search || undefined)} disabled={loading}>Search</button>
          <button className="rounded border border-gray-300 bg-white px-4 py-1.5 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" type="button" onClick={() => { setSearch(''); void loadCustomers(); }} disabled={loading}>Clear</button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(320px,420px)_1fr] gap-4">
        <form className="grid gap-2.5 rounded-xl border border-[#3B82F6] font-extrabold border-opacity-45 p-4 bg-gradient-to-r from-[#2563eb] to-[#38bdf8]" onSubmit={(event) => void handleSubmit(event)}>
          <strong className="text-lg font-bold  text-white">{heading}</strong>
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} placeholder="Full name" required />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.mobileNumber} onChange={(event) => setForm((current) => ({ ...current, mobileNumber: event.target.value }))} placeholder="Mobile number" required />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.alternateNumber || ''} onChange={(event) => setForm((current) => ({ ...current, alternateNumber: event.target.value }))} placeholder="Alternate number" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.email || ''} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.companyName || ''} onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))} placeholder="Company name" />
          <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.address || ''} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} placeholder="Address" />
          <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.preferredCommunicationChannel || 'EMAIL'} onChange={(event) => setForm((current) => ({ ...current, preferredCommunicationChannel: event.target.value as CustomerCreatePayload['preferredCommunicationChannel'] }))}>
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
            <option value="WHATSAPP">WhatsApp</option>
          </select>
          <label className="flex items-center gap-2 text-sm  text-white">
            <input className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" type="checkbox" checked={form.marketingConsent} onChange={(event) => setForm((current) => ({ ...current, marketingConsent: event.target.checked }))} />
            Marketing consent
          </label>
          <div className="flex gap-2 pt-2">
            <button className="w-full rounded-lg bg-gradient-to-bl from-[#08101c] via-[#0f1f53] to-[#0d1728]  px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-350 hover:-translate-y-1" type="submit">{editingId ? 'Save changes' : 'Create customer'}</button>
            {editingId ? <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition" type="button" onClick={resetForm}>Cancel</button> : null}
          </div>
        </form>

        <div className="grid gap-3 auto-rows-start">
          {loading ? <div className="rounded-xl border border-gray-200 p-4 text-center text-gray-500">Loading customers…</div> : null}
          {!loading && customers.length === 0 ? <div className="rounded-xl border border-gray-200 p-4 text-center text-gray-400">No customers found.</div> : null}
          {customers.map((customer) => (
            <div key={customer.id} className="grid gap-1.5 rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-base font-semibold text-gray-900">{customer.fullName}</strong>
                <div className="flex gap-2">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800" type="button" onClick={() => startEdit(customer)}>Edit</button>
                  <button className="text-sm font-medium text-red-600 hover:text-red-800" type="button" onClick={() => void handleArchive(customer.id)}>Archive</button>
                </div>
              </div>
              <div className="text-sm text-gray-500">{customer.mobileNumber}</div>
              <div className="text-sm text-gray-500">{customer.email || 'No email'}</div>
              <div className="text-sm text-gray-500">{customer.companyName || 'Private client'}</div>
              <div className="mt-1 text-xs font-medium inline-block text-gray-400">Preferred channel: {customer.preferredCommunicationChannel || 'EMAIL'}</div>
            </div>
          ))}
        </div>
      </div>

      {error ? <div style={{ padding: 12, background: '#fef2f2', borderRadius: 8 }}>{error}</div> : null}
    </section>
  );
}
