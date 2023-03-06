import { Module } from '@nestjs/common';
import { SurvivorsModule } from './survivors/survivors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './databaseConfig';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    SurvivorsModule,
    TypeOrmModule.forRoot(databaseConfig),
    ItemsModule,
  ],
})
export class AppModule {}
