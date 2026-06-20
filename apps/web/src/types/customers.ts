export type Customer = {
  email?: string;
  firstName?: string;
  id: string;
  lastName?: string;
  phone?: string;
  status?: string;
};

export type CustomerFormState = {
  address: string;
  alternateNumber: string;
  companyName: string;
  email: string;
  fullName: string;
  marketingConsent: boolean;
  mobileNumber: string;
  preferredCommunicationChannel: string;
  taxNumber: string;
};
