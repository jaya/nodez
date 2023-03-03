import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurvivorsModule } from './survivors/survivors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './databaseConfig';
import { ItemsModule } from './items/items.module';

@Module({
  controllers: [AppController],
  imports: [
    SurvivorsModule,
    TypeOrmModule.forRoot(databaseConfig),
    ItemsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
