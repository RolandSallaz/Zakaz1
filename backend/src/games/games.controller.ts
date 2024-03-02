import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { AdminRoleAuthGuard } from '@/auth/AdminRole-auth.guard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  @Post()
  @UseGuards(AdminRoleAuthGuard)
  addGame(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }
  @Get()
  getAllGame() {
    return this.gamesService.getAllGames();
  }
}
