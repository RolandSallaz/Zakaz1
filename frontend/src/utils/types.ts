export interface IPrice {
  cost: number;
  discount: number;
}

export interface IEmail {
  email: string;
}

export interface IUser {
  email: IEmail;
  role: ROLES;
  id: number;
  order: [];
}

export enum ROLES {
  USER = 'user',
  ADMIN = 'admin'
}

export interface IAuthFormDto {
  email: string;
  authCode: number;
}

export interface ISnackbar {
  isOpened: boolean;
  message: string;
  isError?: boolean;
}

export interface IRequest {
  message: string;
}

export interface IRequestError extends IRequest {
  statusCode: number;
}

export interface ILogin {
  token: string;
  user: IUser;
}
