import { Game } from '@/games/entities/game.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @ManyToOne(() => Game, (game) => game.id)
  @Column({ type: 'integer' })
  gameId: number;
  @Column()
  gameName: string;
}
