import { Module } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { GamesModule } from '@/games/games.module';

@Module({
  imports: [GamesModule],
  providers: [SitemapService],
})
export class SitemapModule {}
