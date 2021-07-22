import axios, { Method } from 'axios';
import store from '../store';
import { Headers, Response } from '../types/fetcher';
export default async function fetcher<TResult>(method: Method, url: string, data?: unknown): Promise<Response<TResult>> {

  const jwt: string | undefined = store.state.jwt;

  const backend: string |undefined = 'http://localhost:8080'
  const headers: Headers = {
    'Content-Type': 'application/json; charset=utf-8'
  };

  if (jwt) {
    headers.Authorization = 'Bearer ' + jwt;
  }

  const currentUrl = backend ? backend+url : url
  const res = await axios({
    headers,
    method,
    url:currentUrl,
    data,
    validateStatus: () => true // don't throw on non-200
  });

  return {
    ok: res.status >= 200 && res.status < 400,
    status: res.status,
    headers: res.headers,
    data: res.data ? res.data as TResult : undefined,
  } as Response<TResult>;
}


