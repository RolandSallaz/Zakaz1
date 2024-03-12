import { GamesService } from '@/games/games.service';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

require('dotenv').config();

@Injectable()
export class DigiService {
  constructor(
    @Inject(GamesService)
    private gamesService: GamesService,
  ) {}
  async getLastSales() {
    const sha256 = crypto.createHash('sha256');
    const apiKey = process.env.VITE_DIGI_API_KEY;
    const timestamp = Date.now();
    const sign = sha256.update('' + apiKey + timestamp).digest('hex');

    const auth = await fetch(`https://api.digiseller.ru/api/apilogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application / json',
      },
      body: JSON.stringify({
        seller_id: process.env.VITE_DIGI_SHOP,
        sign,
        timestamp,
      }),
    }).then((res) => res.json());
    if (auth.retval != 0) {
      throw new HttpException(auth.desc, 400);
    }

    const url = 'https://api.digiseller.ru/api/seller-last-sales';
    const params = {
      token: auth.token,
      seller_id: auth.seller_id,
    };

    const queryParams = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryParams}`;
    const data = await fetch(fullUrl).then((res) => res.json());
    if (!data) {
      throw new HttpException('Ошибка получения продаж', 500);
    }

    const games = await this.gamesService.getLastBuyedGames(
      data.sales.map((item) => item.product.id),
    );

    const gamesWithDate = games.map((game) => {
      const sale = data.sales.find((sale) => sale.product.id === game.digiId);
      return { ...game, date: sale ? sale.date : null };
    });
    const sortedGames = gamesWithDate.sort((a, b) => {
      if (a.date > b.date) {
        return -1; // Сортировка по убыванию (от последней покупки к первой)
      } else if (a.date < b.date) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedGames;
  }
}
