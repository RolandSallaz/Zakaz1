import { Inject, Injectable } from '@nestjs/common';
import { CreateGameselectionDto } from './dto/create-gameselection.dto';
import { UpdateGameselectionDto } from './dto/update-gameselection.dto';
import { Gameselection } from './entities/gameselection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamesService } from '@/games/games.service';

@Injectable()
export class GameselectionService {
  constructor(
    @InjectRepository(Gameselection)
    private gameselectionRepository: Repository<Gameselection>,
    @Inject(GamesService)
    private gameService: GamesService,
  ) {}
  async create(
    createGameselectionDto: CreateGameselectionDto,
  ): Promise<Gameselection> {
    const games = await Promise.all(
      createGameselectionDto.games.map(async (gameId) => {
        return await this.gameService.getGame(gameId);
      }),
    );

    const gameSelection = await this.gameselectionRepository.create({
      name: createGameselectionDto.name,
      games,
    });

    await this.gameselectionRepository.save(gameSelection);

    return gameSelection;
  }

  async findAll(): Promise<Gameselection[]> {
    return this.gameselectionRepository.find({
      relations: ['games', 'games.tags'],
    });
  }

  async update(
    id: number,
    { name, games }: UpdateGameselectionDto,
  ): Promise<Gameselection> {
    const gameSelection = await this.gameselectionRepository.findOneOrFail({
      where: { id },
    });

    const newGames = await Promise.all(
      games.map(async (gameId) => {
        return await this.gameService.getGame(gameId);
      }),
    );

    gameSelection.name = name;
    gameSelection.games = newGames;

    return await this.gameselectionRepository.save(gameSelection);
  }

  async remove(id: number) {
    const gameSelection = await this.gameselectionRepository.findOneOrFail({
      where: { id },
    });

    const removedGameSelection = { ...gameSelection };

    await this.gameselectionRepository.remove(gameSelection);

    return removedGameSelection;
  }
}
