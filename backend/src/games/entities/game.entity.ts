import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  discount: number;
  @Column()
  visits: number;
  @Column()
  logo: string;
  @Column({ type: 'jsonb', array: true, default: [] })
  screenshots: string[];
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
