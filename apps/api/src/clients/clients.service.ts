import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

type Client = {
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
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class ClientsService {
  private clients: Client[] = [];

  list({ search, isActive, page, pageSize }: { search: string; isActive?: string; page: number; pageSize: number }) {
    const q = (search || '').toLowerCase().trim();

    let filtered = this.clients;

    if (q) {
      filtered = filtered.filter((c) => {
        const hay = [
          c.name,
          c.mcNumber,
          c.dotNumber,
          c.email,
          c.billingEmail,
          c.phone,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      });
    }

    if (isActive === 'true') filtered = filtered.filter((c) => c.isActive);
    if (isActive === 'false') filtered = filtered.filter((c) => !c.isActive);

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return { data, total, page, pageSize };
  }

  create(dto: CreateClientDto) {
    const now = new Date().toISOString();
    const client: Client = {
      id: cryptoRandomId(),
      name: dto.name,
      mcNumber: dto.mcNumber,
      dotNumber: dto.dotNumber,
      phone: dto.phone,
      email: dto.email,
      billingEmail: dto.billingEmail,
      address: dto.address,
      notes: dto.notes,
      isActive: dto.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    this.clients.unshift(client);
    return client;
  }

  update(id: string, dto: UpdateClientDto) {
    const idx = this.clients.findIndex((c) => c.id === id);
    if (idx === -1) return { message: 'Not found' };

    const now = new Date().toISOString();
    this.clients[idx] = { ...this.clients[idx], ...dto, updatedAt: now };
    return this.clients[idx];
  }

  remove(id: string) {
    const before = this.clients.length;
    this.clients = this.clients.filter((c) => c.id !== id);
    return { deleted: before - this.clients.length };
  }
}

function cryptoRandomId() {
  // Node 18+ compatible, sin dependencias
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}
