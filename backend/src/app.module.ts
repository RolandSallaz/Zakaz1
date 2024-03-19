import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DigiModule } from './digi/digi.module';
import { EmailModule } from './email/email.module';
import { FilesController } from './files/files.controller';
import { GamesModule } from './games/games.module';
import { GameselectionModule } from './gameselection/gameselection.module';
import { KeysModule } from './keys/keys.module';
import { SliderModule } from './slider/slider.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { InfoChaptersModule } from './info-chapters/info-chapters.module';
import { SupportModule } from './support/support.module';
import { ScheduleModule } from '@nestjs/schedule';
require('dotenv').config();

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      serveRoot: process.env.DEV ? '' : '/api',
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      host: process.env.POSTGRES_HOST || 'localhost',
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DATABASE || 'postgres',
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
      // ssl: true,
    }),

    GamesModule,
    TagsModule,
    UsersModule,
    EmailModule,
    AuthModule,
    KeysModule,
    SliderModule,
    GameselectionModule,
    DigiModule,
    InfoChaptersModule,
    SupportModule,
  ],
  controllers: [AppController, FilesController],
})
export class AppModule {}
