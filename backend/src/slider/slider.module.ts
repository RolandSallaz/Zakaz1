import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [JwtModule, UsersModule],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {}
