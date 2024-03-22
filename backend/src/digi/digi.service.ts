import { GamesService } from '@/games/games.service';
import { Review } from '@/reviews/entities/review.entity';
import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import * as crypto from 'crypto';

require('dotenv').config();

@Injectable()
export class DigiService {
  constructor(
    @Inject(forwardRef(() => GamesService))
    private gamesService: GamesService,
  ) {}

  async getDigiToken(): Promise<{ token: string; seller_id: number }> {
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
    return auth;
  }

  async getLastSales() {
    const auth = await this.getDigiToken();
    const url = 'https://api.digiseller.ru/api/seller-last-sales';

    const fullUrl = `${url}?seller_id=${process.env.VITE_DIGI_SHOP}&token=${auth.token}`;
    const data = await fetch(fullUrl).then((res) => res.json());
    if (data.retval != 0) {
      throw new HttpException('Ошибка получения продаж', 500);
    }
    const games = await this.gamesService.getLastBuyedGames(
      data.sales.map((item) => item.product.id),
    );

    const gamesWithDate = games
      .map((game) => {
        const sale = data.sales.find((sale) => sale.product.id === game.digiId);
        return { ...game, date: sale ? sale.date : null };
      })
      .slice(0, 7);
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

  async fetchDigisellerItem(productId: number) {
    return await fetch(
      `https://api.digiseller.ru/api/products/${productId}/data?currency=RUB&transp=cors&format=json`,
    ).then((res) => res.json());
  }

  async loadUnloadedGames() {
    // const category = await fetch(
    //   `https://api.digiseller.ru/api/categories?seller_id=${process.env.VITE_DIGI_SHOP}&format=json`,
    //   {
    //     headers: {
    //       Accept: 'application/json',
    //     },
    //   },
    // ).then((res) => res.json());
    return await fetch(
      `https://api.digiseller.ru/api/shop/products?seller_id=${process.env.VITE_DIGI_SHOP}&category_id=139126&rows=500`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    ).then((res) => res.json());
  }

  async getReviews(productId: number): Promise<Review[]> {
    const data = await fetch(
      `https://api.digiseller.ru/api/reviews?seller_id=${process.env.VITE_DIGI_SHOP}&product_id=${productId}&type=good&page=1&rows=1000`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    ).then((res) => res.json());
    if (data.retval != 0) {
      throw new HttpException(
        `Ошибка получения отзывов retval ${data.retval}`,
        500,
      );
    }
    if (data.review) {
      return data.review?.map((item) => ({
        id: item.id,
        date: item.date,
        digiId: productId,
        info: item.info,
      }));
    } else {
      return [];
    }
  }

  async checkStock(digiId: number): Promise<boolean> {
    const data = await fetch(
      `https://api.digiseller.ru/api/products/list?ids=${digiId}&lang=ru-RU`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    ).then((res) => res.json());
    return data[0].in_stock == 1 ? true : false;
  }
}
