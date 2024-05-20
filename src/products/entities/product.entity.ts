import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  img: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'int' })
  group: number;

  @Column({ type: 'int' })
  lines: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  price: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  stars: number;

  @Column({ default: true })
  new: boolean;

  @Column({ default: false })
  promotion: boolean;

  @Column({ type: 'varchar' })
  observation: string;

  @Column({ default: true })
  status: boolean;
}
