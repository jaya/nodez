import { Module } from '@nestjs/common';
import { SurvivorsController } from './survivors.controller';
import { SurvivorsService } from './survivors.service';

@Module({
  controllers: [SurvivorsController],
  providers: [SurvivorsService],
})
export class SurvivorsModule {}
