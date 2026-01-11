import { Injectable } from '@nestjs/common';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class DashboardService {
  constructor(private readonly driversService: DriversService) {}

  getDashboard() {
    const { availableDrivers } = this.driversService.getStats();

    // Por ahora los demás siguen mock (hasta que hagamos Loads/Trips)
    return {
      activeLoads: 12,
      availableDrivers,
      revenueThisMonth: 58400,
      tripsInProgress: 5,
    };
  }
}
