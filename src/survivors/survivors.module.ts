import { Module } from '@nestjs/common';
import { SurvivorsController } from './Survivors.controller';
import { SurvivorsService } from './services/survivors.service';

@Module({
  controllers: [SurvivorsController],
  providers: [SurvivorsService],
})
export class SurvivorsModule {}
