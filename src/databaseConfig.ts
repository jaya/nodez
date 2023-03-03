import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const databaseConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: true, // Should not be used on prod environment, use migrations instead
};

export default databaseConfig;
