import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('products_variants')
export class ProductosVariante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  product_variante: number;

  @Column({ default: true })
  status: boolean;
}
