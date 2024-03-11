import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from '@/keys/entities/key.entity';
import { KeysService } from '@/keys/keys.service';
import { TagsService } from '@/tags/tags.service';
import { FindByIdGameDto } from './dto/findById-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {
  fetchDigisellerItem,
  steamGameFetch,
} from '@/common/filters/helpers/fetchApi';

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
          async (tag) => await this.tagsService.findOneByName(tag),
        ),
      );

      // Привязываем найденные или созданные теги к игре
      game.tags = foundOrCreatedTags;
    }
    let steamGame;
    steamGame = await steamGameFetch(createGameDto.steamId, 'ru');
    if (steamGame.success == false) {
      steamGame = await steamGameFetch(createGameDto.steamId, 'en');
    }
    if (steamGame.success == false) {
      throw new HttpException('Передан некорректный steamId', 400);
    }
    game.name = steamGame.data.name;
    game.logo = steamGame.data.header_image;
    const screenshots = steamGame.data.screenshots
      .slice(0, 4) // Выбираем только первые четыре скриншота
      .map(
        (sreenShot: {
          id: number;
          path_thumbnail: string;
          path_full: string;
        }) => sreenShot.path_thumbnail,
      );
    game.steamPrice = steamGame.data.price_overview.final_formatted;
    const digiItem = await fetchDigisellerItem(createGameDto.digiId);

    if (digiItem.retval == 2) {
      throw new HttpException('Передан некорректный digiId', 400);
    }
    game.price = digiItem.product.prices.initial.RUB;
    game.description = digiItem.product.info;
    game.screenshots = screenshots;
    game.digiId = createGameDto.digiId;
    await this.gameRepository.save(game);
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

    const newGame = await this.gameRepository.save({
      ...game,
      ...updateGameDto,
      tags: await Promise.all(
        updateGameDto.tags.map(
          async (tag) => await this.tagsService.findOneByName(tag),
        ),
      ),
    });

    // //сохраним новые ключи
    // if (updateGameDto.newKeys.length) {
    //   const createdKeys = await Promise.all(
    //     await updateGameDto.newKeys.map(async (key) => {
    //       this.keysService.createOrUpdateSteamId({
    //         key,
    //         steamId: game.steamId,
    //       });
    //     }),
    //   );
    // }

    // //удалим удаленные и старые ключи
    // if (updateGameDto.keysToRemove.length) {
    //   const deleteKeys = await Promise.all(
    //     updateGameDto.keysToRemove.map(async (key) => {
    //       await this.keysService.deleteKey({
    //         key,
    //       });
    //     }),
    //   );
    // }

    return newGame;
  }
}
