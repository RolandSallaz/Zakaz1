import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKeyDto } from './dto/create-key.dto';
import { DeleteKeyDto } from './dto/delete-key.dto';
import { Key } from './entities/key.entity';
import { createOrUpdateKeyDto } from './dto/createOrUpdate-key.dto';

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

  async deleteKey(deleteKeyDto: DeleteKeyDto): Promise<{ message: string }> {
    const key = await this.findByKey(deleteKeyDto.key);
    if (!key) {
      throw new NotFoundException('Ключ не найден');
    }

    await this.keyRepository.remove(key);
    return { message: 'Ключ удален' };
  }

  async findBySteamId(steamId: number): Promise<Key[]> {
    return await this.keyRepository.find({ where: { steamId: steamId } });
  }

  async update(key: Key): Promise<Key> {
    return await this.keyRepository.save(key);
  }

  async createOrUpdateSteamId({ key, steamId }: createOrUpdateKeyDto) {
    let existingKey = await this.findByKey(key);

    // Если ключ уже существует, обновляем gameId и gameName
    if (existingKey) {
      existingKey.steamId = steamId;
      await this.update(existingKey);
      return existingKey;
    } else {
      // Если ключ не существует, создаем новый
      return await this.create({
        key,
        steamId: steamId,
      });
    }
  }
}
