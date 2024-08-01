import { GamesService } from '@/games/games.service';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { SitemapStream, streamToPromise } from 'sitemap';

@Injectable()
export class SitemapService {
  constructor(private gamesService: GamesService) {}
  sitemapXmlCache;
  sitemapTimeoutMs = 1000 * 60 * 60;
  domain = `https://${process.env.DOMAIN || 'localhost'}`;

  async get(res: Response) {
    res.set('Content-Type', 'text/xml'); //1 час кеш
    if (this.sitemapXmlCache) {
      res.send(this.sitemapXmlCache);
      return;
    }
    const items = await this.gamesService.getAllGames();
    const smStream = new SitemapStream({
      hostname: this.domain,
    });
    items.forEach((item) => {
      smStream.write({
        url: `/games/${item.id}`,
        changefreq: 'monthly',
        priority: 1,
      });
    });
    smStream.end();
    streamToPromise(smStream).then((xml) => {
      res.send(xml);
    });
  }
}
