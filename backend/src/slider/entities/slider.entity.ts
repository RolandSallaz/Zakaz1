import { Game } from '@/games/entities/game.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Slider {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Game)
  @JoinColumn()
  game: Game;
}
