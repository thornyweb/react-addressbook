import axios, { AxiosPromise } from 'axios';
import { POSTCODES_IO_BASE_URL, REST_DB_BASE_URL } from '../constants';

/**
 * Use URL's stored in constants to create Axios requests and return promises.
 * Axios requests will trigger the catch if returning anything other than a 20x status code.
 */
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
