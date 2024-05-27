import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lines')
export class Line {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  position: number;

  @Column({ type: 'varchar' })
  img: string;

  @Column({ type: 'int' })
  code: number;

  @Column({ type: 'int' })
  group: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: '' })
  observation: string;

  @Column({ default: true })
  status: boolean;
}
