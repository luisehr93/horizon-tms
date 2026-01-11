import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

type Driver = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  licenseNumber?: string;
  state?: string;
  notes?: string;
  isAvailable: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class DriversService {
  private drivers: Driver[] = [];

  list(params: { search: string; isActive?: string; isAvailable?: string; page: number; pageSize: number }) {
    const { search, isActive, isAvailable, page, pageSize } = params;

    const q = (search || '').toLowerCase().trim();
    let filtered = this.drivers;

    if (q) {
      filtered = filtered.filter((d) => {
        const hay = [d.name, d.phone, d.email, d.licenseNumber, d.state]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      });
    }

    if (isActive === 'true') filtered = filtered.filter((d) => d.isActive);
    if (isActive === 'false') filtered = filtered.filter((d) => !d.isActive);

    if (isAvailable === 'true') filtered = filtered.filter((d) => d.isAvailable);
    if (isAvailable === 'false') filtered = filtered.filter((d) => !d.isAvailable);

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return { data, total, page, pageSize };
  }

  create(dto: CreateDriverDto) {
    const now = new Date().toISOString();
    const driver: Driver = {
      id: rid(),
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
      licenseNumber: dto.licenseNumber,
      state: dto.state,
      notes: dto.notes,
      isAvailable: dto.isAvailable ?? true,
      isActive: dto.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };

    this.drivers.unshift(driver);
    return driver;
  }

  update(id: string, dto: UpdateDriverDto) {
    const idx = this.drivers.findIndex((d) => d.id === id);
    if (idx === -1) return { message: 'Not found' };

    const now = new Date().toISOString();
    this.drivers[idx] = { ...this.drivers[idx], ...dto, updatedAt: now };
    return this.drivers[idx];
  }

  remove(id: string) {
    const before = this.drivers.length;
    this.drivers = this.drivers.filter((d) => d.id !== id);
    return { deleted: before - this.drivers.length };
  }
}

function rid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}
