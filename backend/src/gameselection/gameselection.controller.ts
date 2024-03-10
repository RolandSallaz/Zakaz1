import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GameselectionService } from './gameselection.service';
import { CreateGameselectionDto } from './dto/create-gameselection.dto';
import { UpdateGameselectionDto } from './dto/update-gameselection.dto';
import { AdminRoleAuthGuard } from '@/auth/AdminRole-auth.guard';

@Controller('gameselections')
export class GameselectionController {
  constructor(private readonly gameselectionService: GameselectionService) {}

  @Post()
  @UseGuards(AdminRoleAuthGuard)
  create(@Body() createGameselectionDto: CreateGameselectionDto) {
    return this.gameselectionService.create(createGameselectionDto);
  }

  @Get()
  findAll() {
    return this.gameselectionService.findAll();
  }

  @Patch(':id')
  @UseGuards(AdminRoleAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateGameselectionDto: UpdateGameselectionDto,
  ) {
    return this.gameselectionService.update(+id, updateGameselectionDto);
  }

  @Delete(':id')
  @UseGuards(AdminRoleAuthGuard)
  remove(@Param('id') id: string) {
    return this.gameselectionService.remove(+id);
  }
}
