import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService
    ){}
    @Post()
    login(@Body() authDto: AuthUserDto) {
        return this.authService.login(authDto);
    }
}
