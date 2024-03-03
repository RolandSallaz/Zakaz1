import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateOrFindUserDto } from '@/users/dto/createOrFind-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminRoleAuthGuard } from './AdminRole-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  findUserAndSendCode(@Body() authDto: CreateOrFindUserDto) {
    return this.authService.findUserAndSendCode(authDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() authDto: AuthUserDto) {
    return this.authService.login(authDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  checkAuth() {
    return this.authService.checkAuth();
  }
}
