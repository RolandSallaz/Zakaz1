import { Module } from '@nestjs/common';
import { GameselectionService } from './gameselection.service';
import { GameselectionController } from './gameselection.controller';
import { Gameselection } from './entities/gameselection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { GamesModule } from '@/games/games.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gameselection]),
    JwtModule,
    UsersModule,
    GamesModule,
  ],
  controllers: [GameselectionController],
  providers: [GameselectionService],
})
export class GameselectionModule {}
