import { Module } from '@nestjs/common';
import { SurvivorsController } from './survivors.controller';
import { SurvivorsService } from './survivors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survivor } from './entities/survivor.entity';
import { InventoryItem } from './entities/inventory-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survivor, InventoryItem])],
  controllers: [SurvivorsController],
  providers: [SurvivorsService],
})
export class SurvivorsModule {}
