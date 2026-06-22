import type { ApiResponse } from '@/types/api';
import type { Customer } from '@/types/customers';
import { VehicleRecord } from '@/types/vehicles';

type RequestOptions = RequestInit & {
  errorMessage?: string;
};

export async function requestJson<TData>(
  input: RequestInfo | URL,
  { errorMessage = 'API request failed.', ...init }: RequestOptions = {},
) {
  const response = await fetch(input, init);
  const payload = (await response.json()) as ApiResponse<TData>;

  if (!response.ok || !payload.success) {
    const message = payload.success ? errorMessage : payload.error.message;
    throw new Error(message);
  }

  return payload.data;
}

export async function fetchCustomers(query?: string) {
  const params = query ? `?q=${encodeURIComponent(query)}` : '';
  return requestJson<{ customers: Customer[] }>(`/api/customers${params}`, {
    errorMessage: 'Failed to fetch customers.',
  });
}

export async function fetchCustomerById(customerId: string) {
  return requestJson<Customer>(/api/customers/${customerId}, {
    errorMessage: 'Failed to fetch customer profile detail records.',
  });
}

export async function fetchVehiclesForCustomer(customerId: string) {
  return requestJson<{ vehicles: unknown[] }>(`/api/vehicles/${customerId}`, {
    errorMessage: 'Failed to fetch customer vehicles.',
  });
}


export async function fetchCustomerIntakeHistory(customerid:string)
{
  return requestJson<{ intakes: VehicleRecord[] }>(`/api/customer-intakes?customerId=${customerid}`, {
    errorMessage: 'Failed to fetch customer intake history'
  })
}

export async function createCustomerVehicleIntake(intakeData: unknown) {
  return requestJson<{ intake: unknown }>(/api/customer-intakes, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intakeData),
    errorMessage: 'Failed to create new customer vehicle intake.',
  });
}

export async function createCustomer(customerData: unknown) {
  return requestJson<Customer>(`/api/customers/${customerId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerData),
    errorMessage: 'Failed to create new customer profile.',
  });
}