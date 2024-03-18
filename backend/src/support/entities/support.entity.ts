import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Support {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortDescription: string;

  @Column()
  email: string;

  @Column({ default: '' })
  imageLink: string;

  @Column()
  trouble: string;
}
