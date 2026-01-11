export class CreateDriverDto {
  name: string;
  phone?: string;
  email?: string;
  licenseNumber?: string;
  state?: string;
  notes?: string;

  // Flags para operación
  isAvailable?: boolean; // KPI Available Drivers
  isActive?: boolean;
}
