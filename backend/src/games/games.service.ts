import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from '@/keys/entities/key.entity';
import { KeysService } from '@/keys/keys.service';
import { TagsService } from '@/tags/tags.service';
import { FindByIdGameDto } from './dto/findById-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @Inject(TagsService)
    private tagsService: TagsService,
    @Inject(KeysService)
    private keysService: KeysService,
  ) {}
  async addTagToGame() {}

  async create(createGameDto: CreateGameDto) {
    const game = new Game();
    Object.assign(game, createGameDto);
    // Проверяем, есть ли теги в запросе
    // Проверяем, есть ли имена тегов в запросе
    if (createGameDto.tags && createGameDto.tags.length > 0) {
      // Находим или создаем теги по их именам
      const foundOrCreatedTags = await Promise.all(
        createGameDto.tags.map(
          async (tagName) => await this.tagsService.findOneByName(tagName.name),
        ),
      );

      // Привязываем найденные или созданные теги к игре
      game.tags = foundOrCreatedTags;
    }
    await this.gameRepository.save(game);
    if (createGameDto.newKeys.length) {
      const createdKeys = await Promise.all(
        createGameDto.newKeys.map(async (key) => {
          this.keysService.createOrUpdateSteamId({
            key,
            steamId: game.steamId,
          });
        }),
      );
    }
    return game;
  }

  async getAllGames(): Promise<Game[]> {
    return await this.gameRepository.find({ relations: ['tags'] });
  }

  async getGame(id: number): Promise<Game> {
    return await this.gameRepository.findOneOrFail({
      where: { id: id },
      relations: ['tags'],
    });
  }

  async updateGame(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.gameRepository.findOneOrFail({ where: { id: id } });

    const foundOrCreatedTags = await Promise.all(
      updateGameDto.tags.map(
        async (tagName) => await this.tagsService.findOneByName(tagName.name),
      ),
    );

    game.tags = foundOrCreatedTags;

    const { newKeys, keysToRemove, ...dataToUpdate } = updateGameDto;
    const newGame = await this.gameRepository.save({
      ...game,
      ...dataToUpdate,
    });

    //сохраним новые ключи
    if (updateGameDto.newKeys.length) {
      const createdKeys = await Promise.all(
        updateGameDto.newKeys.map(async (key) => {
          this.keysService.createOrUpdateSteamId({
            key,
            steamId: game.steamId,
          });
        }),
      );
    }

    //удалим удаленные и старые ключи
    if (updateGameDto.keysToRemove.length) {
      const deleteKeys = await Promise.all(
        updateGameDto.keysToRemove.map(async (key) => {
          this.keysService.deleteKey({
            key,
          });
        }),
      );
    }

    return newGame;
  }
}
