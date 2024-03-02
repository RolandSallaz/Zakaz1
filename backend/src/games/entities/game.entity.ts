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
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column({ default: 0 })
  discount: number;
  @Column()
  logo: string;
  @Column({ type: 'text', nullable: true }) // Используем тип 'text' для хранения JSON строки
  screenshots: string;
  @Column({ default: true })
  enabled: boolean;
  @OneToMany(() => Key, (key) => key.gameId) // Добавляем отношение "одна игра имеет много ключей"
  @JoinTable()
  keys: Key[]; // Массив ключей для данной игры

  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinTable()
  tags: Tag[];
}
