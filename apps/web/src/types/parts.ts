export type PartsRequestFormValues = {
  jobCardId: string;
  notes: string;
  partId: string;
  quantity: number;
};

export type CreatePartsRequestItem = {
  notes?: string;
  partId: string | number;
  quantity: number;
};

export type CreatePartsRequestInput = {
  items: CreatePartsRequestItem[];
  jobCardId: string;
  notes?: string;
  staffId?: string;
};

export type CreateSupplierResponseItem = {
  availability: string;
  brand?: string;
  partId: string;
  partName: string;
  partNumber?: string;
  quantityAvailable: string | number;
  unitPrice: string | number;
};

export type CreateSupplierResponseInput = {
  deliveryFee?: string | number;
  eta?: string;
  items: CreateSupplierResponseItem[];
  partsRequestId: string;
  subtotal: string | number;
  supplierId: string;
  tax: string | number;
  total: string | number;
};


export type PartsRequestFormProps = {
  jobCardId: string;
};
