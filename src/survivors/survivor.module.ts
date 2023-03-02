import { Module } from '@nestjs/common';
import { SurvivorsController } from './Survivors.controller';
import { SurvivorsService } from './Survivors.service';

@Module({
  controllers: [SurvivorsController],
  providers: [SurvivorsService],
})
export class SurvivorModule {}
