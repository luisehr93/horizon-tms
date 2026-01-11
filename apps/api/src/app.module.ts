import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [DashboardModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
