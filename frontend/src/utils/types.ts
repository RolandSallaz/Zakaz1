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

export interface IKeyDto {
  id: number;
  key: string;
  steamId: number;
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

export interface IGame {
  id: number;
  digiId: number;
  steamId: number;
  name: string;
  description: string;
  logo: string;
  screenshots: string[];
  price: number;
  enabled: boolean;
  tags: ITag[];
  steamPrice: string;
}

export interface IGameCreateDto extends Omit<IGame, 'id'> {}

export interface IGameUpdateDto extends IGameCreateDto {
  id: number;
}

export interface ISlider {
  id: number;
  game: IGame;
}

export interface IUpdateSliderDto {
  gameId: number;
  sliderId: number;
}

export interface IGameSelectionDto {
  name: string;
  games: number[];
}

export interface IGameSelectionUpdateDto extends IGameSelectionDto {
  id: number;
}

export interface IGameSelection {
  id: number;
  name: string;
  games: IGame[];
}

export interface IGameSale extends IGame {
  date: Date;
}

export interface IInfoChapter {
  heading: string;
  link: string;
  text: string;
}
