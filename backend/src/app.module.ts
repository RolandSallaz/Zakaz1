import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { FilesController } from './files/files.controller';
import { GamesModule } from './games/games.module';
import { KeysModule } from './keys/keys.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { SliderModule } from './slider/slider.module';
import { GameselectionModule } from './gameselection/gameselection.module';
import { DigiModule } from './digi/digi.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
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
  ],
  controllers: [AppController, FilesController],
})
export class AppModule {}
