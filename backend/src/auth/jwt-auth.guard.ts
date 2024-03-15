import { UsersService } from '@/users/users.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();
const { JWT_SECRET = 'jwt_secret' } = process.env;

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private userService: UsersService;

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {
    this.userService = usersService;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Используем тип Promise<boolean> для асинхронной логики
    const req = context.switchToHttp().getRequest();
    try {
      if (!req.headers.authorization.startsWith('Bearer ')) {
        throw new UnauthorizedException({ message: 'Авторизация не прошла' });
      }
      const token = req.headers.authorization.replace('Bearer ', '');
      const { user } = this.jwtService.verify(token, { secret: JWT_SECRET });
      const findUser = await this.userService.findUserByEmail({
        email: user.email,
      });
      if (!findUser) {
        throw new UnauthorizedException({ message: 'Авторизация не прошла' });
      }
      req.user = findUser;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Авторизация не прошла' });
    }
  }
}
