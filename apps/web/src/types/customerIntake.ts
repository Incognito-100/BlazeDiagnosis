export type CustomerWizardStep = 'customer' | 'vehicle' | 'review';

export type CustomerWizardCustomer = {
  address: string;
  companyName: string;
  email: string;
  firstName: string;
  lastName: string;
  notes: string;
  phone: string;
  preferredContactMethod: 'email' | 'phone' | 'whatsapp' | '';
};

export type CustomerWizardVehicle = {
  color: string;
  engineDetails: string;
  fuelType: string;
  make: string;
  mileage: string;
  model: string;
  notes: string;
  registrationNumber: string;
  transmission: string;
  vin: string;
  year: string;
};

export type CustomerVehicleIntake = {
  createdAt: string;
  customer: CustomerWizardCustomer;
  id: string;
  status: 'draft' | 'ready_for_review' | 'queued_for_save';
  vehicle: CustomerWizardVehicle;
};
