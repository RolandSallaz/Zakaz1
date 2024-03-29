import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column()
  digiId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  info: string;
}
