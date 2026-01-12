import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  exports: [DriversService], // 👈 clave para que otros módulos lo usen
})
export class DriversModule {}
