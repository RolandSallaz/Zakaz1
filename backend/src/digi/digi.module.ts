import { Module, forwardRef } from '@nestjs/common';
import { DigiService } from './digi.service';
import { DigiController } from './digi.controller';
import { GamesService } from '@/games/games.service';
import { GamesModule } from '@/games/games.module';

@Module({
  imports: [forwardRef(() => GamesModule)],
  controllers: [DigiController],
  providers: [DigiService],
  exports: [DigiService],
})
export class DigiModule {}
