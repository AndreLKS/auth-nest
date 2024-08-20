import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tenants'})
export class Tenant {
  @PrimaryColumn()
  tenant_name: string;

  @Column()
  client_id: string;
}
