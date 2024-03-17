import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InfoChapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  heading: string;

  @Column({ default: '' })
  text: string;

  @Column({ default: '' })
  link: string;
}
