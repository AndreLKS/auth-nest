import { join } from 'path';


module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  logging: true,
  ssl: false,
  autoLoadEntities: true,
  migrationsRun: true,
  entities: [join(__dirname, './tenants/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
  synchronize: true,
};