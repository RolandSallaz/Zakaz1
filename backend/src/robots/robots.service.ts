import { Inject, Injectable } from '@nestjs/common';
import { UpdateRobotDto } from './dto/update-robot.dto';
import fs from 'fs';
@Injectable()
export class RobotsService {
  private readonly robotsPath: string;
  constructor(@Inject('ROBOTS_PATH') robotsPath: string) {
    this.robotsPath = '/app/sitemap/robots.txt';
  }
  async getRobots(): Promise<string> {
    const file = await fs.readFileSync(this.robotsPath, 'utf-8');
    return file;
  }

  async update(updateRobotDto: UpdateRobotDto) {
    return `This action updates a # robot`;
  }
}
