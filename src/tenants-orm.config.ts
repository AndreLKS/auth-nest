import * as ormconfig from './orm.config';

import { join } from 'path';

module.exports = {
  ...ormconfig,
  entities: [join(__dirname, './tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/tenanted/*{.ts,.js}')],
  schema: 'clock',
  cli:{
    migrationsDir: './src/migrations/tenanted'
  }
};
