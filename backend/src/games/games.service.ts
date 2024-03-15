import { steamGameFetch } from '@/common/filters/helpers/fetchApi';
import { DigiService } from '@/digi/digi.service';
import { TagsService } from '@/tags/tags.service';
import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @Inject(TagsService)
    private tagsService: TagsService,
    @Inject(forwardRef(() => DigiService))
    private digiService: DigiService,
  ) {}

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
    if (!steamGame || !steamGame.success) {
      steamGame = await steamGameFetch(createGameDto.steamId, 'en');
    }
    if (!steamGame || !steamGame.success) {
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
    game.steamPrice =
      steamGame.data.price_overview.initial_formatted ||
      steamGame.data.price_overview.final_formatted;
    const digiItem = await this.digiService.fetchDigisellerItem(
      createGameDto.digiId,
    );

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
    const game = await this.gameRepository.findOne({
      where: { digiId: id },
      relations: ['tags'],
    });
    if (!game) {
      throw new NotFoundException('Игра не найдена');
    }
    return game;
  }

  async deleteGame(digiId: number): Promise<{ message: string }> {
    const game = await this.getGame(digiId);
    if (!game) {
      throw new NotFoundException('Игра не найдена');
    }

    await this.gameRepository.remove(game);
    return { message: 'Игра удалена' };
  }

  async getLastBuyedGames(productIds: number[]): Promise<Game[]> {
    return await this.gameRepository
      .createQueryBuilder('game')
      .where('game.digiId IN (:...productIds)', { productIds })
      .take(10)
      .getMany();
  }

  async updateGame(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.gameRepository.findOneOrFail({
      where: { digiId: id },
    });

    game.tags = await Promise.all(
      updateGameDto.tags.map(
        async (tag) => await this.tagsService.findOneByName(tag),
      ),
    );

    let steamGame;
    steamGame = await steamGameFetch(updateGameDto.steamId, 'ru');
    if (steamGame.success == false) {
      steamGame = await steamGameFetch(updateGameDto.steamId, 'en');
    }
    console.log(steamGame);
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
    game.steamPrice =
      steamGame.data.price_overview.initial_formatted ||
      steamGame.data.price_overview.final_formatted;
    const digiItem = await this.digiService.fetchDigisellerItem(
      updateGameDto.digiId,
    );

    if (digiItem.retval == 2) {
      throw new HttpException('Передан некорректный digiId', 400);
    }
    game.price = digiItem.product.prices.initial.RUB;
    game.description = digiItem.product.info;
    game.screenshots = screenshots;
    game.digiId = updateGameDto.digiId;
    return await this.gameRepository.save(game);
  }

  async loadGamesFromDigi(): Promise<Game[]> {
    const regex = /https?:\/\/store\.steampowered\.com\/app\/\d+/;
    const data = await this.digiService.loadUnloadedGames();
    if (data.retval != 0) {
      throw new HttpException('Ошибка получения игр с digiseller', 500);
    }
    const filteredData = data.product.filter((item) =>
      item.info.includes('https://store.steampowered'),
    );

    const games = await this.getAllGames();

    const gamesToAdd: { id: number; info: string }[] = filteredData.filter(
      (newGame) =>
        !games.some((existingGame) =>
          Boolean(
            existingGame.digiId === newGame.id ||
              existingGame.steamId ===
                Number(
                  newGame.info
                    .match(regex)[0]
                    .replace('https://store.steampowered.com/app/', ''),
                ),
          ),
        ),
    );
    const addedGamesPromises: Promise<Game>[] = gamesToAdd.map(async (item) => {
      return this.create({
        digiId: item.id,
        steamId: Number(
          item.info
            .match(regex)[0]
            .replace('https://store.steampowered.com/app/', ''),
        ),
        tags: [],
      });
    });

    return await Promise.all(addedGamesPromises);
  }
}
