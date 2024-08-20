import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'app_keys'})
export class AppKey {
  @PrimaryColumn()
  product_id: number;

  @PrimaryColumn()
  key: string;

  @Column()
  client_name: number;

}
