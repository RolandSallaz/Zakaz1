import { Module } from '@nestjs/common';
import { DigiService } from './digi.service';
import { DigiController } from './digi.controller';
import { GamesService } from '@/games/games.service';
import { GamesModule } from '@/games/games.module';

@Module({
  imports: [GamesModule],
  controllers: [DigiController],
  providers: [DigiService],
})
export class DigiModule {}
