export type Client = {
  id: string;
  name: string;
  mcNumber?: string;
  dotNumber?: string;
  phone?: string;
  email?: string;
  billingEmail?: string;
  address?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type ClientListResponse = {
  data: Client[];
  page: number;
  pageSize: number;
  total: number;
};
