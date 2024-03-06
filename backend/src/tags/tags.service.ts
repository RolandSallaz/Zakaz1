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

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
