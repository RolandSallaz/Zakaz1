import { User } from "@/users/entities/user.entity";

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: 'user' | 'admin';
  };
}

export interface IAuthData {
  user: User,
  token: string;
}
