import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
  ) {}
  async login(authDto: AuthUserDto) {
    this.userService.findUserOrCreate(authDto).then(user=>console.log(user));
 
    return this.emailService.sendEmailAuthCode(authDto);
  }
}
