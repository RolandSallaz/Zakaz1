import { Inject, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from '@/keys/entities/key.entity';
import { KeysService } from '@/keys/keys.service';
import { TagsService } from '@/tags/tags.service';

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
    game.name = createGameDto.name;
    game.description = createGameDto.description;
    game.price = createGameDto.price;
    game.logo = createGameDto.logo;
    game.screenshots = JSON.stringify(createGameDto.screenshots);
    game.discount = createGameDto.discount;
    game.enabled = createGameDto.enabled;

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

    if (createGameDto.keys && createGameDto.keys.length > 0) {
      const createdKeys = await Promise.all(
        createGameDto.keys.map(async (key) => {
          let existingKey = await this.keysService.findByKey(key);

          // Если ключ уже существует, обновляем gameId и gameName
          if (existingKey) {
            existingKey.gameId = game.id;
            existingKey.gameName = game.name;
            await this.keysService.update(existingKey);
            return existingKey;
          } else {
            // Если ключ не существует, создаем новый
            return await this.keysService.create({
              key,
              gameId: game.id,
              gameName: game.name,
            });
          }
        }),
      );

      return await this.gameRepository.save(game);
    }
  }

  async getAllGames(): Promise<Game[]> {
    return await this.gameRepository.find({ relations: ['tags'] });
  }
}
