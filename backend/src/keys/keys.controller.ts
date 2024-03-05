import { AdminRoleAuthGuard } from '@/auth/AdminRole-auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { KeysService } from './keys.service';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Post()
  @UseGuards(AdminRoleAuthGuard)
  create(@Body() createKeyDto: CreateKeyDto) {
    return this.keysService.create(createKeyDto);
  }

  @Get(':steamId')
  getKeyBySteamId(@Param('steamId') steamId: number) {
    return this.keysService.findBySteamId(steamId);
  }
}
