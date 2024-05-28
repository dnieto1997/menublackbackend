import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('products_groups')
export class ProductosVariante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  product_variante: string;

  @Column()
  tipo: string;

  @Column({ default: true })
  status: boolean;
}
