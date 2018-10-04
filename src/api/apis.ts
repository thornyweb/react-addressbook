import axios, { AxiosPromise } from 'axios';
import { POSTCODES_IO_BASE_URL, REST_DB_BASE_URL } from '../constants';

export const restDBRequest = axios.create({
  baseURL: REST_DB_BASE_URL
});

export const postcodesIORequest = axios.create({
  baseURL: POSTCODES_IO_BASE_URL
});

export function axiosPromise<T>(callAxios: () => AxiosPromise<T>) {
  return new Promise<T>((resolve, reject) => {
    callAxios().then(({ data }) => resolve(data)).catch(reject);
  });
}
