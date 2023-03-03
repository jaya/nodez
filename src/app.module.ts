import { Module } from '@nestjs/common';
import { SurvivorsModule } from './survivors/survivors.module';

@Module({
  imports: [SurvivorsModule],
})
export class AppModule {}
