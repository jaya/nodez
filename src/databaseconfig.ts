import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const database_config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: true, // Should not be used on prod environment, use migrations instead
};

export default database_config;
