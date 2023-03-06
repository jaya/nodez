import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const buildDatabaseConfig = (
  configService = new ConfigService(),
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [`dist/**/*.entity{.ts,.js}`],
  migrations: [`dist/infrastructure/database/migrations/*{.js,.ts}`],
});

export default new DataSource(buildDatabaseConfig());
