import { User } from '@/users/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}

export interface IAuthData {
  user: User;
  token: string;
}

export interface ISteamData {
  success: boolean;
  data: {
    name: string;
    header_image: string;
    screenshots: { id: number; path_thumbnail: string; path_full: string }[];
    release_date: { coming_soon: boolean; date: string };
    pc_requirements: {
      minimum: string;
      recommended: string;
    };
    about_the_game: string;
    categories: { id: number; description: string }[];
    price_overview: {
      initial_formatted: string;
      final_formatted: string;
    };
  };
}

export interface ISteamToGameEntity
  extends Pick<
    Game,
    | 'name'
    | 'logo'
    | 'screenshots'
    | 'coming_soon'
    | 'release_date'
    | 'minimal_requirements'
    | 'recomended_requirements'
    | 'description'
  > {
  tags: string[];
  steamPrice: string;
}
