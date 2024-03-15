import { AdminRoleAuthGuard } from '@/auth/AdminRole-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getAllGame() {
    return this.gamesService.getAllGames();
  }

  @Post()
  @UseGuards(AdminRoleAuthGuard)
  addGame(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get('digi')
  @UseGuards(AdminRoleAuthGuard)
  loadFromDigi() {
    return this.gamesService.loadGamesFromDigi();
  }

  @Get(':id')
  getGame(@Param('id') id: number) {
    return this.gamesService.getGame(id);
  }

  @Delete(':id')
  @UseGuards(AdminRoleAuthGuard)
  deleteGame(@Param('id') id: number) {
    return this.gamesService.deleteGame(id);
  }

  @Patch(':id')
  @UseGuards(AdminRoleAuthGuard)
  updateGame(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.updateGame(id, updateGameDto);
  }
}
