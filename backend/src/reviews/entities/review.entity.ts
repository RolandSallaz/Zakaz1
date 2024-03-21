import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryColumn()
  id: number;

  @Column()
  digiId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  info: string;
}
