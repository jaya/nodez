import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SurvivorsModule } from './survivors/survivors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { buildDatabaseConfig } from './infrastructure/database/database.config';
import { DashboardsModule } from './dashboards/dashboards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        buildDatabaseConfig(configService),
    }),
    SurvivorsModule,
    ItemsModule,
    DashboardsModule,
  ],
})
export class AppModule {}
