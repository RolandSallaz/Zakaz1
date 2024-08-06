import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInfoChapterDto } from './dto/create-info-chapter.dto';
import { UpdateInfoChapterDto } from './dto/update-info-chapter.dto';
import { InfoChapter } from './entities/info-chapter.entity';

@Injectable()
export class InfoChaptersService {
  constructor(
    @InjectRepository(InfoChapter)
    private infoChapterRepository: Repository<InfoChapter>,
  ) {}

  async create(
    createInfoChapterDto: CreateInfoChapterDto,
  ): Promise<InfoChapter> {
    return this.infoChapterRepository.save({ ...createInfoChapterDto });
  }

  async findOne(link: string): Promise<InfoChapter> {
    const chapter = await this.infoChapterRepository.findOne({
      where: { link: link },
    });
    if (chapter) {
      return chapter;
    } else {
      const newChapter = new InfoChapter();
      newChapter.text = 'Повторите позже';
      newChapter.heading = 'Ошибка загрузки';
      return newChapter;
    }
  }

  async update(
    link: string,
    { text, heading }: UpdateInfoChapterDto,
  ): Promise<{ message: string }> {
    let infoChapter = await this.findOne(link);
    if (!infoChapter) {
      infoChapter = await this.create({ link, text, heading });
    }

    await this.infoChapterRepository.save({
      ...infoChapter,
      link,
      heading,
      text,
    });
    return { message: 'Секция успешно обновлена' };
  }
}
