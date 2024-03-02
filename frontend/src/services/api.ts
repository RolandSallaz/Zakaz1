import { apiUrl, headers } from '../utils/config';
import { IAuthFormDto, IEmail, IFIle, ILogin, IRequest, ITag, createGameDto } from '../utils/types';

function checkResponse<T>(res: Response): Promise<T> {
  return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
}

export function sendEmail({ email }: IEmail): Promise<IRequest> {
  return fetch(`${apiUrl}/auth`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email })
  }).then(checkResponse<IRequest>);
}

export function authLogin({ email, authCode }: IAuthFormDto): Promise<ILogin> {
  return fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, authCode: Number(authCode) })
  })
    .then(checkResponse<ILogin>)
    .then((data) => {
      localStorage.setItem('jwt', `Bearer ${data.token}`);
      return data;
    });
}

export function checkAuth(): Promise<ILogin> {
  return fetch(`${apiUrl}/auth`, {
    headers
  }).then(checkResponse<ILogin>);
}

export function checkAdminAuth() {
  return fetch(`${apiUrl}/auth/admin`, {
    headers
  }).then(checkResponse<ILogin>);
}

export function addTag(tag: ITag): Promise<ITag> {
  return fetch(`${apiUrl}/tags`, {
    method: 'POST',
    headers,
    body: JSON.stringify(tag)
  }).then(checkResponse<ITag>);
}

export function getAllTags(): Promise<ITag[]> {
  return fetch(`${apiUrl}/tags`, {
    headers
  }).then(checkResponse<ITag[]>);
}

export function postImage(file: FormData): Promise<IFIle> {
  return fetch(`${apiUrl}/files`, {
    method: 'POST',
    headers,
    body: file
  }).then(checkResponse<IFIle>);
}

export function postGame(createGameDto: createGameDto) {
  return fetch(`${apiUrl}/games`, {
    method: 'POST',
    headers,
    body: JSON.stringify(createGameDto)
  }).then(checkResponse);
}

export function getAllGames() {
  return fetch(`${apiUrl}/games`, {
    headers
  }).then(checkResponse);
}
