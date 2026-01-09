export class CreateClientDto {
  name!: string;
  mcNumber?: string;
  dotNumber?: string;
  phone?: string;
  email?: string;
  billingEmail?: string;
  address?: string;
  notes?: string;
  isActive?: boolean;
}
