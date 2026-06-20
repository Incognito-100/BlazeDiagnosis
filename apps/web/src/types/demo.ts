export type SupplierBranch = {
  eta: string;
  name: string;
  stock: number;
};

export type MarketplacePart = {
  branches: SupplierBranch[];
  category: string;
  id: number;
  name: string;
  price: string;
  sku: string;
};

export type MarketplacePanelProps = {
  onSelectPart: (partId: number) => void;
  selectedPartId: number;
};

export type DemoCustomerRecord = {
  fullName: string;
  id: string;
};

export type DemoVehicleRecord = {
  customerId: string;
  id: string;
  make: string;
  model: string;
  odometer?: number;
  registrationNumber: string;
  vin?: string;
  year?: number;
};

export type DemoVehicleForm = Omit<
  DemoVehicleRecord,
  'id' | 'odometer' | 'year'
> & {
  odometer?: string;
  year?: string;
};
