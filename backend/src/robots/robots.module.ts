import { Module } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { RobotsController } from './robots.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [JwtModule, UsersModule],
  controllers: [RobotsController],
  providers: [RobotsService],
})
export class RobotsModule {}
