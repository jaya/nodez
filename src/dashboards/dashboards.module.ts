import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survivor } from '@/survivors/entities/survivor.entity';
import { InventoryItem } from '@/survivors/entities/inventory-item.entity';
import { Item } from '@/items/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survivor, InventoryItem, Item])],
  controllers: [DashboardsController],
  providers: [DashboardsService],
})
export class DashboardsModule {}
