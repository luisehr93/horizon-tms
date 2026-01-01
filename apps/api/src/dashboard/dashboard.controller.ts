import { Controller, Get } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  @Get()
  getDashboard() {
    return {
      activeLoads: 12,
      availableDrivers: 7,
      revenueThisMonth: 58400,
      tripsInProgress: 5,
    };
  }
}
