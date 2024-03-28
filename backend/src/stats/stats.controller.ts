import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  create(@Req() request: Request, @Body() createStatDto: CreateStatDto) {
    return this.statsService.create(createStatDto);
  }

  @Get()
  findAll() {
    return this.statsService.findAll();
  }
}
