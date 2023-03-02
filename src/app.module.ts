import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurvivorsModule } from './survivors/survivors.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [SurvivorsModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
