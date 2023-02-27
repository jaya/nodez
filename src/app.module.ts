import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurvivorsModule } from './survivors/survivors.module';

@Module({
  imports: [SurvivorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
