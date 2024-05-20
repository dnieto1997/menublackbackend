import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  celular: string;

  @Column()
  direccion: string;

  @Column()
  barrio: string;

  @Column()
  medioDePago: string;

  @Column({ nullable: true, type: 'text' })
  observaciones: string;

  @Column({ default: true })
  status: boolean;
}
