import { steamGameFetch } from '@/common/filters/helpers/fetchApi';
import { DigiService } from '@/digi/digi.service';
import { ReviewsService } from '@/reviews/reviews.service';
import { Tag } from '@/tags/entities/tag.entity';
import { TagsService } from '@/tags/tags.service';
import { ISteamData, ISteamToGameEntity } from '@/types';
import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
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
    @Inject(ReviewsService)
    private reviewService: ReviewsService,
  ) {}

  async getSteamGame(steamId: number): Promise<ISteamToGameEntity> {
    let steamGame: ISteamData;
    steamGame = await steamGameFetch(steamId, 'ru');
    if (!steamGame || !steamGame.success) {
      steamGame = await steamGameFetch(steamId, 'en');
    }
    if (!steamGame || !steamGame.success) {
      throw new HttpException('Передан некорректный steamId', 400);
    }
    return {
      name: steamGame.data.name,
      logo: steamGame.data.header_image,
      screenshots: steamGame.data.screenshots
        .slice(0, 4) // Выбираем только первые четыре скриншота
        .map(
          (sreenShot: {
            id: number;
            path_thumbnail: string;
            path_full: string;
          }) => sreenShot.path_thumbnail,
        ),
      coming_soon: steamGame.data.release_date.coming_soon,
      release_date: steamGame.data.release_date.date,
      minimal_requirements: steamGame.data.pc_requirements.minimum,
      recomended_requirements: steamGame.data.pc_requirements.recommended,
      description: steamGame.data.about_the_game,
      tags: steamGame.data.categories.map((category) => category.description),
      steamPrice: !steamGame.data.release_date.coming_soon
        ? steamGame.data.price_overview.initial_formatted ||
          steamGame.data.price_overview.final_formatted
        : 'Предзаказ',
    };
  }

  async create(createGameDto: CreateGameDto) {
    const game = new Game();
    Object.assign(game, createGameDto);

    const steamGame = await this.getSteamGame(createGameDto.steamId);

    let foundOrCreatedTags = [];
    if (createGameDto.tags.length > 0) {
      foundOrCreatedTags = await Promise.all(
        createGameDto.tags.map(
          async (tag) => await this.tagsService.findOrCreateByName(tag),
        ),
      );
    }
    const steamTags = await Promise.all(
      steamGame.tags.map(
        async (tag) => await this.tagsService.findOrCreateByName({ name: tag }),
      ),
    );

    game.tags = [...foundOrCreatedTags, ...steamTags];

    const digiItem = await this.digiService.fetchDigisellerItem(
      createGameDto.digiId,
    );

    if (digiItem.retval == 2) {
      throw new HttpException('Передан некорректный digiId', 400);
    }
    game.price = digiItem.product.prices.initial.RUB;
    game.digiId = createGameDto.digiId;
    const { tags, ...formatedSteamGame } = steamGame;
    //подгружаем отзывы
    const reviews = await this.digiService.getReviews(createGameDto.digiId);
    const reviewPromises = reviews.map(async (item) => {
      try {
        await this.reviewService.create(item);
      } catch (error) {
        console.error(
          `Ошибка при обработке отзыва с id ${item.id}: ${error.message}`,
        );
      }
    });
    await Promise.all(reviewPromises);
    return await this.gameRepository.save({ ...game, ...formatedSteamGame });
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

  async updateGame(
    id: number,
    updateGameDto: UpdateGameDto,
    isAutomatic: boolean = false,
  ) {
    const game = await this.gameRepository.findOneOrFail({
      where: { digiId: id },
    });
    const steamGame = await this.getSteamGame(updateGameDto.steamId);

    let existingTags: Tag[] = [];

    if (!isAutomatic) {
      existingTags = await Promise.all(
        updateGameDto.tags?.map(
          async (tag) => await this.tagsService.findOneByName(tag),
        ),
      );
    } else {
      existingTags = game.tags
        ? await Promise.all(
            game.tags?.map(
              async (tag) => await this.tagsService.findOneByName(tag),
            ),
          )
        : [];
    }

    const steamTags = await Promise.all(
      steamGame.tags.map(
        async (tag) => await this.tagsService.findOrCreateByName({ name: tag }),
      ),
    );
    game.tags = [...existingTags, ...steamTags];

    const digiItem = await this.digiService.fetchDigisellerItem(
      updateGameDto.digiId,
    );

    if (digiItem.retval == 2) {
      throw new HttpException('Передан некорректный digiId', 400);
    }

    const { tags, ...formatedSteamGame } = steamGame;
    game.price = digiItem.product.prices.initial.RUB;
    game.digiId = updateGameDto.digiId;

    //подгружаем отзывы
    const reviews = await this.digiService.getReviews(updateGameDto.digiId);
    const reviewPromises = reviews.map(async (item) => {
      try {
        await this.reviewService.create(item);
      } catch (error) {
        console.error(
          `Ошибка при обработке отзыва с id ${item.id}: ${error.message}`,
        );
      }
    });
    await Promise.all(reviewPromises);
    return await this.gameRepository.save({ ...game, ...formatedSteamGame });
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

  @Cron('0 * * * *')
  async updateAllGames(): Promise<{ games: Game[]; errorUpdates: Game[] }> {
    const games = await this.getAllGames();
    const updatedGames: Game[] = [];
    const errorUpdates: Game[] = [];

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const game of games) {
      try {
        await this.updateGame(
          game.digiId,
          {
            steamId: game.steamId,
            tags: [],
            digiId: game.digiId,
          },
          true,
        );
        updatedGames.push(game);
      } catch (error) {
        errorUpdates.push(game);
      }
      await delay(50);
    }

    return { games: updatedGames, errorUpdates };
  }
}
