import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { AdminRoleAuthGuard } from '@/auth/AdminRole-auth.guard';
import { FindByIdGameDto } from './dto/findById-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

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

  @Get(':id')
  @UseGuards(AdminRoleAuthGuard)
  getGame(@Param('id') id: number) {
    return this.gamesService.getGame(id);
  }

  @Patch(':id')
  @UseGuards(AdminRoleAuthGuard)
  updateGame(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.updateGame(id, updateGameDto);
  }
}
