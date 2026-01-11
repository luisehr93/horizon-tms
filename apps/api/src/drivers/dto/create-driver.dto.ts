export class CreateDriverDto {
  name: string;
  phone?: string;
  email?: string;
  licenseNumber?: string;
  state?: string;
  notes?: string;
  isAvailable?: boolean; // para KPI
  isActive?: boolean;
}
