export type VehicleStatus = 'Completed' | 'In service' | 'Pending';

export type VehicleRecord = {
  color?: string;
  engineType?: string;
  fuel: string;
  id: string;
  make: string;
  model: string;
  registration: string;
  status: VehicleStatus;
  transmission: string;
  variant: string;
  vin: string;
  year: string;
};

export type VehicleFormState = {
  color: string;
  customerId: string;
  engineType: string;
  fuelType: string;
  make: string;
  model: string;
  odometer: string;
  registrationNumber: string;
  transmission: string;
  variant: string;
  vin: string;
  year: string;
};

export type VehicleDetailRecord = {
  archived?: boolean;
  createdAt?: string;
  customerName?: string;
  id: string;
  inspections?: { date: string; id: string }[];
  jobs?: { id: string; status: string }[];
  make?: string;
  model?: string;
  quotes?: { amount: number; id: string }[];
  registrationNumber?: string;
  updatedAt?: string;
};


export type VehicleDetailProps = {
  vehicleId: string;
};
