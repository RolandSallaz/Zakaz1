import { Game } from '@/games/entities/game.entity';
import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Gameselection {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @ManyToMany(() => Game)
  @JoinTable()
  games: Game[];
}
