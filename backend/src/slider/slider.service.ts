import { Inject, Injectable } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Slider } from './entities/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamesService } from '@/games/games.service';

@Injectable()
export class SliderService {
  constructor(
    @InjectRepository(Slider)
    private slidersRepository: Repository<Slider>,
    @Inject(GamesService)
    private gamesService: GamesService,
  ) {}

  async create({ gameId }: CreateSliderDto): Promise<Slider> {
    const game = await this.gamesService.getGame(gameId);

    const slider = new Slider();
    slider.game = game;

    const savedSlider = await this.slidersRepository.save(slider);

    // Загружаем сохраненный слайдер с игрой и тегами
    const sliderWithGameAndTags = await this.slidersRepository.findOne({
      where: { id: savedSlider.id },
      relations: ['game', 'game.tags'],
    });

    return sliderWithGameAndTags;
  }

  async findAll(): Promise<Slider[]> {
    return this.slidersRepository.find({ relations: ['game', 'game.tags'] });
  }

  async update(id: number, updateSliderDto: UpdateSliderDto): Promise<Slider> {
    const slider = await this.slidersRepository.findOneOrFail({
      where: { id },
      relations: ['game', 'game.tags'],
    });

    slider.game = await this.gamesService.getGame(updateSliderDto.gameId);

    const updatedSlider = await this.slidersRepository.save(slider);

    return updatedSlider;
  }

  async remove(id: number): Promise<Slider> {
    const slider = await this.slidersRepository.findOneOrFail({
      where: { id },
    });

    const removedSlider = { ...slider };

    await this.slidersRepository.remove(slider);

    return removedSlider;
  }
}
