import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
require('dotenv').config();
const { JWT_SECRET = 'jwt_secret' } = process.env;
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      if (!req.headers.authorization.startsWith('Bearer ')) {
        throw new UnauthorizedException({ message: 'Авторизация не прошла' });
      }
      const token = req.headers.authorization.replace('Bearer ', '');
      const { user } = this.jwtService.verify(token, { secret: JWT_SECRET });
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Авторизация не прошла' });
    }
  }
}
