import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  icon: string;

  @Column({ type: 'boolean', default: false })
  isSubmenu: boolean;

  @Column({ type: 'varchar', length: 255 })
  url: string;
}
