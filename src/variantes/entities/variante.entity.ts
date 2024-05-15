import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('variants')
export class Variante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cost: string;

  @Column({ default: true })
  status: boolean;
}
