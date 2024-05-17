import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sliders')
export class Slider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'bigint' })
  lastModified: number;

  @Column({ type: 'timestamp' })
  lastModifiedDate: Date;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  webkitRelativePath?: string;
}
