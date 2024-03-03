import { User } from '@/users/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}

export interface IAuthData {
  user: User;
  token: string;
}
