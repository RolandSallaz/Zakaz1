import { Module, forwardRef } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { JwtModule } from '@nestjs/jwt';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeysService } from '@/keys/keys.service';
import { KeysModule } from '@/keys/keys.module';
import { TagsModule } from '@/tags/tags.module';
import { UsersModule } from '@/users/users.module';
import { DigiModule } from '@/digi/digi.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Review } from '@/reviews/entities/review.entity';
import { ReviewsModule } from '@/reviews/reviews.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    JwtModule,
    KeysModule,
    TagsModule,
    UsersModule,
    ReviewsModule,
    forwardRef(() => DigiModule),
  ],
  providers: [GamesService],
  controllers: [GamesController],
  exports: [GamesService],
})
export class GamesModule {}
