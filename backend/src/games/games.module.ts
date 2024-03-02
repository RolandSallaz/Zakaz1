import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { JwtModule } from '@nestjs/jwt';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeysService } from '@/keys/keys.service';
import { KeysModule } from '@/keys/keys.module';
import { TagsModule } from '@/tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    JwtModule,
    KeysModule,
    TagsModule,
  ],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
