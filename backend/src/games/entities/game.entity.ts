import { Key } from '@/keys/entities/key.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  steamId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  discount: number;

  @Column()
  logo: string;

  @Column('simple-array', { nullable: true }) // Используем тип 'simple-array' для хранения массива строк
  screenshots: string[];

  @Column({ default: true })
  enabled: boolean;

  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinTable()
  tags: Tag[];
}
