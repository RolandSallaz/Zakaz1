import { apiUrl } from '../utils/config';
import {
  IAuthFormDto,
  IFIle,
  IGame,
  ILogin,
  IRequest,
  ITag,
  IUser,
  createGameDto
} from '../utils/types';

interface IFetch {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
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

export function addTag(tag: ITag): Promise<ITag> {
  return _fetch({ url: 'tags', method: 'POST', body: { ...tag } });
}

export function getAllTags(): Promise<ITag[]> {
  return _fetch({ url: 'tags' });
}

export function postImage(file: FormData): Promise<IFIle> {
  return _fetch({ url: 'files', method: 'POST', body: file });
}

export function postGame(createGameDto: createGameDto) {
  return _fetch({ url: 'games', method: 'POST', body: { ...createGameDto } });
}

export function getAllGames(): Promise<IGame[]> {
  return _fetch({ url: 'games' });
}
