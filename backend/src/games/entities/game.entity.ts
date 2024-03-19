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

  @Column({ unique: true })
  steamId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: '' })
  steamPrice: string;

  @Column({ unique: true })
  digiId: number;

  @Column()
  logo: string;

  @Column('simple-array', { nullable: true }) // Используем тип 'simple-array' для хранения массива строк
  screenshots: string[];

  @Column({ default: true })
  enabled: boolean;

  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinTable()
  tags: Tag[];

  @Column({ default: false })
  coming_soon: boolean;

  @Column({ default: '' })
  release_date: string;

  @Column({ default: '' })
  minimal_requirements: string;

  @Column({ default: '' })
  recomended_requirements: string;
}
