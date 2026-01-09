import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Client, ClientListResponse } from './types';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  // In-memory store (MVP). Luego lo cambiamos por DB sin romper el contrato.
  private clients: Client[] = [
    {
      id: randomUUID(),
      name: 'Acme Logistics',
      mcNumber: 'MC123456',
      dotNumber: 'DOT987654',
      phone: '+1 (555) 111-2222',
      email: 'dispatch@acme.com',
      billingEmail: 'billing@acme.com',
      address: 'Dallas, TX',
      notes: 'Preferred lanes: TX-CA',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  list(params: { search?: string; isActive?: string; page?: string; pageSize?: string }): ClientListResponse {
    const page = Math.max(parseInt(params.page ?? '1', 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(params.pageSize ?? '10', 10) || 10, 1), 100);

    let data = [...this.clients];

    const search = (params.search ?? '').trim().toLowerCase();
    if (search) {
      data = data.filter((c) => {
        const hay = [
          c.name,
          c.mcNumber ?? '',
          c.dotNumber ?? '',
          c.email ?? '',
          c.billingEmail ?? '',
          c.phone ?? '',
        ].join(' ').toLowerCase();
        return hay.includes(search);
      });
    }

    if (params.isActive === 'true') data = data.filter((c) => c.isActive);
    if (params.isActive === 'false') data = data.filter((c) => !c.isActive);

    // Orden: más recientes primero
    data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const total = data.length;
    const start = (page - 1) * pageSize;
    const paged = data.slice(start, start + pageSize);

    return { data: paged, page, pageSize, total };
  }

  get(id: string): Client {
    const found = this.clients.find((c) => c.id === id);
    if (!found) throw new NotFoundException('Client not found');
    return found;
  }

  create(dto: CreateClientDto): Client {
    const name = (dto.name ?? '').trim();
    if (!name) throw new BadRequestException('name is required');

    const now = new Date().toISOString();
    const created: Client = {
      id: randomUUID(),
      name,
      mcNumber: dto.mcNumber?.trim() || undefined,
      dotNumber: dto.dotNumber?.trim() || undefined,
      phone: dto.phone?.trim() || undefined,
      email: dto.email?.trim() || undefined,
      billingEmail: dto.billingEmail?.trim() || undefined,
      address: dto.address?.trim() || undefined,
      notes: dto.notes?.trim() || undefined,
      isActive: dto.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    this.clients.push(created);
    return created;
  }

  update(id: string, dto: UpdateClientDto): Client {
    const idx = this.clients.findIndex((c) => c.id === id);
    if (idx === -1) throw new NotFoundException('Client not found');

    const current = this.clients[idx];
    const updated: Client = {
      ...current,
      name: dto.name !== undefined ? dto.name.trim() : current.name,
      mcNumber: dto.mcNumber !== undefined ? (dto.mcNumber.trim() || undefined) : current.mcNumber,
      dotNumber: dto.dotNumber !== undefined ? (dto.dotNumber.trim() || undefined) : current.dotNumber,
      phone: dto.phone !== undefined ? (dto.phone.trim() || undefined) : current.phone,
      email: dto.email !== undefined ? (dto.email.trim() || undefined) : current.email,
      billingEmail: dto.billingEmail !== undefined ? (dto.billingEmail.trim() || undefined) : current.billingEmail,
      address: dto.address !== undefined ? (dto.address.trim() || undefined) : current.address,
      notes: dto.notes !== undefined ? (dto.notes.trim() || undefined) : current.notes,
      isActive: dto.isActive !== undefined ? dto.isActive : current.isActive,
      updatedAt: new Date().toISOString(),
    };

    if (!updated.name) throw new BadRequestException('name cannot be empty');

    this.clients[idx] = updated;
    return updated;
  }

  remove(id: string): void {
    const idx = this.clients.findIndex((c) => c.id === id);
    if (idx === -1) throw new NotFoundException('Client not found');
    this.clients.splice(idx, 1);
  }
}
