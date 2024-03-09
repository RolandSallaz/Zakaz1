import { Game } from '@/games/entities/game.entity';
import {
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Slider {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Game, (game) => game.id)
  @JoinTable()
  game: Game;
}
