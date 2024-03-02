import { Injectable } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from './entities/key.entity';

@Injectable()
export class KeysService {
  constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
  ) {}
  async create(createKeyDto: CreateKeyDto): Promise<Key> {
    const newKey = this.keyRepository.create(createKeyDto);

    return await this.keyRepository.save(newKey);
  }
  async findByKey(key: string): Promise<Key> {
    return await this.keyRepository.findOne({ where: { key } });
  }
  findAll() {
    return `This action returns all keys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} key`;
  }

  async update(key: Key): Promise<Key> {
    return await this.keyRepository.save(key);
  }
  remove(id: number) {
    return `This action removes a #${id} key`;
  }
}
