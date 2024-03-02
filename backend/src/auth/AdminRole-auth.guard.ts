import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './jwt-auth.guard';
@Injectable()
export class AdminRoleAuthGuard extends JwtAuthGuard {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const canActivate = super.canActivate(context); // Вызываем canActivate JwtAuthGuard
    const req = context.switchToHttp().getRequest();
    if (req.user.role != 'admin') {
      throw new ForbiddenException({ message: 'Недостаточно прав' });
    }
    return true;
  }
}
