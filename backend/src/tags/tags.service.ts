import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { FindByNameTagDto } from './dto/findByName-tag.dto';
import { FindByNameOrCreateTagDto } from './dto/findByNameOrCreate-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsRepository.save(createTagDto);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async findOneByName({ name }: FindByNameTagDto): Promise<Tag> {
    return await this.tagsRepository.findOne({ where: { name } });
  }

  async findOrCreateByName(
    findByNameOrCreateTagDto: FindByNameOrCreateTagDto,
  ): Promise<Tag> {
    const tag = await this.findOneByName(findByNameOrCreateTagDto);
    if (tag) {
      return tag;
    } else {
      return await this.create(findByNameOrCreateTagDto);
    }
  }

  async update(id: string, { name }: UpdateTagDto): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({
      where: { id: Number(id) },
    });

    return await this.tagsRepository.save({ ...tag, name: name });
  }

  async remove(id: number): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({
      where: {
        id: Number(id),
      },
    });
    return await this.tagsRepository.remove(tag);
  }
}
