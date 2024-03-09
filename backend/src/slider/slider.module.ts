import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { Slider } from './entities/slider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from '@/games/games.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Slider]),
    JwtModule,
    UsersModule,
    GamesModule,
  ],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {}
