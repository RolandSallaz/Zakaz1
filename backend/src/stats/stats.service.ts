import { Injectable } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stat } from './entities/stat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stat)
    private statRepository: Repository<Stat>,
  ) {}

  async create(createStatDto: CreateStatDto): Promise<Stat> {
    const stat = this.statRepository.create({
      ...createStatDto,
      date: new Date(),
    });
    return await this.statRepository.save(stat);
  }

  async findAll(): Promise<Stat[]> {
    return await this.statRepository.find();
  }

  async findByAction(action: string): Promise<Stat[]> {
    return await this.statRepository.find({
      where: {
        action,
      },
    });
  }

  async findByGame(digiId: number): Promise<Stat[]> {
    return await this.statRepository.find({
      where: {
        digiId,
      },
    });
  }
}
