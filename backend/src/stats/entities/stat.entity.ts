import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  digiId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  action: string;
}
