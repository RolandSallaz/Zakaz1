import { GamesService } from '@/games/games.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { Cron } from '@nestjs/schedule';

require('dotenv').config();
@Injectable()
export class SitemapService implements OnModuleInit {
  constructor(private readonly gameService: GamesService) {}

  async onModuleInit() {
    try {
      await this.generateAndMoveSitemap();
    } catch (error) {
      console.error('Error generating or moving sitemap:', error);
    }
  }

  @Cron('0 * * * *')
  async generateAndMoveSitemap(): Promise<void> {
    if (process.env.DEV) {
      return;
    }
    const games = await this.gameService.getAllGames();
    const sitemapContent = this.generateSitemapContent(games);
    const sitemapPath = '/app/nginx/sitemap.xml';
    await this.saveSitemap(sitemapPath, sitemapContent);
  }

  private generateSitemapContent(games: any[]): string {
    let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapContent +=
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Добавляем ссылку на главную страницу
    sitemapContent += '<url>\n';
    sitemapContent += `<loc>${process.env.DOMAIN}/</loc>\n`;
    sitemapContent += '<changefreq>daily</changefreq>\n';
    sitemapContent += '<priority>1.0</priority>\n';
    sitemapContent += '</url>\n';

    // Добавляем ссылки на игры
    for (const game of games) {
      const url = `${process.env.DOMAIN}/#/games/${game.digiId}`;
      sitemapContent += '<url>\n';
      sitemapContent += `<loc>${url}</loc>\n`;
      sitemapContent += '</url>\n';
    }

    sitemapContent += '</urlset>';
    return sitemapContent;
  }

  private async saveSitemap(path: string, content: string): Promise<void> {
    const stream = createWriteStream(path);
    stream.write(content);
    stream.end();
  }
}
