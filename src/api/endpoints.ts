import axios, { AxiosPromise } from 'axios';

export const api = axios.create({
  baseURL: 'https://addressbook-1c4b.restdb.io/rest'
});

export function axiosPromise<T>(callAxios: () => AxiosPromise<T>) {
  return new Promise<T>((resolve, reject) => {
    callAxios().then(({ data }) => resolve(data)).catch(reject);
  });
}
