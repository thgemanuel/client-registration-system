import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

const options: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.join(__dirname, '/schemas/**/*{.ts,.js}')],
  migrations: [path.join(__dirname, '/migrations/**/*{.ts,.js}')],
};

export default new DataSource(options);
