import { generateSixDigitCode } from '@/common/filters/helpers/codeGenerator';
import { AuthUserDto } from '@/users/dto/auth-user.dto';
import { CreateOrFindUserDto } from '@/users/dto/createOrFind-user.dto';
import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest, IAuthData } from '@/types';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @Inject(REQUEST) private readonly request: AuthenticatedRequest,
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}
  async findUserAndSendCode({
    email,
  }: CreateOrFindUserDto): Promise<{ message: string }> {
    const authCode = generateSixDigitCode(); //генерируем код
    const authDto: AuthUserDto = { email, authCode };

    const user = await this.userService.findUserOrCreate({ email }); //ищем пользователя
    await this.userService.updateAuthCode(authDto);
    await this.emailService.sendEmailAuthCode(authDto); //отправляем код на емейл
    return { message: `Код отправлен на емейл ${email}, проверьте папку СПАМ` };
  }

  async login({ email, authCode }: AuthUserDto): Promise<IAuthData> {
    const user = await this.userService.findUserOrCreate({ email });
    const authData = { user, token: null };
    if (user.authCode == authCode) {
      const token = await this.jwtService.signAsync(authData);
      authData.token = token;
      return authData;
    } else {
      throw new HttpException('Неверный код', 401);
    }
  }

  async checkAuth(): Promise<User> {
    const id = this.request.user.id;
    return await this.userService.findUserById({ id });
  }

  async checkAdminAuth(): Promise<User> {
    return await this.checkAuth();
  }
}
