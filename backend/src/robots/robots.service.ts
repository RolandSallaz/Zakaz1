import { HttpException, Injectable } from '@nestjs/common';
import fs from 'fs';
import { UpdateRobotDto } from './dto/update-robot.dto';
require('dotenv').config();

@Injectable()
export class RobotsService {
  private readonly robotsPath: string;
  constructor() {
    this.robotsPath = '/app/sitemap/robots.txt';
  }
  async getRobots(): Promise<{ data: string }> {
    const data = await fetch(`${process.env.DOMAIN}/robots.txt`)
      .then((res) => res.text())
      .catch((err) => {
        throw new HttpException(err.message, 500);
      });
    return { data };
  }

  async update(updateRobotDto: UpdateRobotDto): Promise<{ message: string }> {
    if (process.env.DEV) {
      throw new HttpException('Недоступно в DEV режиме', 403);
    }

    await fs.writeFile(this.robotsPath, updateRobotDto.text, (err) => {
      if (err) {
        throw new HttpException(err.message, 500);
      }
    });
    return { message: 'Файл обновлен' };
  }
}
