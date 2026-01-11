import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly service: DriversService) {}

  @Get()
  list(
    @Query('search') search = '',
    @Query('isActive') isActive?: string,
    @Query('isAvailable') isAvailable?: string,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
  ) {
    return this.service.list({
      search,
      isActive,
      isAvailable,
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
    });
  }

  @Post()
  create(@Body() dto: CreateDriverDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDriverDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
