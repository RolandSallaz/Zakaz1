import { DigiModule } from '@/digi/digi.module';
import { KeysModule } from '@/keys/keys.module';
import { ReviewsModule } from '@/reviews/reviews.module';
import { TagsModule } from '@/tags/tags.module';
import { UsersModule } from '@/users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

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
