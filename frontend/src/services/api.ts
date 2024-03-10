import { apiUrl } from '../utils/config';
import {
  IAuthFormDto,
  IFIle,
  IGame,
  IGameCreateDto,
  IGameSelection,
  IGameSelectionDto,
  IGameSelectionUpdateDto,
  IGameUpdateDto,
  ILogin,
  IRequest,
  ISlider,
  ITag,
  IUpdateSliderDto,
  IUser
} from '../utils/types';

interface IFetch {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: BodyInit | Record<string, unknown>;
}

function checkResponse<T>(res: Response): Promise<T> {
  return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
}

function _fetch<T>({ url, method = 'GET', headers, body }: IFetch): Promise<T> {
  let contentTypeHeader: string | undefined = undefined;

  // Получаем токен авторизации перед каждым запросом
  const authorization = localStorage.getItem('jwt') ?? '';

  // Устанавливаем заголовок Content-Type в зависимости от типа тела запроса
  if (body instanceof FormData) {
    // Если тело запроса - FormData, не устанавливаем Content-Type (будет установлен автоматически)
  } else if (body) {
    // Если тело запроса - не пустое и не FormData, устанавливаем Content-Type: application/json
    contentTypeHeader = 'application/json';
  }

  // Объединяем заголовки с дополнительными заголовками и устанавливаем Content-Type при необходимости
  const mergedHeaders = {
    authorization,
    ...(contentTypeHeader ? { 'Content-Type': contentTypeHeader } : {}),
    ...headers
  };

  const requestBody: BodyInit = body instanceof FormData ? body : JSON.stringify(body);

  return fetch(`${apiUrl}/${url}`, {
    method,
    headers: mergedHeaders,
    body: requestBody
  }).then(checkResponse<T>);
}

export function sendEmail({ email }: { email: string }): Promise<IRequest> {
  return _fetch<IRequest>({
    url: 'auth',
    method: 'POST',
    body: { email }
  });
}

export function authLogin({ email, authCode }: IAuthFormDto): Promise<ILogin> {
  return _fetch<ILogin>({
    url: 'auth/login',
    method: 'POST',
    body: { email, authCode: Number(authCode) }
  }).then((data) => {
    localStorage.setItem('jwt', `Bearer ${data.token}`);
    return data;
  });
}

export function checkAuth(): Promise<IUser> {
  return _fetch({ url: 'auth' });
}

export function postImage(file: FormData): Promise<IFIle> {
  return _fetch({ url: 'files', method: 'POST', body: file });
}

// export function getKeysBySteamId(steamId: number): Promise<IKeyDto[]> {
//   return _fetch({ url: `keys/${steamId}` });
// }

//games
export function postGame(createGameDto: IGameCreateDto): Promise<IGame> {
  return _fetch({ url: 'games', method: 'POST', body: { ...createGameDto } });
}

export function getAllGames(): Promise<IGame[]> {
  return _fetch({ url: 'games' });
}

export function getGameById(gameId: number): Promise<IGame> {
  return _fetch({ url: `games/${gameId}` });
}

export function updateGame(game: IGameUpdateDto): Promise<IGame> {
  return _fetch({ url: `games/${game.id}`, method: 'PATCH', body: { ...game } });
}

//tags
export function addTag(tag: ITag): Promise<ITag> {
  return _fetch({ url: 'tags', method: 'POST', body: { ...tag } });
}

export function getAllTags(): Promise<ITag[]> {
  return _fetch({ url: 'tags' });
}

export function updateTag(id: number, name: string): Promise<ITag> {
  return _fetch({
    url: `tags/${id}`,
    method: 'PATCH',
    body: {
      name
    }
  });
}

export function deleteTag(id: number): Promise<ITag> {
  return _fetch({
    url: `tags/${id}`,
    method: 'DELETE'
  });
}

//slider

export function getAllSliders(): Promise<ISlider[]> {
  return _fetch({ url: 'slider' });
}

export function addSlider(gameId: number): Promise<ISlider> {
  return _fetch({ url: 'slider', method: 'POST', body: { gameId } });
}

export function updateSlider({ gameId, sliderId }: IUpdateSliderDto): Promise<ISlider> {
  return _fetch({ url: `slider/${sliderId}`, method: 'PUT', body: { gameId } });
}

export function deleteSlider(sliderId: number): Promise<ISlider> {
  return _fetch({ url: `slider/${sliderId}`, method: 'DELETE' });
}

//game selection

export function getAllGameSelections(): Promise<IGameSelection[]> {
  return _fetch({ url: 'gameselections' });
}

export function addGameSelection({ name, games }: IGameSelectionDto): Promise<IGameSelection> {
  return _fetch({ url: 'gameselections', method: 'POST', body: { name, games } });
}

export function deleteGameSelection(id: number): Promise<IGameSelection> {
  return _fetch({ url: `gameselections/${id}`, method: 'DELETE' });
}

export function updateGameSelection({
  id,
  name,
  games
}: IGameSelectionUpdateDto): Promise<IGameSelection> {
  return _fetch({ url: `gameselections/${id}`, method: 'PATCH', body: { name, games } });
}
