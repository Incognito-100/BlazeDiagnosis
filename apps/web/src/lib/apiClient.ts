import type { ApiResponse } from '@/types/api';
import type { Customer } from '@/types/customers';

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

export async function fetchVehiclesForCustomer(customerId: string) {
  return requestJson<{ vehicles: unknown[] }>(`/api/vehicles/${customerId}`, {
    errorMessage: 'Failed to fetch customer vehicles.',
  });
}
