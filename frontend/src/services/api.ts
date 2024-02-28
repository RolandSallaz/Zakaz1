import { apiUrl, headers } from '../utils/config';
import { IAuthFormDto, IEmail, ILogin, IRequest, IUser } from '../utils/types';

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

export function checkAuth(token: string): Promise<ILogin> {
  return fetch(`${apiUrl}/auth`, {
    headers: { authorization: token, ...headers }
  }).then(checkResponse<ILogin>);
}

export function checkAdminAuth(token: string) {
  return fetch(`${apiUrl}/auth/admin`, {
    headers: { authorization: token, ...headers }
  }).then(checkResponse<ILogin>);
}
