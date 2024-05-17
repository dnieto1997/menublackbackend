import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('banner')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  img: string;

  @Column({ type: 'int' })
  lines: number;

  @Column({ default: true })
  status: boolean;
}
