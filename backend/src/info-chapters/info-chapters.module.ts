import { Module } from '@nestjs/common';
import { InfoChaptersService } from './info-chapters.service';
import { InfoChaptersController } from './info-chapters.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoChapter } from './entities/info-chapter.entity';

@Module({
  imports: [JwtModule, UsersModule, TypeOrmModule.forFeature([InfoChapter])],
  controllers: [InfoChaptersController],
  providers: [InfoChaptersService],
})
export class InfoChaptersModule {}
