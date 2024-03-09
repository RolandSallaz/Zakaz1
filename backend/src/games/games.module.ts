import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { JwtModule } from '@nestjs/jwt';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeysService } from '@/keys/keys.service';
import { KeysModule } from '@/keys/keys.module';
import { TagsModule } from '@/tags/tags.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    JwtModule,
    KeysModule,
    TagsModule,
    UsersModule,
  ],
  providers: [GamesService],
  controllers: [GamesController],
  exports: [GamesService],
})
export class GamesModule {}
