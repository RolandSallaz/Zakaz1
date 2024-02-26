import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { CodesModule } from './codes/codes.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
    CodesModule,
    EmailModule, 
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
