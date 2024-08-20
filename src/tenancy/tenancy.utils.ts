import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as CryptoJS from 'crypto-js'

import * as tenantsOrmconfig from '../tenants-orm.config';


export function getTenantConnection(tenantName: string, schema: string): Promise<Connection> {
  const connectionName = tenantName;
  const connectionManager = getConnectionManager();
  const applicationSchema = schema;

  if (connectionManager.has(connectionName)) {
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(connection.isConnected ? connection : connection.connect());
  }


  
  return createConnection({
    ...(tenantsOrmconfig as PostgresConnectionOptions),
    name: connectionName,
    database: connectionName,
    username: connectionName,
    password: CryptoJS.HmacSHA256(connectionName, 'wearetechnomakers').toString(),
    schema: applicationSchema,
  });
}
