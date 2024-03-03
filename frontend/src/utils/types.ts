export interface IUser {
  email: string;
  role: ROLES;
  id: number;
  orders: [];
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

export interface ITag {
  name: string;
  id?: number;
}

export interface IFIle {
  destination: string;
  encoding: string;
  fildName: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}

export interface createGameDto extends Omit<IGame, 'id'> {
  keys: string[];
}

export interface IGame {
  id: number;
  steamId: number;
  name: string;
  description: string;
  logo: string;
  screenshots: string[];
  price: number;
  discount: number;
  enabled: boolean;
  tags: ITag[];
}
