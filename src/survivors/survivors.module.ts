import { Module } from '@nestjs/common';
import { SurvivorsController } from './survivors.controller';
import { InMemorySurvivorsRepository } from './survivors.repository';
import { SurvivorsService } from './survivors.service';

@Module({
  controllers: [SurvivorsController],
  providers: [
    SurvivorsService,
    {
      provide: 'ISurvivorsRepository',
      useClass: InMemorySurvivorsRepository,
    },
  ],
})
export class SurvivorsModule {}
