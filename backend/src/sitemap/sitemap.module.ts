import { Module } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';
import { GamesModule } from '@/games/games.module';

@Module({
  imports: [GamesModule],
  controllers: [SitemapController],
  providers: [SitemapService],
})
export class SitemapModule {}
