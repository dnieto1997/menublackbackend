import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  img: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  days: string;

  @Column({ type: 'varchar' })
  hours: string;

  @Column({ type: 'varchar', nullable: true })
  observations: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
